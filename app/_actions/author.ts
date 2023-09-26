import { z } from "zod";
import { dbName, getAllDataFromStore, openDB } from "./db";
import { authorConfigSchema } from "@/schemas/schema";

export type authorType = z.infer<typeof authorConfigSchema>;

export async function generateAuthorData() {
  const db = await openDB(dbName);
  const authorData = (await getAllDataFromStore(
    db,
    "authorConfig"
  )) as authorType[];
  const author = authorData[0];

  return {
    authorName: author.authorName,
    authorUrl: author.authorUrl,
    githubUrl: author.githubUrl,
    twitterUrl: author.twitterUrl,
  };
}
