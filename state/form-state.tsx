"use client";
import { type Tag } from "@/components/tag-input";
import { schemaTypes } from "@/types/types";
import {
  authorConfigSchema,
  robotsConfigSchema,
  siteConfigSchema,
  siteImagesConfigSchema,
  siteManifestConfigSchema,
  sitemapConfigSchema,
} from "@/schemas/schema";
import { z } from "zod";
import React from "react";

export type State = {
  siteConfigData: z.infer<typeof siteConfigSchema>;
  robotsConfigData: z.infer<typeof robotsConfigSchema>;
  siteImagesConfigData: z.infer<typeof siteImagesConfigSchema>;
  authorConfigData: z.infer<typeof authorConfigSchema>;
  sitemapConfigData: z.infer<typeof sitemapConfigSchema>;
  siteManifestConfigData: z.infer<typeof siteManifestConfigSchema>;
};

export const styles = {
  text: "",
  color: "#ffffff",
  backgroundColor: "#ae00ff",
  borderRadius: "0px",
  fontSize: "16px",
};

export type Rule = {
  userAgent: string;
  allow: string;
  disallow: string;
  crawlDelay: string;
};

export type changeFrequencyOptions =
  | "never"
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export type priorityOptions =
  | "0.0"
  | "0.1"
  | "0.2"
  | "0.3"
  | "0.4"
  | "0.5"
  | "0.6"
  | "0.7"
  | "0.8"
  | "0.9"
  | "1.0";

export type SiteEndpoint = {
  endpoint: string;
  changeFrequency: changeFrequencyOptions;
  priority: priorityOptions;
};

export type Icon = { src: string; sizes: string; type: string };

export type Action = {
  type: "SET_FORM_DATA";
  payload: {
    key: string;
    value:
      | boolean
      | string
      | Tag[]
      | File
      | null
      | Rule[]
      | typeof styles
      | SiteEndpoint[]
      | Icon[];
  };
};

export const initialState: State = {
  siteConfigData: {
    siteName: "",
    siteDescription: "",
    siteKeywords: [],
    siteUrl: "",
  },
  siteImagesConfigData: {
    // siteLogo: null,
    autoGenerateSiteLogo: false,
    siteLogoStyles: {
      ...styles,
    },
    autoGenerateOpenGraphImage: false,
    openGraphImageStyles: {
      ...styles,
    },
  },
  authorConfigData: {
    authors: [],
    creator: "",
    twitterUsername: "",
  },
  robotsConfigData: {
    generateRobotsFile: false,
    generateStaticRobotsFile: false,
    rules: [],
    host: "",
  },
  sitemapConfigData: {
    generateSitemapFile: false,
    generateStaticSitemapFile: false,
    siteEndpoints: [],
  },
  siteManifestConfigData: {
    generateSiteManifestFile: false,
    generateStaticSiteManifestFile: false,
    name: "",
    short_name: "",
    description: "",
    start_url: "",
    display: "standalone",
    background_color: "",
    theme_color: "",
    icons: [],
  },
};

export const FormContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function useFormContext() {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function formReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case "SET_FORM_DATA":
      const keys = action.payload.key.split(".");
      if (keys.length > 1) {
        const mainKey = keys[0] as keyof typeof initialState;
        if (Array.isArray(state[mainKey])) {
          const index = parseInt(keys[1]);
          const subKey = keys[2];
          const updatedArray = [...(state[mainKey] as schemaTypes[])];
          updatedArray[index] = {
            ...updatedArray[index],
            [subKey]: action.payload.value,
          };
          return {
            ...state,
            [mainKey]: updatedArray,
          };
        } else if (
          typeof state[mainKey as keyof typeof state] === "object" &&
          state[mainKey as keyof typeof state] !== null
        ) {
          const subKey = keys[1] as keyof (typeof state)[typeof mainKey];
          return {
            ...state,
            [mainKey as keyof typeof state]: {
              ...state[mainKey as keyof typeof state],
              [subKey]: action.payload.value,
            },
          };
        }
      } else {
        return {
          ...state,
          [keys[0] as keyof State]: action.payload.value,
        };
      }
    default:
      return state;
  }
}
