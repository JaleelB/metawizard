import { useWizard } from "react-use-wizard";
import { Icons } from "./ui/icons";
import { type Step } from "@/config/steps-config";
import React from "react";
import { Button } from "./ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function WizardNav({ steps }: { steps: Step[] }) {
  const { activeStep } = useWizard();
  const [isNavVisible, setIsNavVisible] = useLocalStorage({
    key: "wizard-nav-visible",
    defaultValue: true,
  });

  return (
    <aside className="relative">
      <div
        className={`h-full ${
          isNavVisible ? "lg:block" : "lg:hidden"
        } border-r px-6 py-12`}
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
                  <Icons.check className="h-5 w-5 text-primary" />
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
      </div>
      <div
        className={`absolute bottom-0 ${
          isNavVisible ? "pl-6 w-[350px] -rotate-180" : "w-[50px] pl-6"
        } left-0 z-10 flex h-20 items-center justify-start`}
      >
        <Button
          onClick={() => setIsNavVisible(!isNavVisible)}
          variant={"outline"}
          className="hidden h-8 w-8 items-center justify-center px-0 lg:flex"
        >
          <Icons.chevronLeft className="w-4 h-4" />
        </Button>
      </div>
    </aside>
  );
}
