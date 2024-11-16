"use client";
import { motion } from "framer-motion";
export default function GradientLine(props: {
  className?: string;
  height?: number;
}) {
  const { className } = props;
  return (
    <motion.div
      className={`w-full h-4 ${className} gradient-line`}
      layout
      style={{
        height: props.height ?? 4,
      }}
    ></motion.div>
  );
}
