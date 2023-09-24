import { SubmitHandler, FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import React from "react";
import { Form } from "./ui/form";
import { useWizard } from "react-use-wizard";
import { steps } from "@/config/steps-config";

type NavigationType = {
  [key: string]: {
    prevButton?: string;
    nextButton: string;
  };
};

export function FormShell<T extends FieldValues>({
  form,
  submitFunc,
  children,
}: {
  form: UseFormReturn<T>;
  submitFunc: SubmitHandler<T>;
  children: React.ReactNode;
}) {
  const { previousStep, isLoading, isFirstStep, activeStep } = useWizard();

  const navigation: NavigationType = steps.reduce((acc, step, index) => {
    const stepNumber = (index + 1).toString();
    acc[stepNumber] = {
      prevButton: steps[index - 1],
      nextButton: steps[index + 1] || "Generate Results",
    };
    return acc;
  }, {} as NavigationType);

  const currentStep = (activeStep + 1).toString();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitFunc)}
        className="w-full flex flex-col"
      >
        <div className="space-y-6">{children}</div>
        <div className="flex gap-2 ml-auto mt-16">
          {!isFirstStep && (
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => previousStep()}
            >
              {navigation[currentStep].prevButton}
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <svg
                className="w-[14px] h-[14px]"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
                stroke="white"
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            ) : null}
            {navigation[currentStep].nextButton}
          </Button>
        </div>
      </form>
    </Form>
  );
}
