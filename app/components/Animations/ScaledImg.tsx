import { motion } from "framer-motion";
import React, { CSSProperties } from "react";

type Transition = {
  type: string;
  stiffness: number;
};

type Props = {
  src: string;
  className?: string;
  style?: CSSProperties;
  scale?: number;
  initial?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: any;
};

export default function ScaledImg({
  src,
  scale = 1,
  initial = 0,
  delay = 0,
  transition = { type: "spring", stiffness: 100 },
  className,
  style,
  onAnimationComplete,
}: Props) {
  return (
    <motion.img
      src={src}
      animate={{ scale }}
      initial={{ scale: initial }}
      transition={{ ...transition, delay }}
      className={className}
      style={style}
      onAnimationComplete={onAnimationComplete}
    />
  );
}
