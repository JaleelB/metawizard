import Link from "next/link";
import { useWizard } from "react-use-wizard";
import { Icons } from "./ui/icons";
import { siteConfig } from "@/config/site";
import { type Step } from "@/config/steps-config";

export default function WizardNav({ steps }: { steps: Step[] }) {
  const { activeStep, stepCount } = useWizard();

  return (
    <aside className="hidden lg:block bg-[#F9FAFC] p-8 pl-10">
      <div className="flex flex-col">
        <Link href="/" className="pb-20 flex items-center space-x-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="hidden font-bold text-xl sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
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
    </aside>
  );
}
