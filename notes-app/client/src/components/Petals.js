import { motion } from "framer-motion";

const petals = Array.from({ length: 20 });

export default function Petals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200 text-2xl opacity-70"
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            x:
              Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          🌸
        </motion.div>
      ))}

    </div>
  );
}