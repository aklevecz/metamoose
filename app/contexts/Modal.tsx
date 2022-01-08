import { createContext, useContext, useReducer } from "react";
import Modal from "../components/Modal";

type Action =
  | { type: "toggleModal" }
  | { type: "openModal" }
  | { type: "closeModal" };

type Dispatch = (action: Action) => void;

type State = {
  open: boolean;
};

const initialState = {
  open: false,
};

const ModalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggleModal":
      return { ...state, open: !state.open };
    case "openModal":
      return { ...state, open: true };
    case "closeModal":
      return { ...state, open: false };
    default:
      return state;
  }
};

const ModalProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("Modal Context error in Modal hook");
  }

  const { dispatch, state } = context;

  const toggleModal = () => dispatch({ type: "toggleModal" });
  const openModal = () => dispatch({ type: "openModal" });
  const closeModal = () => dispatch({ type: "closeModal" });

  return { open: state.open, toggleModal, openModal, closeModal };
};
