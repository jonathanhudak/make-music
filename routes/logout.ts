import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";
import { Cookies } from "/lib/cookies.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    Object.values(Cookies).forEach((c) => {
      deleteCookie(headers, c, { path: "/", domain: url.hostname });
    });

    headers.set("location", "/");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
