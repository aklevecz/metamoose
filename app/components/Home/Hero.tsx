import styles from "../../styles/Home.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.headerText}>
        <div>MetaMoose</div>
      </div>
      <div
        style={{
          width: "60%",
          height: "100%",
        }}
      >
        <img src="/moose.gif" />
      </div>
    </div>
  );
}
