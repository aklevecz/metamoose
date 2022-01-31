import type { NextPage } from "next";
import useDevice from "../hooks/useDevice";

import FullHeightContainer from "../components/Home/FullHeightContainer";
import ScaleDiv from "../components/Animations/ScaleDiv";
import ThreeBackground from "../components/ThreeBackground";

import Socials from "../components/Socials";
import Hero from "../components/Home/Hero";

import styles from "../styles/Home.module.css";
import Header from "../components/Home/Header";
import HeroDesktop from "../components/Home/HeroDesktop";
import { useModal } from "../contexts/Modal";

const Home: NextPage = () => {
  const { isMobile } = useDevice();

  if (isMobile) {
    return (
      <FullHeightContainer>
        <Hero />
        <div className="flex-col space-between col-hor-center flex-fill">
          <ScaleDiv delay={2} className={`${styles.blockText} mt-2`}>
            Coming soon to a Metaverse near you!
          </ScaleDiv>
          <Socials />
        </div>
        <ThreeBackground />
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      <Header />
      <HeroDesktop />
      <div className={styles.banner}>
        <div className={styles.bannerText}>Coming soon to a Metaverse near you!</div>
        </div>
      <ThreeBackground />
    </FullHeightContainer>
  );
};

export default Home;
