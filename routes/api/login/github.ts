import { Handlers } from "$fresh/server.ts";
import { getApp } from "/lib/github.ts";

export const handler: Handlers = {
  POST() {
    const { url } = getApp().getWebFlowAuthorizationUrl({
      scope: ["user"],
    });
    return Response.redirect(url);
  },
};
