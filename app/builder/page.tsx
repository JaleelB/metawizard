"use client";
import {
  SiteConfigLayout,
  SiteImgagesLayout,
  AuthorConfigsLayout,
  RobotsConfigLayout,
  SitemapConfigLayout,
} from "@/components/form";
import { Wizard } from "react-use-wizard";
import { motion } from "framer-motion";
import { steps } from "@/config/steps-config";
import WizardNav from "@/components/wizard-sidenav";
import { useEffect, useState } from "react";
import React from "react";
import { FormProvider } from "@/state/form-state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/components/ui/use-toast";
import SiteManifestConfigLayout from "@/components/form/site-manifest-config";

export default function ConfigurePage() {
  const [isNavVisible, setIsNavVisible] = useLocalStorage({
    key: "wizard-nav-visible",
    defaultValue: true,
    onPutSuccess: () => {},
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const [gridTemplateColumns, setGridTemplateColumns] =
    useState<string>("0px 1fr");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setIsNavVisible(false);
        setGridTemplateColumns("1fr");
      } else if (window.innerWidth >= 1440) {
        setIsNavVisible(true);
        setGridTemplateColumns("350px 1fr");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsNavVisible]);

  return (
    <FormProvider>
      <motion.div
        initial={{ gridTemplateColumns: gridTemplateColumns }}
        animate={{
          gridTemplateColumns: isNavVisible ? "350px 1fr" : "0px 1fr",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`h-[calc(100vh-65px)] w-full overflow-hidden grid grid-cols-1 flex-1`}
      >
        <Wizard
          header={
            <WizardNav
              steps={steps}
              isNavVisible={isNavVisible}
              setIsNavVisible={setIsNavVisible}
            />
          }
        >
          <SiteConfigLayout />
          <SiteImgagesLayout />
          <AuthorConfigsLayout />
          <SitemapConfigLayout />
          <RobotsConfigLayout />
          <SiteManifestConfigLayout />
        </Wizard>
      </motion.div>
    </FormProvider>
  );
}
