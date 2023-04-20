import {
  CKEnvironment,
  PromisesApi,
} from "https://esm.sh/@apple/cktool.database@1.3.2";
import { createConfiguration } from "https://esm.sh/@apple/cktool.target.browser";
import { appleConfig } from "/lib/apple.ts";

const configuration = createConfiguration();

const api = new PromisesApi({
  configuration,
  security: {
    ManagementTokenAuth: appleConfig.APPLE_CONTAINER_TOKEN!,
  },
});

const defaultParams = {
  teamId: appleConfig.APPLE_TEAM_ID,
  containerId: appleConfig.APPLE_CONTAINER_ID,
  environment: CKEnvironment.DEVELOPMENT,
};
