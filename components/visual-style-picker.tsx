import React, { useEffect, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { Input } from "./ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { siteImagesConfigSchema } from "@/schemas/schema";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Action } from "@/state/form-state";
import { Styles } from "./form/site-images-config";

type BorderOption = "square" | "rounded" | "circle";

type InputField = {
  label: string;
  name: string;
  type: string;
  options?: BorderOption[];
};

type ColorStyle = Omit<
  z.infer<typeof siteImagesConfigSchema>,
  | "siteLogo"
  | "autoGenerateSiteLogo"
  | "autoGenerateOpenGraphImage"
  | "siteLogo.file"
>;

type StyleKey =
  | "text"
  | "color"
  | "backgroundColor"
  | "borderRadius"
  | "fontSize";

export default function VisualStylePicker({
  setValue,
  inputFields,
  control,
  autoGenerateSiteLogo,
  autoGenerateOpenGraphImage,
  styles,
  dispatch,
  reducerStateGroup,
}: {
  inputFields: InputField[];
  setValue: UseFormSetValue<ColorStyle>;
  control: Control<ColorStyle>;
  dispatch: React.Dispatch<Action>;
  autoGenerateSiteLogo: boolean;
  autoGenerateOpenGraphImage: boolean;
  styles: Styles;
  reducerStateGroup: string;
}) {
  const [siteLogoStyles, setSiteLogoStyles] = useState(styles);
  const [openGraphImageStyles, setOpenGraphImageStyles] = useState(styles);

  const getBorderRadiusValue = (option: BorderOption) => {
    switch (option) {
      case "rounded":
        return "8px";
      case "circle":
        return "100%";
      default:
        return "0px";
    }
  };

  const handleInputChange = (
    value: string,
    name: string,
    isSiteLogo: boolean
  ) => {
    const [styleGroup, styleProperty] = name.split(".");
    const newValue =
      styleProperty === "borderRadius"
        ? getBorderRadiusValue(value as BorderOption)
        : styleProperty === "fontSize"
        ? `${value}px`
        : value;

    setValue(
      name as
        | "siteLogoStyles"
        | "openGraphImageStyles"
        | "siteLogoStyles.text"
        | "siteLogoStyles.color"
        | "siteLogoStyles.backgroundColor"
        | "siteLogoStyles.borderRadius"
        | "siteLogoStyles.fontSize"
        | "openGraphImageStyles.color"
        | "openGraphImageStyles.backgroundColor"
        | "openGraphImageStyles.borderRadius"
        | "openGraphImageStyles.fontSize"
        | "openGraphImageStyles.text",
      newValue
    );

    const updatedStyles = isSiteLogo
      ? { ...siteLogoStyles }
      : { ...openGraphImageStyles };
    updatedStyles[styleProperty as keyof typeof styles] = newValue;

    if (isSiteLogo && styleGroup === "siteLogoStyles") {
      setSiteLogoStyles(updatedStyles);
    } else if (!isSiteLogo && styleGroup === "openGraphImageStyles") {
      setOpenGraphImageStyles(updatedStyles);
    }

    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        key: `${reducerStateGroup}.${styleGroup}`,
        value: updatedStyles,
      },
    });
  };

  return (
    <div
      className={`flex flex-col ${
        autoGenerateSiteLogo ? "md:flex-row" : ""
      } justify-between gap-12 py-6`}
    >
      <div
        className={`w-full ${
          autoGenerateSiteLogo ? "md:w-[200px]" : ""
        } flex flex-col gap-4`}
      >
        {inputFields.map((inputField, index) => (
          <FormField
            key={index}
            control={control}
            name={
              inputField.name as
                | "siteLogoStyles"
                | "openGraphImageStyles"
                | "siteLogoStyles.text"
                | "siteLogoStyles.color"
                | "siteLogoStyles.backgroundColor"
                | "siteLogoStyles.borderRadius"
                | "siteLogoStyles.fontSize"
                | "openGraphImageStyles.color"
                | "openGraphImageStyles.backgroundColor"
                | "openGraphImageStyles.borderRadius"
                | "openGraphImageStyles.fontSize"
                | "openGraphImageStyles.text"
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>{inputField.label}</FormLabel>
                <FormControl>
                  {inputField.type === "select" ? (
                    <Select
                      onValueChange={(value) =>
                        handleInputChange(
                          value,
                          inputField.name,
                          autoGenerateSiteLogo
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Square"
                          className="capitalize"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {inputField.options?.map((option, index) => (
                          <SelectItem
                            key={index}
                            className="capitalize"
                            value={option}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      {...field}
                      type={inputField.type}
                      min={0}
                      value={
                        autoGenerateSiteLogo
                          ? siteLogoStyles[
                              inputField.name.split(".")[1] as StyleKey
                            ].replace("px", "")
                          : openGraphImageStyles[
                              inputField.name.split(".")[1] as StyleKey
                            ].replace("px", "")
                      }
                      onChange={(e) => {
                        handleInputChange(
                          e.target.value,
                          inputField.name,
                          autoGenerateSiteLogo
                        );
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      {autoGenerateSiteLogo && (
        <div className="w-full h-[340px] md:max-w-[450px] sm:h-[550px] md:h-[430px]">
          <div
            className="w-full h-full flex items-center justify-center border relative overflow-hidden"
            style={siteLogoStyles}
          >
            <p className="text-center max-w-full max-h-full overflow-hidden">
              {siteLogoStyles.text}
            </p>
          </div>
        </div>
      )}
      {autoGenerateOpenGraphImage && (
        <div className="w-full h-[340px] sm:h-[550px] md:h-[430px]">
          <div
            className="w-full h-full flex items-center justify-center border relative overflow-hidden"
            style={openGraphImageStyles}
          >
            <p className="text-center max-w-full max-h-full overflow-hidden">
              {openGraphImageStyles.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
