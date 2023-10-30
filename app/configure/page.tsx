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
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/components/ui/use-toast";
import WizardNav from "@/components/wizard-sidenav";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setIsNavVisible(false);
      } else if (window.innerWidth > 1440) {
        setIsNavVisible(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsNavVisible]);

  return (
    <motion.div
      initial={{ gridTemplateColumns: "350px 1fr" }}
      animate={{
        gridTemplateColumns: isNavVisible ? "350px 1fr" : "0px 1fr",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`h-[calc(100vh-65px)] w-full overflow-hidden grid grid-cols-1 flex-1 lg:grid-cols-[350px_1fr]`}
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
  );
}
