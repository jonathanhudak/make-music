import { OAuthApp } from "https://cdn.skypack.dev/@octokit/oauth-app";
// https://github.com/octokit/octokit.js/#usage
import { load } from "https://deno.land/std/dotenv/mod.ts";
// https://deno.land/manual@v1.32.3/basics/env_variables

const env = await load();

const GH_CLIENT_ID = env["GH_CLIENT_ID"];
const GH_CLIENT_SECRET = env["GH_CLIENT_SECRET"];

let app: typeof OAuthApp;
export function getApp(): typeof OAuthApp {
  if (app) {
    return app;
  }
  app = new OAuthApp({
    clientType: "github-app",
    clientId: GH_CLIENT_ID,
    clientSecret: GH_CLIENT_SECRET,
    redirectUrl: "http://localhost:8000/api/login/github/oauth",
  });
  return app;
}
