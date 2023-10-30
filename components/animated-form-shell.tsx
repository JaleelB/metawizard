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
  const { activeStep, stepCount } = useWizard();

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

  const dotVariants: Variants = {
    inactive: { width: "8px" },
    active: { width: "30px" },
  };

  return (
    <div className="flex flex-col justify-between pb-16">
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
        className={cn(className, "container py-16 max-w-3xl")}
      >
        {children}
      </motion.section>
      <div className="w-full flex borde justify-center pt-24">
        <div className="flex gap-4">
          {Array.from({ length: stepCount }, (_, index) => (
            <div key={index} className="flex justify-center">
              <motion.div
                variants={dotVariants}
                initial="inactive"
                animate={activeStep === index ? "active" : "inactive"}
                transition={{ ease: "easeOut", duration: 0.2 }}
                className={`h-2 rounded-full transition-all ${
                  activeStep === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
