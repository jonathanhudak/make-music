import { Handler } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { generateToken } from "/lib/apple.ts";

export const handler: Handler = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
    });
  }
  const form = await req.formData();
  const url = new URL(req.url);
  const code = form.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const token = await generateToken(code as string);

  const headers = new Headers();
  setCookie(headers, {
    name: "auth-apple",
    value: token,
    maxAge: 120,
    sameSite: "Lax",
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
