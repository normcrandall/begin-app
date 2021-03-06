import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";
import autoPreprocess from "svelte-preprocess";
import { config } from "dotenv";
import replace from "@rollup/plugin-replace";
import nodePolyfills from "rollup-plugin-node-polyfills";

const proc = config().parsed;

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    css({ output: "public/build/extra.css" }),
    replace({
      // stringify the object
      processess: JSON.stringify({
        env: {
          isProd: production,
          FIREBASECLIENT: process.env.FIREBASECLIENT
            ? process.env.FIREBASECLIENT
            : proc.env.FIREBASECLIENT,
          FIREBASEAPI: process.env.FIREBASEAPI
            ? process.env.FIREBASEAPI
            : proc.env.FIREBASEAPI,
          HASURA: process.env.HASURA ? process.env.HASURA : proc.env.HASURA,
        },
      }),
    }),
    svelte({
      preprocess: autoPreprocess({ postcss: true }),
      // preprocess: sveltePreprocess({ postcss: true }),
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("public/build/bundle.css");
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      mainFields: ["browser", "jsnext", "module", "main"],
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start:sandbox"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
