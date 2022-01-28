import { useMetaMoose } from "../../contexts/Contract";

export default function Remaining() {
  const { remaining } = useMetaMoose();
  return <>{remaining ? <div>{remaining} Remaining</div> : <div>...</div>}</>;
}
