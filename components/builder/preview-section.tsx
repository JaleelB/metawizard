import { useWizard } from "react-use-wizard";
import ParseMarkdown from "./parse-markdown";
import { Variants, motion } from "framer-motion";
import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function PreviewSection({
  code,
  title,
}: {
  code: string;
  title: string;
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
    <div className="border-l h-full relative w-full lg:w-2/5">
      <motion.section
        custom={activeStep - (activeStep > 0 ? activeStep - 1 : 0)}
        variants={variants}
        initial="enter"
        animate="center"
        className="h-full"
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <ScrollArea className="relative flex h-[calc(50vh-56px)] lg:h-[calc(100vh-65px)] flex-col overflow-y-auto border-t px-6 sm:px-8 md:px-12 py-12 lg:border-t-0">
          <div className="w-full h-full pb-[5vh]">
            <div className="uppercase pb-3 text-xs text-muted-foreground">
              {title}
            </div>
            <ParseMarkdown code={code} codeCopyable />
          </div>
          <ScrollBar />
        </ScrollArea>
      </motion.section>
    </div>
  );
}
