"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FormShell } from "./form-shell";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { siteManifestConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Switch } from "../ui/switch";
import AnimatedFormShell from "./animated-form-shell";
import FormStepLayout from "./form-step-layout";
import { generateManifestDetailsContent } from "@/lib/form-markdown-preview";
import { Icon, useFormContext } from "@/state/form-state";
import FormStepHeader from "./form-step-header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionStorage } from "@/hooks/use-session-storage";

type SiteManifestConfigSchema = z.infer<typeof siteManifestConfigSchema>;

export default function SiteManifestConfigLayout() {
  const form = useForm<SiteManifestConfigSchema>({
    resolver: zodResolver(siteManifestConfigSchema),
    defaultValues: {
      generateSiteManifestFile: false,
      generateStaticSiteManifestFile: true,
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [isGeneratingSiteManifestFile, setIsGeneratingSiteManifestFile] =
    React.useState(false);
  const { state, dispatch } = useFormContext();
  const storeName = "siteManifestConfig";
  const reducerStateGroup = `${storeName}Data`;
  const formIcons = form.getValues("icons");

  const [siteManifestConfig, setSiteManifestConfig] = useSessionStorage({
    key: storeName,
    defaultValue: {},
    onPutSuccess: () => {
      // nextStep();
    },
    onPutError: (toastProps) => {
      toast(toastProps);
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "icons",
  });

  const iconTypes = [
    "image/x-icon",
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/webp",
  ];

  const manifestDisplayTypes = [
    "fullscreen",
    "standalone",
    "minimal-ui",
    "browser",
  ];

  const handleInputChange = React.useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | {
            target: {
              name: string;
              checked?: boolean;
              value?: string | Icon[];
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
    if (isGeneratingSiteManifestFile) {
      form.setValue("icons", [
        { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      ]);

      handleInputChange({
        target: {
          name: "icons",
          value: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
        },
      });
    } else {
      form.setValue("icons", []);
      handleInputChange({
        target: {
          name: "icons",
          value: [],
        },
      });
    }
  }, [form, handleInputChange, isGeneratingSiteManifestFile]);

  const onSubmit: SubmitHandler<SiteManifestConfigSchema> = async (values) => {
    await setSiteManifestConfig(values);
    router.push("/generate");
  };

  return (
    <FormStepLayout
      code={
        isGeneratingSiteManifestFile
          ? generateManifestDetailsContent(state) || ""
          : ""
      }
      title="web manifest config preview"
    >
      <AnimatedFormShell className={"flex flex-col w-full"}>
        <FormStepHeader
          title="Web Manifest File Config"
          description="Configure a manifest.(json|webmanifest) file that matches the Web
            Manifest Specification in the root of app directory to provide
            information about your web application for the browser."
        />
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
                    the ability to control how your app appears to the user in
                    the areas that they would expect to see apps (for example
                    the mobile home screen), direct what the user can launch and
                    more importantly how they can launch it.
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

                      const e = {
                        target: {
                          name: "generateSiteManifestFile",
                          checked: checkedState,
                        },
                      };
                      handleInputChange(e);

                      // setting the generateStaticSiteManifestFile form value based on generateSiteManifestFile value
                      const event = {
                        target: {
                          name: "generateStaticSiteManifestFile",
                          checked: checkedState,
                        },
                      };
                      form.setValue(
                        "generateStaticSiteManifestFile",
                        checkedState
                      );
                      handleInputChange(event);
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
                    id="generate-static-site-manifest-file"
                    checked={field.value}
                    disabled={!isGeneratingSiteManifestFile}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      const event = {
                        target: {
                          name: "generateStaticSiteManifestFile",
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Name"
                    id="name"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The name of the application as it is usually displayed to the
                  user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Short Name"
                    id="short-name"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  A short name of the application as it is usually displayed to
                  the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Description"
                    id="description"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  A description of the application as it is usually displayed to
                  the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Url</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Start URL"
                    id="start_url"
                    type="url"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The URL that loads when a user launches the application from a
                  device.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="display"
            render={({ field }) => (
              <FormItem className="min-w-[150px]">
                <FormLabel>Display</FormLabel>
                <Select
                  {...field}
                  disabled={!isGeneratingSiteManifestFile}
                  onValueChange={(selectedValue) => {
                    if (selectedValue !== undefined) {
                      form.setValue(
                        `display`,
                        selectedValue as
                          | "fullscreen"
                          | "standalone"
                          | "minimal-ui"
                          | "browser"
                      );
                      handleInputChange({
                        target: {
                          name: "display",
                          value: selectedValue,
                        },
                      });
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Manifest Display" />
                    </SelectTrigger>
                  </FormControl>
                  <FormDescription>
                    The developers prefered display mode for the website.
                  </FormDescription>
                  <FormMessage />
                  <SelectContent>
                    {manifestDisplayTypes.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="background_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Background Color"
                    id="background_color"
                    type="color"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The background color for the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theme_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme Color</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isGeneratingSiteManifestFile}
                    placeholder="Theme Color"
                    id="theme_color"
                    type="color"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The theme color for the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-2 sm:col-span-full pt-4">
            <FormLabel>Icons</FormLabel>
            <FormDescription className="pb-4">
              The icons that are used to represent the application in various
              places.
            </FormDescription>
            {fields.map((item, index) => (
              <div key={item.id} className="w-full flex gap-4">
                <FormField
                  name={`icons.${index}.src`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.icons ? "border-destructive" : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isGeneratingSiteManifestFile}
                          type="text"
                          placeholder="Endpoint"
                          className={`w-full ${
                            form.formState.errors.icons &&
                            form.formState.errors.icons[index] &&
                            form.formState.errors.icons[index]?.src
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          onChange={(e) => {
                            field.onChange(e);
                            if (formIcons) {
                              const updatedIcons = [...formIcons];

                              updatedIcons[index] = {
                                ...updatedIcons[index],
                                src: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "icons",
                                  value: updatedIcons,
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
                  name={`icons.${index}.sizes`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.icons ? "border-destructive" : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isGeneratingSiteManifestFile}
                          type="text"
                          placeholder="Endpoint"
                          className={`w-full ${
                            form.formState.errors.icons &&
                            form.formState.errors.icons[index] &&
                            form.formState.errors.icons[index]?.sizes
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          onChange={(e) => {
                            field.onChange(e);
                            if (formIcons) {
                              const updatedIcons = [...formIcons];

                              updatedIcons[index] = {
                                ...updatedIcons[index],
                                sizes: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "icons",
                                  value: updatedIcons,
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
                <div className="col-span-4 flex space-x-2">
                  <FormField
                    name={`icons[${index}].type`}
                    render={({ field }) => (
                      <FormItem className="min-w-[150px]">
                        <Select
                          {...field}
                          disabled={!isGeneratingSiteManifestFile}
                          onValueChange={(selectedValue) => {
                            form.setValue(`icons.${index}.type`, selectedValue);

                            if (formIcons) {
                              const updatedIcons = [...formIcons];

                              updatedIcons[index] = {
                                ...updatedIcons[index],
                                type: selectedValue,
                              };

                              handleInputChange({
                                target: {
                                  name: "icons",
                                  value: updatedIcons,
                                },
                              });
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Icon Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {iconTypes.map((option, index) => (
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
                    disabled={!isGeneratingSiteManifestFile}
                    onClick={() => {
                      if (!state.siteManifestConfigData.icons) return;
                      const icons = [...state.siteManifestConfigData.icons];

                      const updatedEndpoints = icons.filter(
                        (_, iconIndex) => iconIndex !== index
                      );
                      handleInputChange({
                        target: {
                          name: "icons",
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
              disabled={!isGeneratingSiteManifestFile}
              size="sm"
              className={cn("w-fit")}
              onClick={() => {
                const newIcon = {
                  src: "/favicon.ico",
                  sizes: "any",
                  type: "image/x-icon",
                };
                append(newIcon);
                handleInputChange({
                  target: {
                    name: "icons",
                    value: [
                      ...(state.siteManifestConfigData.icons || []),
                      newIcon,
                    ],
                  },
                });
              }}
            >
              Add Custom Icon
            </Button>
          </div>
        </FormShell>
      </AnimatedFormShell>
    </FormStepLayout>
  );
}
