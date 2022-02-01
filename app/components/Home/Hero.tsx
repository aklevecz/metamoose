import Img from "../Img";
import ScaleDiv from "../Animations/ScaleDiv";

import styles from "../../styles/Home.module.css";
import ScaledImg from "../Animations/ScaledImg";

export default function Hero() {
  return (
    <div style={{ position: "relative" }} className={styles.heroContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "0 0 40%",
          justifyContent: "center",
        }}
      >
        <ScaledImg src="/metaText.png" className={styles.headerTextImg} />
        <ScaledImg
          src="/mooseGrassFrog.png"
          className={styles.headerTextImg}
          style={{ zIndex: 1, marginTop: -60 }}
        />
      </div>
      <ScaleDiv
        delay={1.5}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src="/moose.gif" style={{ width: "auto", height: "40vh" }} />
      </ScaleDiv>
    </div>
  );
}
