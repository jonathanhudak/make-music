// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/admin.tsx";
import * as $1 from "./routes/api/files.ts";
import * as $2 from "./routes/api/login.ts";
import * as $3 from "./routes/api/login/apple.ts";
import * as $4 from "./routes/api/login/github.ts";
import * as $5 from "./routes/api/login/github/oauth.ts";
import * as $6 from "./routes/api/login/standard.ts";
import * as $7 from "./routes/index.tsx";
import * as $8 from "./routes/login.tsx";
import * as $9 from "./routes/logout.ts";
import * as $$0 from "./islands/FilePicker.tsx";

const manifest = {
  routes: {
    "./routes/admin.tsx": $0,
    "./routes/api/files.ts": $1,
    "./routes/api/login.ts": $2,
    "./routes/api/login/apple.ts": $3,
    "./routes/api/login/github.ts": $4,
    "./routes/api/login/github/oauth.ts": $5,
    "./routes/api/login/standard.ts": $6,
    "./routes/index.tsx": $7,
    "./routes/login.tsx": $8,
    "./routes/logout.ts": $9,
  },
  islands: {
    "./islands/FilePicker.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
