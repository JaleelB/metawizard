import { z } from "zod";

const urlSchema = z.string().url("Invalid URL");

const switchSchema = z.boolean().optional();

const styleSchema = z.object({
  text: z.string().optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  borderRadius: z.string().optional(),
  fontSize: z.string().optional(),
});

const ruleSchema = z.object({
  userAgent: z.string().min(1, "User agent is required").default("*"),
  allow: z.string().default("/"),
  disallow: z.string().default("/"),
  crawlDelay: z.string().default("Default"),
});

const endpointValidation = (value: string) => {
  const regex = /^\/([\w-]+(\/[\w-]+)*(\/\d+)*(\/\d+)*)?$/;
  return regex.test(value);
};

const siteEndpointSchema = z.object({
  endpoint: z
    .string()
    .refine(
      endpointValidation,
      "Endpoint format is invalid. It should start with a '/' and can contain alphanumeric characters, hyphens, and slashes."
    ),
  changeFrequency: z
    .enum(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"])
    .default("monthly"),
  priority: z
    .enum([
      "0.0",
      "0.1",
      "0.2",
      "0.3",
      "0.4",
      "0.5",
      "0.6",
      "0.7",
      "0.8",
      "0.9",
      "1.0",
    ])
    .default("0.5"),
});

// schemas for eacgh for s
export const siteConfigSchema = z.object({
  siteName: z.string().nonempty("Site name is required"),
  siteDescription: z.string().nonempty("Site description is required"),
  siteKeywords: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  siteUrl: z.string().url("Invalid URL").nonempty("Site URL is required"),
});

export const siteImagesConfigSchema = z
  .object({
    autoGenerateSiteLogo: switchSchema.optional(),
    siteLogoStyles: styleSchema.optional(),
    autoGenerateOpenGraphImage: switchSchema.optional(),
    openGraphImageStyles: styleSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.autoGenerateSiteLogo && !data.siteLogoStyles) {
        return false; // Validation fails if autoGenerateSiteLogo is true but siteLogoStyles is not provided
      }
      if (data.autoGenerateOpenGraphImage && !data.openGraphImageStyles) {
        return false; // Validation fails if autoGenerateOpenGraphImage is true but openGraphImageStyles is not provided
      }
      return true; // Validation passes otherwise
    },
    {
      message: "Styles are required when auto generation is enabled",
      path: [], // This error will be attached to the root of the object
    }
  );

export const authorConfigSchema = z.object({
  authors: z.array(
    z.object({
      name: z.string().nonempty("Author name is required"),
      url: urlSchema.nonempty(
        "Author URL is required. This can be a personal website or a github profile."
      ),
    })
  ),
  creator: z.string().nonempty("Creator name is required"),
  twitterUsername: z.string().optional(),
});

// export const robotsConfigSchema = z
//   .object({
//     generateRobotsFile: switchSchema,
//     generateStaticRobotsFile: switchSchema,
//     generateDefaultRobotsFile: switchSchema,
//     host: urlSchema.optional(),
//     rules: z.array(ruleSchema).optional(),
//   })
//   .refine(
//     (data) =>
//       data.generateRobotsFile !== true || (data.rules && data.rules.length > 0),
//     {
//       message: "At least one rule is required when generateRobotsFile is true",
//       path: ["rules"],
//     }
//   );
export const robotsConfigSchema = z
  .object({
    generateRobotsFile: switchSchema,
    generateStaticRobotsFile: switchSchema,
    generateDefaultRobotsFile: switchSchema,
    host: urlSchema.optional(),
    rules: z.array(ruleSchema).optional(),
  })
  .refine(
    (data) => {
      // If generateRobotsFile is true and generateDefaultRobotsFile is false,
      // then rules are required and must have a length greater than 0.
      if (data.generateRobotsFile && !data.generateDefaultRobotsFile) {
        return data.rules && data.rules.length > 0;
      }
      // If generateDefaultRobotsFile is true, or generateRobotsFile is false,
      // then rules are not required.
      return true;
    },
    {
      message:
        "At least one rule is required when generateRobotsFile is true and generateDefaultRobotsFile is not true",
      path: ["rules"],
    }
  );

export const sitemapConfigSchema = z
  .object({
    generateSitemapFile: switchSchema,
    generateStaticSitemapFile: switchSchema,
    generateDefaultSitemapFile: switchSchema,
    siteEndpoints: z.array(siteEndpointSchema).optional(),
  })
  .refine(
    (data) => {
      // If generateSitemapFile is true and generateDefaultSitemapFile is false,
      // then siteEndpoints is required and must have a length greater than 0.
      if (data.generateSitemapFile && !data.generateDefaultSitemapFile) {
        return data.siteEndpoints && data.siteEndpoints.length > 0;
      }
      // If generateDefaultSitemapFile is true, or generateSitemapFile is false,
      // then siteEndpoints is not required.
      return true;
    },
    {
      message:
        "siteEndpoints is required when generateSitemapFile is true and generateDefaultSitemapFile is not true",
      path: ["siteEndpoints"],
    }
  );

export const siteManifestConfigSchema = z
  .object({
    generateSiteManifestFile: switchSchema,
    generateStaticSiteManifestFile: switchSchema,
    name: z.string().optional(),
    short_name: z.string().optional(),
    description: z.string().optional(),
    start_url: z.string().optional(),
    display: z
      .enum(["fullscreen", "standalone", "minimal-ui", "browser"])
      .optional(),
    background_color: z.string().optional(),
    theme_color: z.string().optional(),
    icons: z.array(
      z.object({
        src: z.string(),
        sizes: z.string(),
        type: z.string(),
      })
    ),
  })
  .refine((data) => !data.generateSiteManifestFile || data.name, {
    message: "Name is required",
    path: ["name"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.short_name, {
    message: "Short name is required",
    path: ["short_name"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.description, {
    message: "Description is required",
    path: ["description"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.start_url, {
    message: "Start url is required",
    path: ["start_url"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.display, {
    message: "Display is required",
    path: ["display"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.background_color, {
    message: "Background Color is required",
    path: ["background_color"],
  })
  .refine((data) => !data.generateSiteManifestFile || data.theme_color, {
    message: "Theme Color is required",
    path: ["theme_color"],
  })
  .refine(
    (data) =>
      !data.generateSiteManifestFile || (data.icons && data.icons.length > 0),
    {
      message: "At least one icon is required",
      path: ["icons"],
    }
  );
