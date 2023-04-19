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

function Home() {
  return (
    <div class="w-full flex px-8 h-96 justify-center items-center flex-col gap-8 bg-cover bg-center bg-no-repeat">
      <h1 class="text-4xl inline-block font-bold">OK. Let's do this.</h1>
    </div>
  );
}

function LandingPage() {
  return (
    <div class="w-full flex px-8 h-96 justify-center items-center flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-xl text-white bg-gray-800">
      <div class="space-y-4 text-center">
        <h1 class="text-4xl inline-block font-bold">Music PM</h1>
        <p class="text-xl max-w-lg text-blue-100">
          Where music creators manage their projects and privately share and
          collaborate and collect feedback on work-in-progress material
        </p>
      </div>

      <div>
        <a
          href="/login"
          class="block mt-4 text-blue-500 cursor-pointer inline-flex items-center group text-blue-800 bg-white px-8 py-2 rounded-md hover:bg-blue-50 font-bold"
        >
          Sign Up{" "}
        </a>
      </div>
    </div>
  );
}

export default function Index({ data, route }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Music PM</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Header active={route} loggedIn={data.isAllowed} />
        {data.isAllowed ? <Home /> : <LandingPage />}
      </div>
    </>
  );
}
