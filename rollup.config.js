import vue from "rollup-plugin-vue";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    nodeResolve({ extensions: [".js", ".ts", ".vue"] }),
    commonjs(),
    vue(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: ["vue"],
};
