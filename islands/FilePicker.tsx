import { useState, useEffect } from "preact/hooks";
import { appleConfig } from "/lib/apple.ts";
import { Cookies } from "/lib/cookies.ts";

declare global {
  interface Window {
    CloudKit: any;
  }
}

window.CloudKit = window.CloudKit || {};

interface FilePickerProps {
  apiToken: string;
}

export default function FilePicker({ apiToken }: FilePickerProps) {
  useEffect(() => {
    console.info("apiToken", apiToken);
    window.CloudKit.configure({
      containerIdentifier: appleConfig.APPLE_CONTAINER_ID,
      apiToken,
      environment: "development", // Use 'production' for production
    });
    async function setup() {
      await window.CloudKit.getDefaultContainer().setUpAuth();
    }
    setup();
  }, [apiToken]);

  async function selectFile() {
    const container = window.CloudKit.getDefaultContainer();
    const filePicker = container.createFilePicker();
    const response = await filePicker.display();

    if (response.type === "files") {
      const files = response.items;
      // Handle the selected files
      console.info(files);
    }
  }

  return (
    <div>
      <button onClick={selectFile}>Select Files from iCloud</button>
    </div>
  );
}
