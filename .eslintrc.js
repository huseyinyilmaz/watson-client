module.exports = {
  "parser": "babel-eslint",
  "extends": ["plugin:flowtype/recommended", "airbnb"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true,
  },

  "parserOptions": {
    // This is required to test async and await
    "ecmaVersion": 2017,
  },

  "rules": {
    // "eol-last": 0,
    // "no-undef": "error",
    // "semi": ["error", "always"],
    // "no-extra-semi": "error",
    // "space-before-function-paren": ["error", "always"],
    "flowtype-errors/show-errors": 2,
    // "comma-dangle": ["error", "always-multiline"],
    // Default export has too much black magic.
    // We want to be able to use named export with one export.
    "import/prefer-default-export": 0,
    "import/no-default-export": 1,
    // We want to be able to use console.log
    "no-console": 0,
    // We want to be able to use debugger.
    "no-debugger": 0,
    // We want to be able to mark private attributes with underscore prefix.
    // "no-underscore-dangle": 0,
    // Explicit else statements show branching tree to developer
    // which reduces the number of branching bugs.
    "no-else-return": 0,
    // Do not restrict language features with airbnb language subset.
    // Added to allow iterators and generators.
    // "no-restricted-syntax": 0,
    // Maple is based on await calls.
    // "no-await-in-loop": 0,
    // Sometimes arguments are helpfull to show the function signature
    // arguments starting with underscore means they are not used.
    "no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
  },

  "plugins": [
    "flowtype-errors",
    "flowtype",
  ]
};
