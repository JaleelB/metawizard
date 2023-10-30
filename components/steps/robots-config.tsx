"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { FormShell } from "../form-shell";
import { SubmitHandler, useForm } from "react-hook-form";
import { robotsConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Switch } from "../ui/switch";
import { useWizard } from "react-use-wizard";
import AnimatedShell from "../animated-form-shell";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";
import { useSessionStorage } from "@/hooks/use-session-storage";

type RobotsConfigSchema = z.infer<typeof robotsConfigSchema>;

export default function RobotsConfigLayout() {
  const form = useForm<RobotsConfigSchema>({
    resolver: zodResolver(robotsConfigSchema),
    defaultValues: {
      generateRobotsFile: false,
      generateStaticRobotsFile: true,
    },
  });

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isGeneratingRobotsFile, setIsGeneratingRobotsFile] =
    React.useState(false);
  const [isGeneratingStaticRobotsFile, setIsGeneratingStaticRobotsFile] =
    React.useState(true);

  const [robotsConfig, setRobotsConfig] = useSessionStorage({
    key: "robotsConfig",
    defaultValue: {},
    onPutSuccess: () => {
      // nextStep();
    },
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const onSubmit: SubmitHandler<RobotsConfigSchema> = async (values) => {
    await setRobotsConfig(values);
    nextStep();
  };

  // React.useEffect(() => {
  //   if (isSubmitted) {
  //     nextStep();
  //   }
  // }, [isSubmitted, nextStep]);

  // const onSubmit: SubmitHandler<RobotsConfigSchema> = async (values) => {
  //   await save({
  //     values,
  //     uniqueKey: 4,
  //     storeName: "robotsConfig",
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

  const staticRobotsFileExample = `
        app/robots.txt

        User-Agent: *
        Allow: /
        Disallow: /private/
        
        Sitemap: https://acme.com/sitemap.xml
    `;

  const generateRobotsFileExample = `
        app/robots.ts

        import { MetadataRoute } from 'next'
    
        export default function robots(): MetadataRoute.Robots {
            return {
                rules: {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
                },
                sitemap: 'https://acme.com/sitemap.xml',
            }
        }
    `;

  return (
    <AnimatedShell className="w-full flex flex-col gap-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Robots.txt File Config
        </h1>
        <p className="text-muted-foreground">
          Configure a file that matches the Robots Exclusion Standard in the
          root of app directory to tell search engine crawlers which URLs they
          can access on your site.
        </p>
      </div>
      <FormShell submitFunc={onSubmit} form={form}>
        <FormField
          control={form.control}
          name="generateRobotsFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a robots.txt file</FormLabel>
                <FormDescription>
                  This file is used to give instructions about your site to web
                  robots.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingRobotsFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="generateStaticRobotsFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a static robots.txt file</FormLabel>
                <FormDescription>
                  This allows you to generate a static robots.txt file or a
                  robots.ts file that returns a Robots object.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  disabled={!isGeneratingRobotsFile}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingStaticRobotsFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isGeneratingRobotsFile ? (
          <div className="pt-6 w-full">
            <h2 className="text-xs font-medium mb-2 uppercase tracking-tight">{`PREVIEW (${
              isGeneratingStaticRobotsFile ? "robots.txt" : "robots.ts"
            })`}</h2>
            <pre className="relative mb-4 w-full overflow-y-auto rounded-lg border bg-primary py-4 dark:bg-zinc-900">
              {isGeneratingStaticRobotsFile ? (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {staticRobotsFileExample.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </code>
              ) : (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {generateRobotsFileExample.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </code>
              )}
            </pre>
          </div>
        ) : null}
      </FormShell>
    </AnimatedShell>
  );
}
