"use client";
import {
  SiteConfigLayout,
  SiteImgagesLayout,
  AuthorConfigsLayout,
  RobotsConfigLayout,
  SitemapConfigLayout,
} from "@/components/steps";
import { Wizard } from "react-use-wizard";
import { AnimatePresence } from "framer-motion";
import WizardNav from "@/components/wizard-sidenav";
import { steps } from "@/config/steps-config";

export default function ConfigurePage() {
  return (
    <div className="h-full grid flex-1 lg:grid-cols-[450px_1fr]">
      <Wizard
        wrapper={<AnimatePresence />}
        header={<WizardNav steps={steps} />}
      >
        <SiteConfigLayout />
        <SiteImgagesLayout />
        <AuthorConfigsLayout />
        <RobotsConfigLayout />
        <SitemapConfigLayout />
      </Wizard>
    </div>
  );
}
