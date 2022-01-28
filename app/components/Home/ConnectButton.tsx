import { useMetaMask, useWalletConnect } from "../../contexts/Web3";

export default function ConnectButton() {
  const { connect, hasMetaMask } = useMetaMask();
  const { connect: wConnect } = useWalletConnect();
  return <button onClick={hasMetaMask ? connect : wConnect}>Connect</button>;
}
