import { ethers } from "ethers";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { INFURA_KEY, METAMOOSE_ADDRESS } from "./constants";
import { useAccounts, useProvider } from "./Web3";

import MetaMooseInterface from "../ethereum/contracts/MetaMoose.sol/MetaMoose.json";

export enum TxState {
  Idle,
  Signing,
  Minting,
  Completed,
  Error,
}

type Action =
  | { type: "initContract"; contract: ethers.Contract }
  | { type: "updateTxState"; txState: TxState; txData?: any };

type Dispatch = (action: Action) => void;

type State = {
  contract: ethers.Contract | null;
  txState: TxState;
  txData: any;
};

const initialState = {
  contract: null,
  txState: TxState.Idle,
  txData: null,
};

const defaultProvider = new ethers.providers.InfuraProvider(
  "rinkeby",
  INFURA_KEY
);

const ContractContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
      updateTxState: (txState: TxState, txData?: any) => void;
    }
  | undefined
>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "initContract":
      return { ...state, contract: action.contract };
    case "updateTxState":
      return {
        ...state,
        txState: action.txState,
        txData: action.txData ? action.txData : null,
      };
    default:
      return state;
  }
};

const ContractProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const web3Provider = useProvider();

  const setContract = (contract: ethers.Contract) =>
    dispatch({ type: "initContract", contract });

  useEffect(() => {
    const provider = web3Provider ? web3Provider : defaultProvider;
    const contract = new ethers.Contract(
      METAMOOSE_ADDRESS,
      MetaMooseInterface.abi,
      provider
    );
    setContract(contract);
  }, [web3Provider]);

  const updateTxState = (txState: TxState, txData?: any) =>
    dispatch({ type: "updateTxState", txState, txData });

  const value = { state, dispatch, updateTxState };
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };

type TxResponse = {
  error?: string;
  data?: {
    tokenId?: number;
  };
  success: boolean;
};

export const useMetaMoose = () => {
  const context = useContext(ContractContext);
  const provider = useProvider();
  const accounts = useAccounts();

  const [remaining, setRemaining] = useState<null | number>(null);

  if (context === undefined) {
    throw new Error("Contract Context error in MetaMoose hook");
  }

  const {
    state: { contract },
    updateTxState,
  } = context;

  useEffect(() => {
    if (contract) {
      // Fails depending on the network
      contract
        .amountRemaining()
        .then((remaining: any) => {
          setRemaining(parseInt(remaining));
        })
        .catch(console.log);
    }
  }, [contract]);

  const mint = async () => {
    if (!provider) {
      const error = "No signer present for minting";
      console.error(error);
      return { error, success: false };
    }
    if (!contract) {
      const error = "The Contract is missing";
      console.error(error);
      return { error, success: false };
    }
    const mooseMaker = new ethers.Wallet(
      "7232b36a6e4f264f16911e398a57fd9e7f9cc24e10780b067cdc16f460215b01",
      defaultProvider
    );
    // const signer = provider.getSigner();
    const contractSigner = contract.connect(mooseMaker);
    updateTxState(TxState.Signing);
    const tx = await contractSigner.mintMoose(accounts[0]);
    updateTxState(TxState.Minting, { txHash: tx.hash });
    const receipt = await tx.wait();

    for (const event of receipt.events) {
      if (event.event === "MooseMinted") {
        const tokenId = parseInt(event.args.tokenId);
        updateTxState(TxState.Completed, { tokenId });
        return { data: { tokenId }, success: true };
      }
    }
    console.error("tx error?", receipt);
    return { success: false };
  };

  const tokenURI = async (tokenId: number) => {
    if (!contract) {
      return console.error("The Contract is missing");
    }
    const uri = await contract.tokenURI(tokenId);
    return uri;
  };

  return { mint, tokenURI, remaining };
};

export const useTxState = () => {
  const context = useContext(ContractContext);

  if (context === undefined) {
    throw new Error("Contract Context error in TxState hook");
  }

  const { state } = context;
  return { txState: state.txState, data: state.txData };
};
