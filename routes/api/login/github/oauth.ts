import { Handlers } from "$fresh/server.ts";
import { getApp } from "/lib/github.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code) {
      return new Response(null, {
        status: 400,
      });
    }

    const app = getApp();
    const { authentication } = await app.createToken({
      code,
      state,
    });

    console.log("token", authentication.token);

    if (!authentication.token) {
      return new Response(null, {
        status: 400,
      });
    }

    const { token } = authentication;

    console.info("code", code);
    console.info("token", token);
    console.info("state", state);

    const headers = new Headers();
    setCookie(headers, {
      name: "auth-github",
      value: token, // this should be a unique value for each session
      maxAge: 120,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("location", "/");
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  },
};
