/*
https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens

*/
import "https://deno.land/std@0.182.0/dotenv/load.ts";

const APPLE_CLIENT_ID = Deno.env.get("APPLE_CLIENT_ID");
const APPLE_NONCE = Deno.env.get("APPLE_NONCE");
const APPLE_STATE = Deno.env.get("APPLE_STATE");
const APPLE_REDIRECT = Deno.env.get("APPLE_REDIRECT");
const APPLE_CLIENT_SECRET = Deno.env.get("APPLE_CLIENT_SECRET");

export const appleConfig = {
  APPLE_CLIENT_ID,
  APPLE_NONCE,
  APPLE_STATE,
  APPLE_REDIRECT,
  APPLE_CLIENT_SECRET,
};

export async function generateToken(code: string) {
  const formData = new FormData();
  formData.append("code", code);
  formData.append("client_id", appleConfig.APPLE_CLIENT_ID!);
  formData.append("client_secret", appleConfig.APPLE_CLIENT_SECRET!);
  formData.append("redirect_uri", appleConfig.APPLE_REDIRECT!);
  formData.append("grant_type", "authorization_code");
  const res = await fetch("https://appleid.apple.com/auth/token", {
    method: "POST",
    body: formData,
  });

  const data = await res.formData();
  return data.get("refresh_token") as string;
}

export async function validateToken(token: string) {
  const formData = new FormData();
  formData.append("refresh_token", token);
  formData.append("client_id", appleConfig.APPLE_CLIENT_ID!);
  formData.append("client_secret", appleConfig.APPLE_CLIENT_SECRET!);
  formData.append("redirect_uri", appleConfig.APPLE_REDIRECT!);
  formData.append("grant_type", "refresh_token");
  await fetch("https://appleid.apple.com/auth/token", {
    method: "POST",
    body: formData,
  });
}
