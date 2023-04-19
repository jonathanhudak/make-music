import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";

console.log(cryptoRandomString({ length: 10, type: "alphanumeric" }));
