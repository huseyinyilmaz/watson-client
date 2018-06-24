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

  "plugins": [
    "flowtype-errors",
    "flowtype",
  ]
};
