import { motion } from "framer-motion";
import React, { CSSProperties, StyleHTMLAttributes } from "react";

type Transition = {
  type: string;
  stiffness: number;
};

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  style?: CSSProperties;
  scale?: number;
  initial?: number;
  transition?: Transition;
  delay?: number;
};

export default function ScaleDiv({
  children,
  scale = 1,
  initial = 0,
  delay = 0,
  transition = { type: "spring", stiffness: 100 },
  className,
  style,
}: Props) {
  return (
    <motion.div
      animate={{ scale }}
      initial={{ scale: initial }}
      transition={{ ...transition, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
