import { z } from "zod";
import { dbName, getAllDataFromStore, openDB } from "./db";
import { siteConfigSchema } from "@/schemas/schema";

export type siteConfig = z.infer<typeof siteConfigSchema>;

export async function generatesiteConfigData() {
  const db = await openDB(dbName);
  const siteConfigData = (await getAllDataFromStore(
    db,
    "siteConfig"
  )) as siteConfig[];
  const siteConfig = siteConfigData[0];

  return {
    siteName: siteConfig.siteName,
    siteDescription: siteConfig.siteDescription,
    siteUrl: siteConfig.siteUrl,
    siteKeywords: siteConfig.siteKeywords,
  };
}
