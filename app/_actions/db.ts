import { z } from "zod";
import {
  authorConfigSchema,
  robotsConfigSchema,
  siteConfigSchema,
  siteImagesConfigSchema,
  siteManifestConfigSchema,
  sitemapConfigSchema,
} from "@/schemas/schema";

export type schemaTypes =
  | z.infer<typeof siteConfigSchema>
  | z.infer<typeof siteImagesConfigSchema>
  | z.infer<typeof authorConfigSchema>
  | z.infer<typeof robotsConfigSchema>
  | z.infer<typeof sitemapConfigSchema>
  | z.infer<typeof siteManifestConfigSchema>;

export const dbName = "MetadataDatabase";

export async function openDB(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    request.onerror = () => reject("Couldn't open IndexedDB.");
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getAllDataFromStore<T>(
  db: IDBDatabase,
  storeName: string
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(`Couldn't get data from ${storeName}.`);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getStoreNames(dbName: string): Promise<string[]> {
  const db = await openDB(dbName);
  return Array.from(db.objectStoreNames);
}

export async function getAllDataFromAllStores(
  dbName: string
): Promise<Record<string, schemaTypes[]>> {
  const db = await openDB(dbName);
  const allData: Record<string, any[]> = {};
  const storeNames = Array.from(db.objectStoreNames);

  for (const storeName of storeNames) {
    allData[storeName] = await getAllDataFromStore(db, storeName);
    console.log(`${storeName}:`, allData[storeName]);
  }

  return allData;
}
