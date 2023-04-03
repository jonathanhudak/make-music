import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};

interface Data {
  isAllowed: boolean;
}

function Login() {
  return (
    <form method="post" action="/api/login">
      <label for="username">Username</label>
      <input type="text" name="username" />
      <label for="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/admin">Admin</a>
        <div>You currently {data.isAllowed ? "are" : "are not"} logged in.</div>
        {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
      </div>
    </>
  );
}
