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
import { authorConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useWizard } from "react-use-wizard";
import AnimatedShell from "../animated-shell";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";

type AuthorConfigSchema = z.infer<typeof authorConfigSchema>;

export default function AuthorConfigsLayout() {
  const form = useForm<AuthorConfigSchema>({
    resolver: zodResolver(authorConfigSchema),
  });

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { formState } = form;
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      nextStep();
    }
  }, [isSubmitted, nextStep]);

  const onSubmit: SubmitHandler<AuthorConfigSchema> = async (values) => {
    await save({
      values,
      uniqueKey: 3,
      storeName: "authorConfig",
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

  return (
    <AnimatedShell className="w-full flex flex-col gap-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Author Config
        </h1>
        <p className="text-muted-foreground">
          Provide information about the author of the site.
        </p>
      </div>
      <FormShell submitFunc={onSubmit} form={form}>
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Author name"
                  id="author-name"
                  className={
                    formState.errors.authorName
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of the author of the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Author URL"
                  id="author-url"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the website URL of the author of the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Github URL"
                  id="github-url"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the Github URL of the author of the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Twitter URL"
                  id="twitter-url"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the Twitter URL of the author of the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormShell>
    </AnimatedShell>
  );
}
