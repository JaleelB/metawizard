"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { FormShell } from "./form-shell";
import { SubmitHandler, useForm } from "react-hook-form";
import { siteImagesConfigSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useWizard } from "react-use-wizard";
import AnimatedFormShell from "./animated-form-shell";
import { styles, useFormContext } from "@/state/form-state";
import FormStepHeader from "./form-step-header";
import { generateSiteImagesContent } from "@/lib/form-markdown-preview";
import { Switch } from "../ui/switch";
import { useSessionStorage } from "@/hooks/use-session-storage";
import FormStepLayout from "./form-step-layout";
import VisualStylePicker from "../visual-style-picker";

export type SiteImagesConfigSchema = z.infer<typeof siteImagesConfigSchema>;

export type Styles = typeof styles;

export default function SiteImgagesLayout() {
  const form = useForm<SiteImagesConfigSchema>({
    resolver: zodResolver(siteImagesConfigSchema),
    defaultValues: {
      autoGenerateSiteLogo: false,
      autoGenerateOpenGraphImage: false,
    },
  });

  const { nextStep } = useWizard();
  const { toast } = useToast();
  const [isAutoGeneratingSiteLogo, setIsAutoGeneratingSiteLogo] =
    React.useState(false);
  const [isAutoGeneratingOpenGraphImage, setIsAutoGeneratingOpenGraphImage] =
    React.useState(false);
  const { state, dispatch } = useFormContext();
  const storeName = "siteImagesConfig";
  const reducerStateGroup = `${storeName}Data`;

  const [siteImagesConfig, setSiteImagesConfig] = useSessionStorage({
    key: storeName,
    defaultValue: {},
    onPutSuccess: () => {},
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
              value?: string;
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
    if (isAutoGeneratingSiteLogo) {
      form.setValue("siteLogoStyles", styles);
    }
    if (isAutoGeneratingOpenGraphImage) {
      form.setValue("openGraphImageStyles", styles);
    }
  }, [isAutoGeneratingSiteLogo, isAutoGeneratingOpenGraphImage, form]);

  const onSubmit: SubmitHandler<SiteImagesConfigSchema> = async (values) => {
    await setSiteImagesConfig(values);
    nextStep();
  };

  return (
    <FormStepLayout
      code={generateSiteImagesContent(state)}
      title="site images preview"
    >
      <AnimatedFormShell>
        <FormStepHeader
          title="Site images"
          description="Define the visual identity of your website or application."
        />
        <FormShell submitFunc={onSubmit} form={form}>
          <FormField
            control={form.control}
            name="autoGenerateSiteLogo"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
                <div className="space-y-1 leading-none mr-4 sm:mr-2">
                  <FormLabel>Auto generate a site logo</FormLabel>
                  <FormDescription>
                    This allows you to programmatically generate a site
                    logo/icon using code. This done by creating an icon route
                    that default exports a function.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="auto-generate-site-logo"
                    checked={field.value}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      setIsAutoGeneratingSiteLogo(checkedState);
                      const event = {
                        target: {
                          name: "autoGenerateSiteLogo",
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
          {isAutoGeneratingSiteLogo && (
            <VisualStylePicker
              inputFields={[
                {
                  label: "Text",
                  name: "siteLogoStyles.text",
                  type: "text",
                },
                {
                  label: "Font Color",
                  name: "siteLogoStyles.color",
                  type: "color",
                },
                {
                  label: "Background Color",
                  name: "siteLogoStyles.backgroundColor",
                  type: "color",
                },
                {
                  label: "Border Radius",
                  name: "siteLogoStyles.borderRadius",
                  type: "select",
                  options: ["square", "rounded", "circle"],
                },
                {
                  label: "Font Size",
                  name: "siteLogoStyles.fontSize",
                  type: "number",
                },
              ]}
              styles={styles}
              control={form.control}
              setValue={form.setValue}
              autoGenerateSiteLogo={isAutoGeneratingSiteLogo}
              autoGenerateOpenGraphImage={false}
              dispatch={dispatch}
              reducerStateGroup={reducerStateGroup}
            />
          )}
          <FormField
            control={form.control}
            name="autoGenerateOpenGraphImage"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center space-y-0 rounded-md border p-4">
                <div className="space-y-1 leading-none mr-4 sm:mr-2">
                  <FormLabel>
                    Auto generate an open-graph/twitter image
                  </FormLabel>
                  <FormDescription>
                    This allows you to programmatically generate a
                    opengraph-image/twitter-image images for a route segment.
                    They are useful for setting the images that appear on social
                    networks and messaging apps when a user shares a link to
                    your site.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    id="auto-generate-site-logo"
                    checked={field.value}
                    onCheckedChange={(checkedState) => {
                      field.onChange(checkedState);
                      setIsAutoGeneratingOpenGraphImage(checkedState);
                      const event = {
                        target: {
                          name: "autoGenerateOpenGraphImage",
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
          {isAutoGeneratingOpenGraphImage && (
            <VisualStylePicker
              inputFields={[
                {
                  label: "Text",
                  name: "openGraphImageStyles.text",
                  type: "text",
                },
                {
                  label: "Font Color",
                  name: "openGraphImageStyles.color",
                  type: "color",
                },
                {
                  label: "Background Color",
                  name: "openGraphImageStyles.backgroundColor",
                  type: "color",
                },
                {
                  label: "Border Radius",
                  name: "openGraphImageStyles.borderRadius",
                  type: "select",
                  options: ["square", "rounded", "circle"],
                },
                {
                  label: "Font Size",
                  name: "openGraphImageStyles.fontSize",
                  type: "number",
                },
              ]}
              styles={styles}
              control={form.control}
              setValue={form.setValue}
              autoGenerateSiteLogo={false}
              autoGenerateOpenGraphImage={isAutoGeneratingOpenGraphImage}
              dispatch={dispatch}
              reducerStateGroup={reducerStateGroup}
            />
          )}
        </FormShell>
      </AnimatedFormShell>
    </FormStepLayout>
  );
}
