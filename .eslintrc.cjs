module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	settings: {
		react: { version: "detect" }
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime"
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		tsconfigRootDir: `${__dirname}`,
	},
	plugins: [
		"react-refresh",
		"@stylistic",
		"@typescript-eslint",
		"@stylistic/ts",
		"eslint-plugin-react-compiler"
	],
	rules: {
		"react-compiler/react-compiler": "error",
		"react-refresh/only-export-components": [
			"warn",
			{
				allowConstantExport: true
			}
		],
		"@stylistic/arrow-parens": ["error", "as-needed"],
		"@stylistic/arrow-spacing": "error",
		"@stylistic/no-mixed-spaces-and-tabs": "error",
		"@stylistic/no-trailing-spaces": "error",
		"@stylistic/ts/comma-spacing": [
			"error",
			{ before: false, after: true }
		],
		"@stylistic/ts/indent": ["error", "tab"],
		"@stylistic/ts/no-extra-parens": "error",
		"@stylistic/ts/quotes": ["error", "double"],
		"@stylistic/ts/semi": ["error", "never"],
		"react/prop-types": "off",
	},
}
