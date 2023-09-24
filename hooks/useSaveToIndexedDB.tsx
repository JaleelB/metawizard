import { ToastProps } from "@/components/ui/toast";
import React from "react";

type SaveToIndexedDBProps<T> = {
  values: T;
  uniqueKey: number;
  storeName: string;
  onPutSuccess: () => void;
  onPutError: (toastProps: ToastProps) => void;
  onOpenError: (toastProps: ToastProps) => void;
};

let isDBOperationInProgress = false;

export const useSaveToIndexedDB = <T,>() => {
  const save = React.useCallback(
    async ({
      values,
      uniqueKey,
      storeName,
      onPutSuccess,
      onPutError,
      onOpenError,
    }: SaveToIndexedDBProps<T>) => {
      const dbName = "MetadataDatabase";

      async function handleDBOperations(db: IDBDatabase) {
        if (isDBOperationInProgress) {
          console.log("DB operation already in progress for store:", storeName);
          return;
        }

        isDBOperationInProgress = true;
        console.log("handleDBOperations called for store:", storeName);

        if (!db.objectStoreNames.contains(storeName)) {
          const newVersion = db.version + 1;
          db.close();
          openDatabase(newVersion);
          return;
        }

        const transaction = db.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const putRequest = objectStore.put({ ...values, id: uniqueKey });

        putRequest.onsuccess = () => {
          onPutSuccess();
          isDBOperationInProgress = false;
        };
        putRequest.onerror = () => {
          onPutError({
            title: `Failed to save ${storeName} config!`,
            variant: "destructive",
          });
          isDBOperationInProgress = false;
        };
      }

      function openDatabase(version?: number) {
        const openRequest = indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        };

        openRequest.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          handleDBOperations(db);
        };

        openRequest.onerror = (event) => {
          console.log("Error details:", event);
          onOpenError({
            title: "Failed to open IndexedDB!",
            variant: "destructive",
          });
        };
      }

      openDatabase();
    },
    []
  );

  return { save };
};
