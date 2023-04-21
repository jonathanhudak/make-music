/*
https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens

*/
import "https://deno.land/std@0.182.0/dotenv/load.ts";

const APPLE_CLIENT_ID = Deno.env.get("APPLE_CLIENT_ID");
const APPLE_NONCE = Deno.env.get("APPLE_NONCE");
const APPLE_STATE = Deno.env.get("APPLE_STATE");
const APPLE_REDIRECT = Deno.env.get("APPLE_REDIRECT");
const APPLE_CLIENT_SECRET = Deno.env.get("APPLE_CLIENT_SECRET");
const APPLE_TEAM_ID = Deno.env.get("APPLE_TEAM_ID");
const APPLE_CONTAINER_TOKEN = Deno.env.get("APPLE_CONTAINER_TOKEN");
const APPLE_CONTAINER_ID = Deno.env.get("APPLE_CONTAINER_ID");

export const appleConfig = {
  APPLE_CLIENT_ID,
  APPLE_NONCE,
  APPLE_STATE,
  APPLE_REDIRECT,
  APPLE_CLIENT_SECRET,
  APPLE_TEAM_ID,
  APPLE_CONTAINER_TOKEN,
  APPLE_CONTAINER_ID,
};

export async function generateToken(code: string) {
  const body = new URLSearchParams();
  body.set("code", code);
  body.set("client_id", appleConfig.APPLE_CLIENT_ID!);
  body.set("client_secret", appleConfig.APPLE_CLIENT_SECRET!);
  body.set("redirect_uri", appleConfig.APPLE_REDIRECT!);
  body.set("grant_type", "authorization_code");
  console.info("formData", body);

  const res = await fetch("https://appleid.apple.com/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  }).catch(console.error);

  console.info(
    "generateToken https://appleid.apple.com/auth/token response",
    res
  );

  console.info("res.json", res?.json);
  console.info("res.headers", res?.headers);

  const data: {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token: string;
    id_token: string;
  } = await res?.json();

  console.info("data", data);

  return data.access_token as string;
}

export async function validateToken(token: string) {
  const body = new URLSearchParams();
  body.set("refresh_token", token);
  body.set("client_id", appleConfig.APPLE_CLIENT_ID!);
  body.set("client_secret", appleConfig.APPLE_CLIENT_SECRET!);
  body.set("redirect_uri", appleConfig.APPLE_REDIRECT!);
  body.set("grant_type", "refresh_token");

  console.info("formData", body);

  const res = await fetch("https://appleid.apple.com/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  }).catch(console.error);

  console.info("validateToken https://appleid.apple.com/auth/token", res);
}
