import styles from "../../styles/Home.module.css";
import Img from "../Img";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.headerText}>
        <div>MetaMoose</div>
      </div>
      <Img src="/moose.gif" height="45vh" />
    </div>
  );
}
