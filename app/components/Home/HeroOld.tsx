import Img from "../Img";
import ScaleDiv from "../Animations/ScaleDiv";
import ScaledImg from "../Animations/ScaledImg";

import styles from "../../styles/Home.module.css";

export default function HeroOld() {
  return (
    <div style={{ position: "relative" }} className={styles.heroContainer}>
      <div className={styles.headerText}>
        <ScaleDiv>Meta</ScaleDiv>
      </div>
      <div className={styles.headerText}>
        <ScaleDiv>Moose</ScaleDiv>
      </div>
      <ScaleDiv delay={1.5} style={{ position: "absolute", bottom: 0 }}>
        <Img src="/moose.gif" height="45vh" />
      </ScaleDiv>
      <ScaledImg
        delay={1.5}
        src="/grassLineRocks.png"
        style={{ bottom: "-0.7rem" }}
        className={styles.grassLine}
      />
    </div>
  );
}
