import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Provider } from "../contexts/Web3";
import { ContractProvider } from "../contexts/Contract";
import { ModalProvider } from "../contexts/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ContractProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ContractProvider>
    </Web3Provider>
  );
}

export default MyApp;
