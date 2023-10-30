"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { FormShell } from "../form-shell";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { sitemapConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { useWizard } from "react-use-wizard";
import AnimatedShell from "../animated-form-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";

type SitemapConfigSchema = z.infer<typeof sitemapConfigSchema>;

export default function SitemapConfigLayout() {
  const form = useForm<SitemapConfigSchema>({
    resolver: zodResolver(sitemapConfigSchema),
    defaultValues: {
      generateSitemapFile: false,
      generateStaticSitemapFile: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "siteEndpoints",
  });

  const changeFrequencyOptions: Array<string> = [
    "always",
    "hourly",
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "never",
  ];

  const priorityOptions: Array<string> = [
    "0",
    "0.1",
    "0.2",
    "0.3",
    "0.4",
    "0.5",
    "0.6",
    "0.7",
    "0.8",
    "0.9",
    "1",
  ];

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isGeneratingSitemapFile, setIsGeneratingSitemapFile] =
    React.useState(false);
  const [isGeneratingStaticSitemapFile, setIsGeneratingStaticSitemapFile] =
    React.useState(true);
  const generateSitemapFile = form.watch("generateSitemapFile");

  // Go to the next step if the form is submitted
  React.useEffect(() => {
    if (isSubmitted) {
      nextStep();
    }
  }, [isSubmitted, nextStep]);

  // Control the form values based on the generateSitemapFile value
  React.useEffect(() => {
    if (generateSitemapFile) {
      console.log("generateSitemapFile is true");
      form.setValue("siteEndpoints", [
        { endpoint: "", changeFrequency: "monthly", priority: "0.5" },
      ]);
    } else {
      form.setValue("siteEndpoints", []);
    }
  }, [form, generateSitemapFile]);

  const onSubmit: SubmitHandler<SitemapConfigSchema> = async (values) => {
    await save({
      values,
      uniqueKey: 5,
      storeName: "sitemapConfig",
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

  const staticSitemapFileExample = `
        app/sitemap.xml

        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://acme.com</loc>
                <lastmod>2023-04-06T15:02:24.021Z</lastmod>
                <changefreq>yearly</changefreq>
                <priority>1</priority>
            </url>
            <url>
                <loc>https://acme.com/about</loc>
                <lastmod>2023-04-06T15:02:24.021Z</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>https://acme.com/blog</loc>
                <lastmod>2023-04-06T15:02:24.021Z</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>
            </url>
        </urlset>
    `;

  const generateSitemapFileExample = `
        app/robots.ts

        import { MetadataRoute } from 'next'
 
        export default function sitemap(): MetadataRoute.Sitemap {
            return [
                {
                    url: 'https://acme.com',
                    lastModified: new Date(),
                    changeFrequency: 'yearly',
                    priority: 1,
                },
                {
                    url: 'https://acme.com/about',
                    lastModified: new Date(),
                    changeFrequency: 'monthly',
                    priority: 0.8,
                },
                {
                    url: 'https://acme.com/blog',
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.5,
                },
            ]
        }
    `;

  return (
    <AnimatedShell className={"flex flex-col gap-12 w-full"}>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Sitemap.xml File Config
        </h1>
        <p className="text-muted-foreground">
          Configure a file that matches the Sitemaps XML format in the root of
          app directory to help search engine crawlers crawl your site more
          efficiently.
        </p>
      </div>
      <FormShell submitFunc={onSubmit} form={form}>
        <FormField
          control={form.control}
          name="generateSitemapFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a sitemap.xml file</FormLabel>
                <FormDescription>
                  This file is a roadmap of your website that helps search
                  engines find, crawl, and index all of your webpages.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingSitemapFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="generateStaticSitemapFile"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
              <div className="space-y-1 leading-none mr-4 sm:mr-2">
                <FormLabel>Generate a static sitemap.xml file</FormLabel>
                <FormDescription>
                  This allows you to generate a static sitemap.xml file or a
                  sitemap.ts file that returns a Sitemap object.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="site-logo"
                  checked={field.value}
                  disabled={!isGeneratingSitemapFile}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsGeneratingStaticSitemapFile(checkedState);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-2 sm:col-span-full">
          <FormLabel>Site Endpoints</FormLabel>
          <FormDescription className="mb-1">
            These are the endpoints used in your website. Add the URL endpoint,
            change frequency, and priority for each endpoint.
          </FormDescription>
          {fields.map((item, index) => (
            <div key={item.id} className="w-full flex gap-4">
              <FormField
                name={`siteEndpoints.${index}.endpoint`}
                render={({ field }) => (
                  <FormItem
                    className={`w-full ${
                      form.formState.errors.siteEndpoints
                        ? "border-destructive"
                        : ""
                    }`}
                  >
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isGeneratingSitemapFile}
                        type="text"
                        placeholder="Endpoint"
                        className={`w-full ${
                          form.formState.errors.siteEndpoints &&
                          form.formState.errors.siteEndpoints[index] &&
                          form.formState.errors.siteEndpoints[index]?.endpoint
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`siteEndpoints[${index}].changeFrequency`}
                render={({ field }) => (
                  <FormItem className="min-w-[100px]">
                    <Select
                      {...field}
                      disabled={!isGeneratingSitemapFile}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Change Frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {changeFrequencyOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="col-span-4 flex space-x-2">
                <FormField
                  name={`siteEndpoints[${index}].priority`}
                  render={({ field }) => (
                    <FormItem className="min-w-[100px]">
                      <Select
                        {...field}
                        disabled={!isGeneratingSitemapFile}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  disabled={!isGeneratingSitemapFile}
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            disabled={!isGeneratingSitemapFile}
            size="sm"
            className={cn("w-fit")}
            onClick={() =>
              append({
                endpoint: "",
                changeFrequency: "monthly",
                priority: "0.5",
              })
            }
          >
            Add Custom Site Endpoint
          </Button>
        </div>
        {isGeneratingSitemapFile ? (
          <div className="pt-6 w-full">
            <h2 className="text-xs font-medium mb-2 uppercase tracking-tight">{`PREVIEW (${
              isGeneratingSitemapFile ? "sitemap.xml" : "sitemap.ts"
            })`}</h2>
            <pre className="relative mb-4w-full overflow-y-auto rounded-lg border bg-primary py-4 dark:bg-zinc-900">
              {isGeneratingStaticSitemapFile ? (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {staticSitemapFileExample.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </code>
              ) : (
                <code className="relative rounded bg-transparent text-white py-[0.2rem] font-mono text-sm px-4">
                  {generateSitemapFileExample.split("\n").map((line, index) => (
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
