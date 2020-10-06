module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  setupFiles: [
    './setup.ts'
  ],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.svg$": "<rootDir>/svgTransform.js"
  },
  testRegex: '(/__Test__/.*|\\.(test|unit))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/'
  ],
  testEnvironment: 'node',
}