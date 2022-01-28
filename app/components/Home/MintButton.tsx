import { useMetaMoose } from "../../contexts/Contract";
import { useModal } from "../../contexts/Modal";

export default function MintButton() {
  const { mint } = useMetaMoose();
  const { openModal } = useModal();
  const mintMoose = () => {
    mint();
    openModal();
  };
  return <button onClick={mintMoose}>Mint</button>;
}
