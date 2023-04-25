import { useEffect } from "preact/hooks";
import { AppleConfig } from "/lib/apple.ts";

declare global {
  interface Window {
    CloudKit: any;
  }
}

window.CloudKit = window.CloudKit || {};

interface FilePickerProps {
  appleConfig: AppleConfig;
}

export default function FilePicker({ appleConfig }: FilePickerProps) {
  useEffect(() => {
    console.info("apiToken", appleConfig.authToken);
    window.CloudKit.configure({
      containers: [
        {
          containerIdentifier: appleConfig.env.APPLE_CONTAINER_ID,
          apiTokenAuth: { apiToken: appleConfig.authToken, persist: true },
          environment: "development", // Use 'production' for production
        },
      ],
    });
    async function setup() {
      await window.CloudKit.getDefaultContainer()?.setUpAuth();
    }
    setup();
  }, [appleConfig]);

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
