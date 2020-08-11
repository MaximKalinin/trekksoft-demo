module.exports = {
  roots: ["<rootDir>/src/__test__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/__mocks__/fileMock.js",
    "^@app/(.*)$": "<rootDir>/src/$1",
  },
};
