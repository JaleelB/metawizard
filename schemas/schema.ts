import { z } from "zod";

//utility schemas
const fileSchema = z.union([
  z.object({
    file: z.union([z.string().optional(), z.null().optional()]),
  }),
  z.string(),
]);

const urlSchema = z.string().url("Invalid URL").optional();

const switchSchema = z.boolean().optional();

const endpointValidation = (value: string) => {
  const regex = /^\/[\w-]+(\/[\w-]+)*(\/\d+)*(\/\d+)*$/;
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

export const siteImagesConfigSchema = z.object({
  siteLogo: fileSchema.optional(),
  openGraphImage: fileSchema.optional(),
  autoGenerateSiteLogo: switchSchema.optional(),
  autoGenerateOpenGraphImage: switchSchema.optional(),
});

export const authorConfigSchema = z.object({
  authorName: z.string().nonempty("Author name is required"),
  authorUrl: urlSchema,
  githubUrl: urlSchema,
  twitterUrl: urlSchema,
});

export const robotsConfigSchema = z.object({
  generateRobotsFile: switchSchema,
  generateStaticRobotsFile: switchSchema,
});

export const sitemapConfigSchema = z
  .object({
    generateSitemapFile: switchSchema,
    generateStaticSitemapFile: switchSchema,
    siteEndpoints: z.array(siteEndpointSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.generateSitemapFile) {
        return data.siteEndpoints && data.siteEndpoints.length > 0;
      }
      return true;
    },
    {
      message: "siteEndpoints is required when generateSitemapFile is true",
      path: ["siteEndpoints"],
    }
  );

export const siteManifestConfigSchema = z.object({
  generateSiteManifestFile: switchSchema,
  generateStaticSiteManifestFile: switchSchema,
});
