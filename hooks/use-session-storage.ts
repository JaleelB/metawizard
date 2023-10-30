import { ToastProps } from "@/components/ui/toast";
import { useState, useEffect } from "react";
import { saveToStorage, retrieveFromStorage } from "./storage";

type UseLocalStorageProps<T> = {
  values?: T;
  key: string;
  defaultValue: T;
  onPutSuccess: () => void;
  onPutError: (toastProps: ToastProps) => void;
};

export const useSessionStorage = <T>(options: UseLocalStorageProps<T>) => {
  const { key, defaultValue, onPutSuccess, onPutError } = options;

  // State to store our value
  const [value, setValue] = useState<T>(() => {
    const storedValue = retrieveFromStorage<T>(key, "session");
    return storedValue || defaultValue;
  });

  // Update seession storage when value changes
  useEffect(() => {
    const isSuccess = saveToStorage(key, value, "session");
    isSuccess
      ? onPutSuccess()
      : onPutError({
          title: "Failed to save data to sessionStorage!",
          variant: "destructive",
        });
  }, [key, value, onPutSuccess, onPutError]);

  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        setValue(JSON.parse(e.newValue || ""));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  // Remove value from local storage
  const removeValue = () => {
    sessionStorage.removeItem(key);
    setValue(defaultValue);
  };

  return [value, setValue, removeValue] as const;
};
