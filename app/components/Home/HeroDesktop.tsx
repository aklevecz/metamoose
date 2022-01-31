import Img from "../Img";
import ScaleDiv from "../Animations/ScaleDiv";

import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";
import { unstable_batchedUpdates } from "react-dom";

export default function HeroDesktop() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.headerText}>
        <ScaleDiv>Meta</ScaleDiv>
      </div>
      <ScaleDiv delay={1.5} style={{ position: "absolute" }}>
        <Img src="/moose.gif" height="48vh" />
        <div className={styles.pictureFrame} />
      </ScaleDiv>
      <div className={styles.headerText} style={{zIndex: "1"}}>
      <ScaleDiv>Moose</ScaleDiv>
      </div>
    </div>
  );
}
