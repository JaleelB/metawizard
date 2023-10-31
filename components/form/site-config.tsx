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
import { FormShell } from "../form-shell";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Tag, TagInput } from "../tag-input";
import { useWizard } from "react-use-wizard";
import AnimatedShell from "./animated-form-shell";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";
import { siteConfigSchema } from "@/schemas/schema";
import { useSessionStorage } from "@/hooks/use-session-storage";

type SiteConfigSchema = z.infer<typeof siteConfigSchema>;

export default function SiteConfigLayout() {
  const form = useForm<SiteConfigSchema>({
    resolver: zodResolver(siteConfigSchema),
  });

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [keywordTags, setKeywordTags] = React.useState<Tag[]>([]);

  const { setValue, formState } = form;

  const [siteConfig, setSiteConfig] = useSessionStorage({
    key: "siteConfig",
    defaultValue: {},
    onPutSuccess: () => {
      // nextStep();
    },
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const onSubmit: SubmitHandler<SiteConfigSchema> = async (values) => {
    await setSiteConfig(values);
    nextStep();
  };

  // React.useEffect(() => {
  //   if (isSubmitted) {
  //     nextStep();
  //   }
  // }, [isSubmitted, nextStep]);

  // const onSubmit: SubmitHandler<SiteConfigSchema> = async (values) => {
  //   await save({
  //     values,
  //     uniqueKey: 1,
  //     storeName: "siteConfig",
  //     onPutSuccess: () => {
  //       setIsSubmitted(true);
  //     },
  //     onPutError: (toastProps) => {
  //       toast(toastProps);
  //     },
  //     onOpenError: (toastProps) => {
  //       toast(toastProps);
  //     },
  //   });
  // };

  return (
    <AnimatedShell className="flex flex-col gap-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Site config
        </h1>
        <p className="text-muted-foreground">
          Define key details about your website or application.
        </p>
      </div>
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
    </AnimatedShell>
  );
}
