import { useWizard } from "react-use-wizard";
import { Icons } from "./ui/icons";
import { type Step } from "@/config/steps-config";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function WizardNav({
  steps,
  isNavVisible,
  setIsNavVisible,
}: {
  steps: Step[];
  isNavVisible: boolean;
  setIsNavVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { activeStep } = useWizard();

  return (
    <aside className="relative">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isNavVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`h-full lg:block border-r px-6 py-12 absolute top-0 bottom-0`}
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex gap-4 items-start relative text-left ${
                  steps[activeStep].title !== steps[index].title
                    ? "opacity-30"
                    : ""
                }`}
              >
                <div className="h-5 w-5 pt-0.5">
                  <Icons.checkCircle className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3
                    className={`
                    text-left mb-1 font-semibold
                    ${steps[activeStep] === steps[index] ? "text-primary" : ""}
                `}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`absolute bottom-0 left-0 z-10 flex h-20 items-center justify-end ${
          isNavVisible ? "pr-6" : "ml-1"
        }`}
        initial={{ width: "50px" }}
        animate={{ width: isNavVisible ? "350px" : "50px" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Button
          onClick={() => setIsNavVisible(!isNavVisible)}
          variant={"outline"}
          className="hidden h-8 w-8 items-center border-gray-400 justify-center px-0 lg:flex"
        >
          <motion.div
            animate={{ rotate: !isNavVisible ? 0 : 180 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Icons.chevronRight className="w-4 h-4" />
          </motion.div>
        </Button>
      </motion.div>
    </aside>
  );
}
