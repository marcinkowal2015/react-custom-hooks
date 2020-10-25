module.exports = {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "/__tests__/.*test.tsx$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    setupFilesAfterEnv: ['./jest.setup.ts']
  };