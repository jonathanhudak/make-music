import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getIsLoggedIn } from "/lib/auth.ts";
import Header from "/components/Header.tsx";

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
    <div class="flex flex-col items-center justify-items-center gap-y-4">
      <GithubLogin />
    </div>
  );
}

export default function Home({ data, route }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Music PM</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md flex flex-col gap-4 items-center justify-items-center">
        <Header active={route} loggedIn={data.isAllowed} />
        <div>You currently {data.isAllowed ? "are" : "are not"} logged in.</div>
        {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
      </div>
    </>
  );
}
