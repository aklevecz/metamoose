import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { METAMOOSE_ADDRESS } from "../../contexts/constants";
import { TxState, useTxState } from "../../contexts/Contract";
import { getRinkebyEtherscanTrasactionUrl } from "../../contexts/utils";
import { delay } from "../../utils";
import Gear from "../Icons/Gear";
import Pen from "../Icons/Pen";
import Ripple from "../Loading/Ripple";

const txStateMap = {
  0: "",
  1: "Signing Transaction",
  2: "Minting your Moose",
  3: "Your Moose is Minted!",
  4: "There was a problem minting your Moose",
};

const txIconMap = {
  0: <></>,
  1: <Pen />,
  2: <Gear />,
  3: <></>,
  4: <></>,
};

const txAnimations = {
  0: {},
  1: { x: -30, y: 25, scale: 1.5 },
  2: { rotate: 360, scale: 2 },
  3: { rotate: 360, scale: 2 },
  4: {},
};

const imgFolder = "QmZ5jt5vu4KPqnhd1Bad3wU5gpBLhwCzgUb7DNvqwnKyFm";

export default function TxModal() {
  const { txState, data } = useTxState();
  const [minted, setMinted] = useState(false);

  useEffect(() => {
    if (txState === TxState.Completed && data.tokenId) {
      delay(() => setMinted(true), 10000);
    }
  }, [data]);

  const goToOpenSea = () => {
    window.open(
      `https://testnets.opensea.io/assets/${METAMOOSE_ADDRESS}/${data.tokenId}`
    );
  };
  return (
    <div className="flex-column-space-around">
      <motion.div
      // animate={{ scale: 1.2 }}
      // transition={{
      //   ease: "easeInOut",
      //   duration: 1,
      //   repeat: Infinity,
      //   repeatType: "mirror",
      // }}
      >
        {txStateMap[txState]}
      </motion.div>
      {txState < TxState.Completed && (
        <>
          <div style={{ margin: "50px auto", width: "50%", padding: 20 }}>
            <motion.div
              style={{ originX: "50%", originY: "40%" }}
              animate={txAnimations[txState]}
              transition={{
                ease: "easeInOut",
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              {txIconMap[txState]}
            </motion.div>
          </div>
          {txState === TxState.Minting && data.txHash && (
            <a
              style={{
                color: "pink",
                fontSize: "1.3rem",
                textDecoration: "underline",
              }}
              href={getRinkebyEtherscanTrasactionUrl(data.txHash)}
              target="_blank"
            >
              See Tx on Etherscan
            </a>
          )}
        </>
      )}
      {!minted && txState === TxState.Completed && (
        <div>
          <Ripple />
        </div>
      )}
      {minted && (
        <>
          <motion.div
            animate={{ scale: 0.9 }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{ width: "100%", margin: "auto" }}
            onClick={goToOpenSea}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={`https://gateway.pinata.cloud/ipfs/${imgFolder}/${data.tokenId}.png`}
            />
          </motion.div>
          <button onClick={goToOpenSea} style={{ width: 140 }} className="sm">
            See on OpenSea
          </button>
        </>
      )}
    </div>
  );
}
