import { getCookies } from "std/http/cookie.ts";
import { getApp } from "/lib/github.ts";
import { Cookies } from "/lib/cookies.ts";
import { validateToken } from "/lib/apple.ts";
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
  const githubToken = cookies[Cookies.GithubAuth];
  if (githubToken) {
    try {
      await getApp().checkToken({ token: githubToken });
      isAuthedViaGithub = true;
    } catch (e) {
      console.info("invalid github token", e);
    }
  }

  return isAuthedViaGithub;
}

export async function isLoggedInViaApple(req: Request) {
  let isAuthedViaApple = false;
  const cookies = getRequestCookies(req);
  const appleToken = cookies[Cookies.AppleAuth];
  if (appleToken) {
    try {
      await validateToken(appleToken);
      isAuthedViaApple = true;
    } catch (e) {
      console.info("invalid apple token", e);
    }
  }

  return isAuthedViaApple;
}

export async function getIsLoggedIn(req: Request): Promise<boolean> {
  return (
    ((await isLoggedIntoGithub(req)) ||
      (await isLoggedInStandard(req)) ||
      (await isLoggedInViaApple(req))) ??
    false
  );
}
