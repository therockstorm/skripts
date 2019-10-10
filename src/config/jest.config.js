module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/coverage/**",
    "!**/dist/**",
    "!**/node_modules/**"
  ],
  testEnvironment: "node",
  testRegex: "(/test/.*\\.(test|spec))\\.[jt]sx?$",
  transform: {
    "\\.tsx?$": "ts-jest",
    "\\.jsx?$": "babel-jest"
  }
}
