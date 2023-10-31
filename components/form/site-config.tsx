"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FormShell } from "./form-shell";
import { SubmitHandler, useForm } from "react-hook-form";
import { siteConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Tag, TagInput } from "../tag-input";
import { useWizard } from "react-use-wizard";
import AnimatedFormShell from "./animated-form-shell";
import { useFormContext } from "@/state/form-state";
import { generateSiteDetailsContent } from "@/lib/form-markdown-preview";
import FormStepHeader from "./form-step-header";
import FormStepLayout from "./form-step-layout";
import { useSessionStorage } from "@/hooks/use-session-storage";

export type SiteConfigSchema = z.infer<typeof siteConfigSchema>;

export default function SiteConfigLayout() {
  const form = useForm<SiteConfigSchema>({
    resolver: zodResolver(siteConfigSchema),
  });

  const { nextStep } = useWizard();
  const { toast } = useToast();
  const [keywordTags, setKeywordTags] = React.useState<Tag[]>([]);
  const storeName = "siteConfig";
  const reducerStateGroup = `${storeName}Data`;
  const { setValue, formState } = form;
  const { state, dispatch } = useFormContext();

  const [siteConfig, setSiteConfig] = useSessionStorage({
    key: storeName,
    defaultValue: {},
    onPutSuccess: () => {
      // nextStep();
    },
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        key: `${reducerStateGroup}.${event.target.name}`,
        value: event.target.value,
      },
    });
  };

  const onSubmit: SubmitHandler<SiteConfigSchema> = async (values) => {
    await setSiteConfig(values);
    nextStep();
  };

  return (
    <FormStepLayout
      code={generateSiteDetailsContent(state)}
      title="site config preview"
    >
      <AnimatedFormShell>
        <FormStepHeader
          title="Site config"
          description="Define key details about your website or application."
        />
        <FormShell submitFunc={onSubmit} form={form}>
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Site name"
                    id="site-name"
                    type="text"
                    className={
                      formState.errors.siteName
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e); // This ensures react-hook-form's internal state is also updated
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the title that will be displayed on your website or
                  application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siteDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Site description"
                    id="site-description"
                    type="text"
                    className={
                      formState.errors.siteDescription
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This description summarizes the content or purpose of your
                  website.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="siteKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site keywords</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Site keywords"
                    tags={keywordTags}
                    className={
                      formState.errors.siteKeywords
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    setTags={(newTags) => {
                      setKeywordTags(newTags);
                      setValue("siteKeywords", newTags as [Tag, ...Tag[]]);
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: {
                          key: `${reducerStateGroup}.siteKeywords`,
                          value: newTags as [Tag, ...Tag[]],
                        },
                      });
                    }}
                  />
                </FormControl>
                <FormDescription>
                  These keywords help improve the SEO of your website. Separate
                  them with commas, or hit the Enter key.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Site url"
                    className={
                      formState.errors.siteUrl
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    id="site-url"
                    type="url"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the full URL where your website or application will be
                  hosted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormShell>
      </AnimatedFormShell>
    </FormStepLayout>
  );
}
