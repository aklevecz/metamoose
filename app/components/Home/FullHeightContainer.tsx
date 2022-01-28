import useDevice from "../../hooks/useDevice";
import styles from "../../styles/Home.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function FullHeightContainer({ children }: Props) {
  const { viewHeight } = useDevice();

  return (
    <div
      style={{ height: viewHeight ? viewHeight : "unset" }}
      className={styles.container}
    >
      {children}
    </div>
  );
}
