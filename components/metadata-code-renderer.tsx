"use client";
import * as React from "react";
import CodeBlock from "./builder/code-block";
import { generateMetadataObject } from "@/app/data/site";
import {
  generateOpenGraphTwitterImage,
  generateSiteLogo,
} from "@/app/data/images";
import { generateRobotsContent } from "@/app/data/robots";
import { generateWebManifest } from "@/app/data/manifest";
import { generatesiteMapContent } from "@/app/data/sitemaps";

interface MetadataCodeRendererProps {
  functionName: keyof typeof functions;
  text?: string;
}

const functions = {
  generateMetadataObject: generateMetadataObject,
  generateOpenGraphTwitterImage: generateOpenGraphTwitterImage,
  generateSiteLogo: generateSiteLogo,
  generateRobotsContent: generateRobotsContent,
  generateWebManifest: generateWebManifest,
  generatesiteMapContent: generatesiteMapContent,
};

export function MetadataCodeRenderer({
  functionName,
  text,
}: MetadataCodeRendererProps) {
  const [codeString, setCodeString] = React.useState<string | null | undefined>(
    ""
  );

  React.useEffect(() => {
    const generateCode = functions[functionName];
    if (generateCode) {
      generateCode()
        .then((string) => {
          setCodeString(string);
        })
        .catch((error) => {
          console.error("metadta error:", error);
        });
    } else {
      console.error(`Function named "${functionName}" not found.`);
    }
  }, [functionName]);

  return codeString ? (
    <div className="w-full mt-6 mb-12 space-y-6">
      <p>{text}</p>
      <CodeBlock value={codeString} />
    </div>
  ) : null;
}
