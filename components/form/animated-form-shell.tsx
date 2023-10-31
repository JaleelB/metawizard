import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import { useWizard } from "react-use-wizard";

export default function AnimatedFormShell({
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
        x: direction > 0 ? 100 : -100,
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
      className={"h-full py-12 px-6 sm:px-8 md:px-16 xl:px-20 overflow-y-auto"}
    >
      <div className={cn(className, "w-full max-w-[830px] mx-auto")}>
        {children}
      </div>
    </motion.section>
  );
}
