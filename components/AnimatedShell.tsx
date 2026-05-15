"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function AnimatedShell({ children, className = "", id }: AnimatedShellProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
