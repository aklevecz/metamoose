import { useModal } from "../../contexts/Modal";
import ClientOnlyModalRoot from "./ClientOnlyModalRoot";
import TxModal from "./TxModal";

export default function Modal() {
  const { open, closeModal } = useModal();
  return (
    <ClientOnlyModalRoot open={open} closeModal={closeModal}>
      <TxModal />
    </ClientOnlyModalRoot>
  );
}
