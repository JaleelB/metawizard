import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import { useWizard } from "react-use-wizard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
        x: direction > 0 ? 50 : -50,
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
      className={"h-full w-full lg:w-3/5 min-h-[calc(50vh-65px)]"}
    >
      <div className={cn(className, "w-full h-full max-w-[830px] mx-auto")}>
        <ScrollArea className="h-full py-12 pb-6 px-6 sm:px-8 md:px-12 2xl:px-16">
          {children}
          <ScrollBar />
        </ScrollArea>
      </div>
    </motion.section>
  );
}
