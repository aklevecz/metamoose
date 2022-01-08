import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  closeModal: () => void;
};
export default function ClientOnlyModalRoot({
  children,
  open,
  closeModal,
}: Props) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    ref.current! = document.querySelector("#modal-root")!;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && mounted) {
      controls.start({
        scale: 1.2,
        transition: {
          ease: "easeInOut",
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
        },
      });
    } else if (!open && mounted) {
      controls.stop();
    }
  }, [open, mounted]);

  return mounted
    ? createPortal(
        <>
          <motion.div
            animate={controls}
            style={{ display: open ? "flex" : "none" }}
            className={styles.container}
          >
            {children}
          </motion.div>
          <div
            style={{ display: open ? "block" : "none" }}
            onClick={closeModal}
            className={styles.blur}
          />
        </>,
        ref.current!
      )
    : null;
}
