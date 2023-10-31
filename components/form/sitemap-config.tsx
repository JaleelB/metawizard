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
import { FormShell } from "./form-shell";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { sitemapConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { useWizard } from "react-use-wizard";
import AnimatedFormShell from "./animated-form-shell";
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
import {
  SiteEndpoint,
  type changeFrequencyOptions,
  type priorityOptions,
  useFormContext,
} from "@/state/form-state";
import FormStepLayout from "./form-step-layout";
import FormStepHeader from "./form-step-header";
import { generateSitemapDetailsContent } from "@/lib/form-markdown-preview";
import { useSessionStorage } from "@/hooks/use-session-storage";

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
  const { toast } = useToast();
  const [isGeneratingSitemapFile, setIsGeneratingSitemapFile] =
    React.useState(false);
  const generateSitemapFile = form.watch("generateSitemapFile");
  const { state, dispatch } = useFormContext();
  const storeName = "sitemapConfig";
  const reducerStateGroup = `${storeName}Data`;
  const formEndpoints = form.getValues("siteEndpoints");

  const [sitemapConfig, setSitemapConfig] = useSessionStorage({
    key: storeName,
    defaultValue: {},
    onPutSuccess: () => {
      // nextStep();
    },
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const handleInputChange = React.useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | {
            target: {
              name: string;
              checked?: boolean;
              value?: string | SiteEndpoint[];
            };
          }
    ) => {
      const target = event.target as HTMLInputElement;
      const value = target.checked ? target.checked : target.value;

      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          key: `${reducerStateGroup}.${target.name}`,
          value: value,
        },
      });
    },
    [dispatch, reducerStateGroup]
  );

  // Control the form values based on the generateSitemapFile value
  React.useEffect(() => {
    if (generateSitemapFile) {
      form.setValue("siteEndpoints", [
        { endpoint: "/", changeFrequency: "monthly", priority: "0.5" },
      ]);

      handleInputChange({
        target: {
          name: "siteEndpoints",
          value: [
            {
              endpoint: "/",
              changeFrequency: "monthly",
              priority: "0.5",
            },
          ],
        },
      });
    } else {
      form.setValue("siteEndpoints", []);
      handleInputChange({
        target: {
          name: "rules",
          value: [],
        },
      });
    }
  }, [form, generateSitemapFile, handleInputChange]);

  const onSubmit: SubmitHandler<SitemapConfigSchema> = async (values) => {
    await setSitemapConfig(values);
    nextStep();
  };

  return (
    <FormStepLayout
      code={generateSitemapDetailsContent(state) || ""}
      title="sitemap.xml config preview"
    >
      <AnimatedFormShell className={"flex flex-col w-full"}>
        <FormStepHeader
          title="Sitemap.xml File Config"
          description="Configure a file that matches the Sitemaps XML format in the root of
            app directory to help search engine crawlers crawl your site more
            efficiently."
        />
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
                    id="generate-sitemap"
                    checked={field.value}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      if (checkedState === true || checkedState === false) {
                        setIsGeneratingSitemapFile(checkedState);
                      }

                      const e = {
                        target: {
                          name: "generateSitemapFile",
                          checked: checkedState,
                        },
                      };
                      handleInputChange(e);

                      // setting the generateStaticSitemapFile form value based on generateSitemapFile value
                      const event = {
                        target: {
                          name: "generateStaticSitemapFile",
                          checked: checkedState,
                        },
                      };
                      form.setValue("generateStaticSitemapFile", checkedState);
                      handleInputChange(event);
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
                    id="generate-static-sitemap"
                    checked={field.value}
                    disabled={!isGeneratingSitemapFile}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      const event = {
                        target: {
                          name: "generateStaticSitemapFile",
                          checked: checkedState,
                        },
                      };
                      handleInputChange(event);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-2 sm:col-span-full pt-4">
            <FormLabel>Site Endpoints</FormLabel>
            <FormDescription className="pb-4">
              These are the endpoints used in your website. Add the URL
              endpoint, change frequency, and priority for each endpoint.
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
                          onChange={(e) => {
                            field.onChange(e);
                            if (formEndpoints) {
                              const updatedEndpoints = [...formEndpoints];

                              updatedEndpoints[index] = {
                                ...updatedEndpoints[index],
                                endpoint: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "siteEndpoints",
                                  value: updatedEndpoints,
                                },
                              });
                            }
                          }}
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
                        // onValueChange={field.onChange}
                        onValueChange={(selectedValue) => {
                          form.setValue(
                            `siteEndpoints.${index}.changeFrequency`,
                            selectedValue as changeFrequencyOptions
                          );

                          if (formEndpoints) {
                            const updatedEndpoints = [...formEndpoints];

                            updatedEndpoints[index] = {
                              ...updatedEndpoints[index],
                              changeFrequency:
                                selectedValue as changeFrequencyOptions,
                            };

                            handleInputChange({
                              target: {
                                name: "siteEndpoints",
                                value: updatedEndpoints,
                              },
                            });
                          }
                        }}
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
                          // onValueChange={field.onChange}
                          onValueChange={(selectedValue) => {
                            form.setValue(
                              `siteEndpoints.${index}.priority`,
                              selectedValue as priorityOptions
                            );

                            if (formEndpoints) {
                              const updatedEndpoints = [...formEndpoints];

                              updatedEndpoints[index] = {
                                ...updatedEndpoints[index],
                                priority: selectedValue as priorityOptions,
                              };

                              handleInputChange({
                                target: {
                                  name: "siteEndpoints",
                                  value: updatedEndpoints,
                                },
                              });
                            }
                          }}
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
                    // onClick={() => remove(index)}
                    onClick={() => {
                      if (!state.sitemapConfigData.siteEndpoints) return;
                      const siteEndpoints = [
                        ...state.sitemapConfigData.siteEndpoints,
                      ];

                      const updatedEndpoints = siteEndpoints.filter(
                        (_, endpointIndex) => endpointIndex !== index
                      );
                      handleInputChange({
                        target: {
                          name: "siteEndpoints",
                          value: updatedEndpoints,
                        },
                      });

                      remove(index);
                    }}
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
              onClick={() => {
                const newEndpoint: SiteEndpoint = {
                  endpoint: "/",
                  changeFrequency: "monthly",
                  priority: "0.5",
                };
                append(newEndpoint);
                handleInputChange({
                  target: {
                    name: "siteEndpoints",
                    value: [
                      ...(state.sitemapConfigData.siteEndpoints || []),
                      newEndpoint,
                    ],
                  },
                });
              }}
            >
              Add Custom Site Endpoint
            </Button>
          </div>
        </FormShell>
      </AnimatedFormShell>
    </FormStepLayout>
  );
}
