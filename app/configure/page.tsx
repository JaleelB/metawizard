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

export default function ConfigurePage() {
  return (
    <Wizard wrapper={<AnimatePresence />}>
      <SiteConfigLayout />
      <SiteImgagesLayout />
      <AuthorConfigsLayout />
      <RobotsConfigLayout />
      <SitemapConfigLayout />
    </Wizard>
  );
}
