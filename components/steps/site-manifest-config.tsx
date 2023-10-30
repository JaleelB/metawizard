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
import { useRouter } from "next/navigation";
import { siteManifestConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Switch } from "../ui/switch";
import { useWizard } from "react-use-wizard";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";
import AnimatedFormShell from "../animated-form-shell";

type SiteManifestConfigSchema = z.infer<typeof siteManifestConfigSchema>;

export default function SiteManifestConfigLayout() {
  const form = useForm<SiteManifestConfigSchema>({
    resolver: zodResolver(siteManifestConfigSchema),
    defaultValues: {
      generateSiteManifestFile: false,
      generateStaticSiteManifestFile: true,
    },
  });

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isGeneratingSiteManifestFile, setIsGeneratingSiteManifestFile] =
    React.useState(false);
  const [
    isGeneratingStaticSiteManifestFile,
    setIsGeneratingStaticSiteManifestFile,
  ] = React.useState(true);

  React.useEffect(() => {
    if (isSubmitted) {
      router.push("/generate");
    }
  }, [isSubmitted, nextStep, router]);

  const onSubmit: SubmitHandler<SiteManifestConfigSchema> = async (values) => {
    await save({
      values,
      uniqueKey: 6,
      storeName: "siteManifestConfig",
      onPutSuccess: () => {
        setIsSubmitted(true);
      },
      onPutError: (toastProps) => {
        toast(toastProps);
      },
      onOpenError: (toastProps) => {
        toast(toastProps);
      },
    });
  };

  const staticSiteManifestFileExample = `
        app/manifest.json | app/manifest.webmanifest

        {
            "name": "My Next.js Application",
            "short_name": "Next.js App",
            "description": "An application built with Next.js",
            "start_url": "/"
            // ...
        }
    `;

  const generateSiteManifestFileExample = `
        app/manifest.ts

        import { MetadataRoute } from 'next'
 
        export default function manifest(): MetadataRoute.Manifest {
            return {
                name: 'Next.js App',
                short_name: 'Next.js App',
                description: 'Next.js App',
                start_url: '/',
                display: 'standalone',
                background_color: '#fff',
                theme_color: '#fff',
                icons: [
                    {
                        src: '/favicon.ico',
                        sizes: 'any',
                        type: 'image/x-icon',
                    },
                ],
            }
        }
    `;

  return (
    <AnimatedFormShell className={"flex flex-col gap-12 w-full"}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Web Manifest File Config
        </h1>
        <p className="text-muted-foreground">
          Configure a manifest.(json|webmanifest) file that matches the Web
          Manifest Specification in the root of app directory to provide
          information about your web application for the browser.
        </p>
      </div>
      <FormShell submitFunc={onSubmit} form={form}>
        <FormField
          control={form.control}
          name="generateSiteManifestFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a web manifest file</FormLabel>
                <FormDescription>
                  This file is a simple .json/.webmanifest file that gives you
                  the ability to control how your app appears to the user in the
                  areas that they would expect to see apps (for example the
                  mobile home screen), direct what the user can launch and more
                  importantly how they can launch it.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingSiteManifestFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="generateStaticSiteManifestFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a static web manifest file</FormLabel>
                <FormDescription>
                  This allows you to generate a static web manifest file or a
                  manifest.ts file that returns a Manifest object.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  disabled={!isGeneratingSiteManifestFile}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingStaticSiteManifestFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isGeneratingSiteManifestFile ? (
          <div className="pt-6 w-full">
            <h2 className="text-xs font-medium mb-2 uppercase tracking-tight">{`PREVIEW (${
              isGeneratingSiteManifestFile ? "sitemap.xml" : "sitemap.ts"
            })`}</h2>
            <pre className="relative mb-4w-full overflow-y-auto rounded-lg border bg-primary py-4 dark:bg-zinc-900">
              {isGeneratingStaticSiteManifestFile ? (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {staticSiteManifestFileExample
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </code>
              ) : (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {generateSiteManifestFileExample
                    .split("\n")
                    .map((line, index) => (
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
    </AnimatedFormShell>
  );
}
