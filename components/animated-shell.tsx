import { Variants, motion } from "framer-motion";
import { useWizard } from "react-use-wizard";

export default function AnimatedShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { activeStep } = useWizard();

  const variants: Variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      custom={activeStep - (activeStep > 0 ? activeStep - 1 : 0)}
      variants={variants}
      initial="enter"
      animate="center"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
