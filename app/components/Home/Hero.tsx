import Img from "../Img";
import ScaleDiv from "../Animations/ScaleDiv";

import styles from "../../styles/Home.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.headerText}>
        <ScaleDiv>MetaMoose</ScaleDiv>
      </div>
      <ScaleDiv delay={1.5}>
        <Img src="/moose.gif" height="45vh" />
      </ScaleDiv>
    </div>
  );
}
