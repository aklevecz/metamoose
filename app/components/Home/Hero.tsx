import ScaleDiv from "../Animations/ScaleDiv";

import styles from "../../styles/Home.module.css";
import ScaledImg from "../Animations/ScaledImg";
import Ripple from "../Loading/Ripple";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const timeRef = useRef<any>(Date.now());
  const controls = useAnimation();
  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (imgLoaded) {
      controls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 100 },
      });
    }
  }, [imgLoaded]);
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
        <ScaledImg src="/metaText_smoll.png" className={styles.headerTextImg} />
        <ScaledImg
          src="/mooseGrassFrog_smoll.png"
          className={styles.headerTextImg}
          style={{ zIndex: 1, marginTop: -60 }}
        />
      </div>
      {!imgLoaded && (
        <ScaleDiv
          delay={0}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Ripple />
        </ScaleDiv>
      )}
      {loaded && (
        <motion.div
          initial={{ scale: 0 }}
          animate={controls}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            onLoad={() => {
              const delta = 1000 - (Date.now() - timeRef.current);
              setTimeout(() => setImgLoaded(true), delta);
            }}
            src="/moose.gif"
            style={{
              width: "auto",
              height: "35vh",
              display: imgLoaded ? "block" : "none",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
