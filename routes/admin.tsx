import { Head } from "$fresh/runtime.ts";
import type { PageProps, Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { getIsLoggedIn } from "/lib/auth.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    if (await getIsLoggedIn(req)) {
      return ctx.render!();
    } else {
      const url = new URL(req.url);
      url.pathname = "/";
      return Response.redirect(url);
    }
  },
};
// interface Data {}
export default function Admin() {
  return (
    <>
      <Head>
        <title>Fresh App | Admin</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">secret stuff</div>
    </>
  );
}
