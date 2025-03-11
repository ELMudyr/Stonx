"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface AnimateProps {
  children: React.ReactNode
}

export default function CardAnimation({ children }: AnimateProps): JSX.Element {

  const contraintsRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div ref={contraintsRef}>
      <motion.div
        initial={{ opacity: 0, y: "20%" }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
