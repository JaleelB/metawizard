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
import { siteImagesConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { useWizard } from "react-use-wizard";
import AnimatedShell from "../animated-form-shell";
import { useSaveToIndexedDB } from "@/hooks/useSaveToIndexedDB";

type SiteImagesConfigSchema = z.infer<typeof siteImagesConfigSchema>;

export default function SiteImgagesLayout() {
  const form = useForm<SiteImagesConfigSchema>({
    resolver: zodResolver(siteImagesConfigSchema),
    defaultValues: {
      autoGenerateSiteLogo: false,
      autoGenerateOpenGraphImage: false,
      siteLogo: "",
    },
  });

  const { nextStep } = useWizard();
  const { save } = useSaveToIndexedDB();
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isAutoGeneratingSiteLogo, setIsAutoGeneratingSiteLogo] =
    React.useState(false);
  const [isAutoGeneratingOpenGraphImage, setIsAutoGeneratingOpenGraphImage] =
    React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      nextStep();
    }
  }, [isSubmitted, nextStep]);

  const onSubmit: SubmitHandler<SiteImagesConfigSchema> = async (values) => {
    await save({
      values,
      uniqueKey: 2,
      storeName: "siteImages",
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
    <AnimatedShell className="flex flex-col gap-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
          Site images
        </h1>
        <p className="text-muted-foreground">
          Upload key images for your website or application.
        </p>
      </div>
      <FormShell submitFunc={onSubmit} form={form}>
        <FormField
          control={form.control}
          name="siteLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site logo</FormLabel>
              <FormControl>
                <Input
                  id="site-logo"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  disabled={isAutoGeneratingSiteLogo}
                  // Using 'any' here as a quick fix to bypass TypeScript's type checking.
                  // This is because the 'field' object coming from react-hook-form has a 'value' property
                  // that is not directly compatible with the 'Input' component's expected props.
                  // Note: This is not the most type-safe way and should be revisited for a more robust solution.
                  {...(field as any)}
                />
              </FormControl>
              <FormDescription>
                This is the logo that will be displayed on your website or
                application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoGenerateSiteLogo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsAutoGeneratingSiteLogo(checkedState);
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Auto generate your site&nbsp; logo</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoGenerateOpenGraphImage"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checkedState) => {
                    field.onChange(checkedState);
                    if (checkedState === true || checkedState === false) {
                      setIsAutoGeneratingOpenGraphImage(checkedState);
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Auto generate Open Graph/Twitter image</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </FormShell>
    </AnimatedShell>
  );
}
