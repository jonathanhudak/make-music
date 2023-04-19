import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getIsLoggedIn } from "/lib/auth.ts";
import Header from "/components/Header.tsx";
import "https://deno.land/std@0.182.0/dotenv/load.ts";
import { appleConfig } from "/lib/apple.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    const isLoggedIn = await getIsLoggedIn(req);
    return ctx.render!({
      isAllowed: isLoggedIn,
      apple: appleConfig,
    });
  },
};

interface Data {
  isAllowed: boolean;
  apple: {
    APPLE_CLIENT_ID: string;
    APPLE_NONCE: string;
    APPLE_STATE: string;
    APPLE_REDIRECT: string;
  };
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

function LoginWithApple() {
  return (
    <div
      id="appleid-signin"
      data-mode="center-align"
      data-type="sign-in"
      data-color="white"
      data-border="true"
      data-border-radius="15"
      data-width="200"
      data-height="32"
      data-logo-size="medium"
      data-logo-position="15"
      data-label-position="46"
    ></div>
  );
}

function Login() {
  return (
    <div class="flex flex-col items-center justify-items-center gap-y-4">
      <GithubLogin />
      <LoginWithApple />
    </div>
  );
}

export default function Home({ data, route }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Music PM</title>
        <meta
          name="appleid-signin-client-id"
          content={data.apple.APPLE_CLIENT_ID}
        />
        <meta name="appleid-signin-scope" content="name email" />
        <meta
          name="appleid-signin-redirect-uri"
          content={data.apple.APPLE_REDIRECT}
        />
        <meta name="appleid-signin-state" content={data.apple.APPLE_STATE} />
        <meta name="appleid-signin-nonce" content={data.apple.APPLE_NONCE} />
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md flex flex-col gap-4 items-center justify-items-center">
        <Header active={route} loggedIn={data.isAllowed} />
        <div>You currently {data.isAllowed ? "are" : "are not"} logged in.</div>
        {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
      </div>
    </>
  );
}
