import type { NextPage } from "next";
import { useEffect } from "react";
import Socials from "../components/Socials";
import ThreeBackground from "../components/ThreeBackground";
import { useMetaMoose } from "../contexts/Contract";
import { useModal } from "../contexts/Modal";
import { useAccounts, useMetaMask, useWalletConnect } from "../contexts/Web3";
import styles from "../styles/Home.module.css";
import useDevice from "../hooks/useDevice";
import Hero from "../components/Hero";
import SmallBlue from "../components/Button/SmallBlue";

const Home: NextPage = () => {
  const { viewHeight } = useDevice();
  const { connect, hasMetaMask } = useMetaMask();
  const { connect: wConnect } = useWalletConnect();
  const { mint, remaining } = useMetaMoose();
  const { openModal } = useModal();
  const accounts = useAccounts();

  useEffect(() => {
    localStorage.removeItem("walletconnect");
  }, []);

  const mintMoose = () => {
    mint();
    openModal();
  };

  const hasWallet = accounts.length > 0;
  return (
    <div
      style={{ height: viewHeight ? viewHeight : "unset" }}
      className={styles.container}
    >
      <Hero height={viewHeight ? viewHeight * 0.2 : 0} />
      <div className={styles.bottom}>
        <div className={styles.blockText}>
          <div>Coming soon to a Metaverse near you!</div>
        </div>
        <div>
          {!hasWallet && (
            <button onClick={hasMetaMask ? connect : wConnect}>Connect</button>
          )}
          {hasWallet && <button onClick={mintMoose}>Mint</button>}
          <div className="py-2 text-sm bold">Try it out on Rinkeby!</div>
        </div>
        <div className={styles.remaining}>
          {remaining ? <div>{remaining} Remaining</div> : <div>...</div>}
          <SmallBlue>OpenSea</SmallBlue>
        </div>
        <Socials />
      </div>
      <ThreeBackground />
    </div>
  );
};

export default Home;
