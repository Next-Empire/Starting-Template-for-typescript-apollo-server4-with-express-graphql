export default {
  preset: "ts-jest",
  testEnvironment: "node",
  // Specify the file extensions that Jest should look for
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  roots: ["<rootDir>/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // The glob patterns Jest uses to detect excluded files
  testPathIgnorePatterns: ["/node_modules/"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
};
