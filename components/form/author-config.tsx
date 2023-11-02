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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { authorConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useWizard } from "react-use-wizard";
import AnimatedFormShell from "./animated-form-shell";
import FormStepLayout from "./form-step-layout";
import FormStepHeader from "./form-step-header";
import { useFormContext } from "@/state/form-state";
import { generateAuthorDetailsContent } from "@/lib/form-markdown-preview";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionStorage } from "@/hooks/use-session-storage";

export type AuthorConfigSchema = z.infer<typeof authorConfigSchema>;

export default function AuthorConfigsLayout() {
  const { state, dispatch } = useFormContext();
  const form = useForm<AuthorConfigSchema>({
    resolver: zodResolver(authorConfigSchema),
    defaultValues: {
      authors: state.authorConfigData.authors,
      creator: state.authorConfigData.creator,
      twitterUsername: state.authorConfigData.twitterUsername,
    },
  });

  const { nextStep } = useWizard();
  const { toast } = useToast();

  const formAuthors = form.getValues("authors");
  const storeName = "authorConfig";
  const reducerStateGroup = `${storeName}Data`;
  const [authorConfig, setAuthorConfig] = useSessionStorage({
    key: storeName,
    defaultValue: {},
    onPutSuccess: () => {},
    onPutError: (toastProps) => {
      toast(toastProps);
      console.error("error saving author config", toastProps);
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "authors",
  });

  const handleInputChange = React.useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | {
            target: {
              name: string;
              checked?: boolean;
              value?:
                | string
                | {
                    name: string;
                    url: string;
                  }[];
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

  React.useEffect(() => {
    if (state.authorConfigData.authors?.length === 0) {
      form.setValue("authors", [{ name: "", url: "" }]);

      handleInputChange({
        target: {
          name: "authors",
          value: [{ name: "", url: "" }],
        },
      });
    }
  }, [form, handleInputChange, state.authorConfigData.authors]);

  const onSubmit: SubmitHandler<AuthorConfigSchema> = async (values) => {
    await setAuthorConfig(values);
    nextStep();
  };

  return (
    <FormStepLayout
      code={generateAuthorDetailsContent(state)}
      title="author config preview"
    >
      <AnimatedFormShell className="w-full flex flex-col">
        <FormStepHeader
          title="Author Config"
          description="Provide information about the author of the site.."
        />
        <FormShell submitFunc={onSubmit} form={form}>
          <div className="flex flex-col space-y-2 sm:col-span-full pt-4">
            <FormLabel>Authors</FormLabel>
            <FormDescription className="pb-4">
              This is the list of authors of the site.
            </FormDescription>
            {fields.map((item, index) => (
              <div key={item.name} className="w-full flex gap-2">
                <FormField
                  name={`authors.${index}.name`}
                  render={({ field }) => (
                    <FormItem
                      className={`w-full ${
                        form.formState.errors.authors
                          ? "border-destructive"
                          : ""
                      }`}
                    >
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Author Name"
                          className={`w-full ${
                            form.formState.errors.authors &&
                            form.formState.errors.authors[index] &&
                            form.formState.errors.authors[index]?.name
                              ? "border-destructive focus-visible:ring-destructive"
                              : ""
                          }`}
                          onChange={(e) => {
                            field.onChange(e);
                            if (formAuthors) {
                              const updatedAuthors = [...formAuthors];

                              updatedAuthors[index] = {
                                ...updatedAuthors[index],
                                name: e.target.value,
                              };

                              handleInputChange({
                                target: {
                                  name: "authors",
                                  value: updatedAuthors,
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
                    name={`authors[${index}].url`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="url"
                            placeholder="Author Url"
                            className={`w-full ${
                              form.formState.errors.authors &&
                              form.formState.errors.authors[index] &&
                              form.formState.errors.authors[index]?.url
                                ? "border-destructive focus-visible:ring-destructive"
                                : ""
                            }`}
                            onChange={(e) => {
                              field.onChange(e);
                              if (formAuthors) {
                                const updatedAuthors = [...formAuthors];

                                updatedAuthors[index] = {
                                  ...updatedAuthors[index],
                                  url: e.target.value,
                                };

                                handleInputChange({
                                  target: {
                                    name: "authors",
                                    value: updatedAuthors,
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
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      if (!state.authorConfigData.authors) return;
                      const authors = [...state.authorConfigData.authors];

                      const updatedAuthors = authors.filter(
                        (_, authorIndex) => authorIndex !== index
                      );
                      handleInputChange({
                        target: {
                          name: "authors",
                          value: updatedAuthors,
                        },
                      });

                      remove(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={cn("w-fit")}
              onClick={() => {
                const newAuthor = {
                  name: "",
                  url: "",
                };
                append(newAuthor);
                handleInputChange({
                  target: {
                    name: "authors",
                    value: [
                      ...(state.authorConfigData.authors || []),
                      newAuthor,
                    ],
                  },
                });
              }}
            >
              Add Author
            </Button>
          </div>
          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Creator"
                    id="creator"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the creator of the site.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Twitter Username"
                    id="twitter-username"
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the Twitter username of the author of the site.
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
