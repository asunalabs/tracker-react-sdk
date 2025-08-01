import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: true,
			exports: "named",
		},
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve({
			browser: true,
			preferBuiltins: false,
		}),
		commonjs(),
		typescript({
			tsconfig: "./tsconfig.json",
			declaration: true,
			declarationDir: "dist",
			rootDir: "src",
		}),
		terser(),
	],
	external: ["react", "react-dom"],
};
