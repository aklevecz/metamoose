import styles from "./Hero.module.css";

type Props = {
  height: number;
};

export default function Hero({ height }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div>MetaMoose</div>
        </div>
        <div
          className="mt-3"
          style={{
            height,
          }}
        >
          <img src="/moose.png" />
        </div>
      </div>
    </div>
  );
}
