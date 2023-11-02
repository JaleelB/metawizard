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
import { robotsConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Switch } from "../ui/switch";
import { useWizard } from "react-use-wizard";
import AnimatedFormShell from "./animated-form-shell";
import { Rule, useFormContext } from "@/state/form-state";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import FormStepLayout from "./form-step-layout";
import FormStepHeader from "./form-step-header";
import { generateRobotsFileContent } from "@/lib/form-markdown-preview";
import { useSessionStorage } from "@/hooks/use-session-storage";

export type RobotsConfigSchema = z.infer<typeof robotsConfigSchema>;

export default function RobotsConfigLayout() {
  const form = useForm<RobotsConfigSchema>({
    resolver: zodResolver(robotsConfigSchema),
    defaultValues: {
      generateRobotsFile: false,
      generateStaticRobotsFile: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  const { nextStep } = useWizard();
  const { toast } = useToast();
  const [isGeneratingRobotsFile, setIsGeneratingRobotsFile] =
    React.useState(false);
  const generateRobotsFile = form.watch("generateRobotsFile");
  const { state, dispatch } = useFormContext();
  const storeName = "robotsConfig";
  const reducerStateGroup = `${storeName}Data`;
  const formRules = form.getValues("rules");

  const [robotsConfig, setRobotsConfig] = useSessionStorage({
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
              value?: string | Rule[];
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

  const crawlDelayOptions: Array<{
    value: string;
    label: string;
  }> = [
    { value: "", label: "Default" },
    { value: "1", label: "1 second" },
    { value: "5", label: "5 seconds" },
    { value: "10", label: "10 seconds" },
    { value: "20", label: "20 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "1 minute" },
  ];

  // Control the form values based on the generateRobotsFile value
  React.useEffect(() => {
    if (generateRobotsFile) {
      form.setValue("rules", [
        { userAgent: "*", allow: "/", disallow: "/", crawlDelay: "Default" },
      ]);

      handleInputChange({
        target: {
          name: "rules",
          value: [
            {
              userAgent: "*",
              allow: "/",
              disallow: "/",
              crawlDelay: "Default",
            },
          ],
        },
      });
    } else {
      form.setValue("rules", []);
      handleInputChange({
        target: {
          name: "rules",
          value: [],
        },
      });
    }
  }, [form, generateRobotsFile, handleInputChange]);

  const onSubmit: SubmitHandler<RobotsConfigSchema> = async (values) => {
    await setRobotsConfig(values);
    nextStep();
  };

  return (
    <FormStepLayout
      code={
        isGeneratingRobotsFile ? generateRobotsFileContent(state) || "" : ""
      }
      title="robots.txt config preview"
    >
      <AnimatedFormShell className="w-full flex flex-col">
        <FormStepHeader
          title="Robots.txt File Config"
          description="Configure a file that matches the Robots Exclusion Standard in the
            root of app directory to tell search engine crawlers which URLs they
            can access on your site."
        />
        <FormShell submitFunc={onSubmit} form={form}>
          <FormField
            control={form.control}
            name="generateRobotsFile"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
                <div className="space-y-1 leading-none mr-4 sm:mr-2">
                  <FormLabel>Generate a robots.txt file</FormLabel>
                  <FormDescription>
                    This file is used to give instructions about your site to
                    web robots.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="generate-robots-file"
                    checked={field.value}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      if (checkedState === true || checkedState === false) {
                        setIsGeneratingRobotsFile(checkedState);
                      }
                      const e = {
                        target: {
                          name: "generateRobotsFile",
                          checked: checkedState,
                        },
                      };
                      handleInputChange(e);

                      // setting the generateStaticRobotsFile form value based on generateRobotsFile value
                      const event = {
                        target: {
                          name: "generateStaticRobotsFile",
                          checked: checkedState,
                        },
                      };
                      form.setValue("generateStaticRobotsFile", checkedState);
                      handleInputChange(event);
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
                    dynamic robots.ts file that returns a Robots object.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="generate-static-robots-file"
                    checked={field.value}
                    disabled={!isGeneratingRobotsFile}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      const event = {
                        target: {
                          name: "generateStaticRobotsFile",
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
            <FormLabel>Rules</FormLabel>
            <FormDescription className="pb-4">
              Add custom rules to your robots.txt file. Specify the user agent,
              URLs to allow or disallow, and the crawl delay.
            </FormDescription>
            {fields.map((item, index) => (
              <div key={item.id} className="w-full flex gap-1 sm:gap-4">
                <FormField
                  name={`rules.${index}.userAgent`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.rules ? "border-destructive" : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          disabled={!isGeneratingRobotsFile}
                          type="text"
                          placeholder="User Agent"
                          className={`w-full ${
                            form.formState.errors.rules &&
                            form.formState.errors.rules[index] &&
                            form.formState.errors.rules[index]?.userAgent
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (formRules) {
                              const updatedRules = [...formRules];

                              updatedRules[index] = {
                                ...updatedRules[index],
                                userAgent: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "rules",
                                  value: updatedRules,
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
                  name={`rules.${index}.allow`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.rules ? "border-destructive" : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          disabled={!isGeneratingRobotsFile}
                          type="text"
                          placeholder="Allow"
                          className={`w-full ${
                            form.formState.errors.rules &&
                            form.formState.errors.rules[index] &&
                            form.formState.errors.rules[index]?.allow
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            if (formRules) {
                              const updatedRules = [...formRules];

                              updatedRules[index] = {
                                ...updatedRules[index],
                                allow: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "rules",
                                  value: updatedRules,
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
                  name={`rules.${index}.disallow`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.rules ? "border-destructive" : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          disabled={!isGeneratingRobotsFile}
                          type="text"
                          placeholder="Disallow"
                          className={`w-full ${
                            form.formState.errors.rules &&
                            form.formState.errors.rules[index] &&
                            form.formState.errors.rules[index]?.disallow
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);

                            if (formRules) {
                              const updatedRules = [...formRules];

                              updatedRules[index] = {
                                ...updatedRules[index],
                                disallow: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "rules",
                                  value: updatedRules,
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
                <div className="w-full flex space-x-2">
                  <FormField
                    name={`rules[${index}].crawlDelay`}
                    render={({ field }) => (
                      <FormItem className="min-w-[100px] w-full">
                        <Select
                          {...field}
                          disabled={!isGeneratingRobotsFile}
                          onValueChange={(selectedValue) => {
                            form.setValue(
                              `rules.${index}.crawlDelay`,
                              selectedValue
                            );

                            if (formRules) {
                              const updatedRules = [...formRules];

                              updatedRules[index] = {
                                ...updatedRules[index],
                                crawlDelay: selectedValue,
                              };

                              handleInputChange({
                                target: {
                                  name: "rules",
                                  value: updatedRules,
                                },
                              });
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="truncate">
                              <SelectValue placeholder="Crawl Frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Crawl Frequency</SelectLabel>
                              {crawlDelayOptions.map((option, index) => (
                                <SelectItem
                                  key={index}
                                  className="truncate"
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    disabled={!isGeneratingRobotsFile}
                    onClick={() => {
                      if (!state.robotsConfigData.rules) return;
                      const rules = [...state.robotsConfigData.rules];

                      const updatedRules = rules.filter(
                        (_, ruleIndex) => ruleIndex !== index
                      );
                      handleInputChange({
                        target: {
                          name: "rules",
                          value: updatedRules,
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
              disabled={!isGeneratingRobotsFile}
              size="sm"
              className={cn("w-fit")}
              onClick={() => {
                const newRule: Rule = {
                  userAgent: "*",
                  allow: "/",
                  disallow: "/",
                  crawlDelay: "Default",
                };
                append(newRule);
                handleInputChange({
                  target: {
                    name: "rules",
                    value: [...(state.robotsConfigData.rules || []), newRule],
                  },
                });
              }}
            >
              Add Custom Rule
            </Button>
          </div>
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Host"
                    id="host"
                    disabled={!isGeneratingRobotsFile}
                    className={
                      form.formState.errors.host
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    type="text"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the preferred domain for search engines to index.
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
