// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/admin.tsx";
import * as $1 from "./routes/api/login.ts";
import * as $2 from "./routes/index.tsx";
import * as $3 from "./routes/logout.ts";

const manifest = {
  routes: {
    "./routes/admin.tsx": $0,
    "./routes/api/login.ts": $1,
    "./routes/index.tsx": $2,
    "./routes/logout.ts": $3,
  },
  islands: {},
  baseUrl: import.meta.url,
  config,
};

export default manifest;
