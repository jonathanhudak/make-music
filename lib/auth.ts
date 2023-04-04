import { getCookies } from "std/http/cookie.ts";
import { getApp } from "/lib/github.ts";
export function getRequestCookies(req: Request) {
  const cookies = getCookies(req.headers);
  return cookies;
}

export function isLoggedInStandard(req: Request) {
  const cookies = getRequestCookies(req);
  cookies.auth === "bar";
}
export async function isLoggedIntoGithub(req: Request): Promise<boolean> {
  let isAuthedViaGithub = false;
  const cookies = getRequestCookies(req);
  const githubToken = cookies["auth-github"];
  if (githubToken) {
    try {
      await getApp().checkToken({ token: githubToken });
      isAuthedViaGithub = true;
    } catch (e) {
      console.info("invalid github token");
    }
  }

  return isAuthedViaGithub;
}

export async function getIsLoggedIn(req: Request): Promise<boolean> {
  return (
    ((await isLoggedIntoGithub(req)) || (await isLoggedInStandard(req))) ??
    false
  );
}
