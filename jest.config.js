module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	moduleNameMapping: {
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
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
