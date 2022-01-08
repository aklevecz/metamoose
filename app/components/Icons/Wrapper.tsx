import styles from "./Icons.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
  onClick: () => void;
};

export default function IconsWrapper({ children, onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      {children}
    </div>
  );
}
