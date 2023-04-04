import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getIsLoggedIn } from "/lib/auth.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    const isLoggedIn = await getIsLoggedIn(req);
    return ctx.render!({
      isAllowed: isLoggedIn,
    });
  },
};

interface Data {
  isAllowed: boolean;
}

function StandardLogin() {
  return (
    <form
      method="post"
      action="/api/login/standard"
      class="flex flex-col items-start gap-y-1"
    >
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        class="border-dashed border-2 border-blue-500"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        class="border-dashed border-2 border-blue-500"
      />
      <button
        type="submit"
        class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full shadow-sm"
      >
        Submit
      </button>
    </form>
  );
}

function GithubLogin() {
  return (
    <form method="post" action="/api/login/github">
      <button
        class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full shadow-sm"
        type="submit"
      >
        Login with Github
      </button>
    </form>
  );
}

function Login() {
  return (
    <div class="flex flex-col gap-y-4">
      <StandardLogin />
      <hr />
      <GithubLogin />
    </div>
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
