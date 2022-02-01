import Img from "../Img";
import ScaleDiv from "../Animations/ScaleDiv";

import styles from "../../styles/Home.module.css";
import ScaledImg from "../Animations/ScaledImg";

export default function HeroDesktop() {
  return (
    <div style={{ position: "relative" }} className={styles.heroContainer}>
      <ScaledImg src="/metaText.png" className={styles.headerTextImg} />
      <ScaledImg
        src="/mooseGrassFrog.png"
        className={styles.headerTextImg}
        style={{ zIndex: 1 }}
      />
      <ScaleDiv delay={1.5} className={styles.mooseDiv}>
        <Img src="/moose.gif" height="48vh" />
      </ScaleDiv>
    </div>
  );
}
