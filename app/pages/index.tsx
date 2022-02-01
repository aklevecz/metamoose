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

const Home: NextPage = () => {
  const { isMobile } = useDevice();

  if (isMobile) {
    return (
      <FullHeightContainer>
        <Socials />
        <HeroDesktop />
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            Coming soon to a Metaverse near you!
          </div>
        </div>
        <ThreeBackground />
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      <Header />
      <div className="flex flex-fill all-center">
        <HeroDesktop />
      </div>
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          Coming soon to a Metaverse near you!
        </div>
      </div>
      <ThreeBackground />
    </FullHeightContainer>
  );
};

export default Home;
