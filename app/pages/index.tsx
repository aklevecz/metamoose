import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccounts } from "../contexts/Web3";
import useDevice from "../hooks/useDevice";

import FullHeightContainer from "../components/Home/FullHeightContainer";
import ThreeBackground from "../components/ThreeBackground";

import Socials from "../components/Socials";
import Hero from "../components/Home/Hero";
import SmallBlue from "../components/Button/SmallBlue";
import ConnectButton from "../components/Home/ConnectButton";
import MintButton from "../components/Home/MintButton";
import Remaining from "../components/Home/Remaining";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { isMobile } = useDevice();
  const { hasWallet } = useAccounts();

  if (isMobile) {
    return (
      <FullHeightContainer>
        <Hero />
        <div className="flex-col space-between col-hor-center flex-fill">
          <div className={`${styles.blockText} mt-2`}>
            Coming soon to a Metaverse near you!
          </div>
          <div>
            {hasWallet ? <MintButton /> : <ConnectButton />}
            <div className="p-2 text-sm bold">Try it out on Rinkeby!</div>
          </div>
          <div className={styles.remaining}>
            <Remaining />
            <SmallBlue>OpenSea</SmallBlue>
          </div>
          <Socials />
        </div>
        <ThreeBackground />
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      <div>hi</div>
      <ThreeBackground />
    </FullHeightContainer>
  );
};

export default Home;
