import { Handler } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handler = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
    });
  }
  const form = await req.formData();
  const url = new URL(req.url);
  const code = form.get("code");
  // const state = form.get("state");
  // const user = form.get("user");
  const token = form.get("id_token");

  if (!code || !token) {
    return new Response(null, {
      status: 400,
    });
  }

  const headers = new Headers();
  setCookie(headers, {
    name: "auth-apple",
    value: token as string, // this should be a unique value for each session
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
};
