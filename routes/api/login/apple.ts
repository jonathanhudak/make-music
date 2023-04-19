import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    // const state = url.searchParams.get("state");
    // const user = url.searchParams.get("user");
    const token: string | null = url.searchParams.get("id_token");

    if (!code || !token) {
      return new Response(null, {
        status: 400,
      });
    }

    const headers = new Headers();
    setCookie(headers, {
      name: "auth-apple",
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
