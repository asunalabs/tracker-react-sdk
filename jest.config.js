export default {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)",
		"<rootDir>/src/**/*.(test|spec).(ts|tsx|js)",
	],
	collectCoverageFrom: [
		"src/**/*.(ts|tsx)",
		"!src/**/*.d.ts",
		"!src/index.ts",
		"!src/setupTests.ts",
	],
	transform: {
		"^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
