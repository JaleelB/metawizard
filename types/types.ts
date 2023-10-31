import { z } from "zod";
import {
  authorConfigSchema,
  robotsConfigSchema,
  siteConfigSchema,
  siteImagesConfigSchema,
  siteManifestConfigSchema,
  sitemapConfigSchema,
} from "@/schemas/schema";

type ButtonProps = {
  navigateTo?: () => void;
  buttonText: string;
};

export type MultiStepNavigation = {
  prevButton?: ButtonProps;
  nextButton?: ButtonProps;
};

export type schemaTypes =
  | z.infer<typeof siteConfigSchema>
  | z.infer<typeof siteImagesConfigSchema>
  | z.infer<typeof authorConfigSchema>
  | z.infer<typeof robotsConfigSchema>
  | z.infer<typeof sitemapConfigSchema>
  | z.infer<typeof siteManifestConfigSchema>;
