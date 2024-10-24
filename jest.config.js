module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
  coveragePathIgnorePatterns: [
    "/src/database/",
    "/node_modules/",
    "/src/setup/setupServer.ts",
    "/src/setup/setupServiceInitializers.ts",
    "/src/server.ts",
  ],
  // collectCoverage: true, // Un comment to enable coverage
  collectCoverageFrom: ["./src/**"],
  coverageDirectory: "./coverage",
};
