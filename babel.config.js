const config = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-transform-runtime",
    [
      "babel-plugin-styled-components",
      {
        "fileName": false,
        "displayName": false,
        "ssr": true,
        "pure": true,
        "minify": true
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
};

if (process.env.NODE_ENV === 'test') {
  config.plugins.push("require-context-hook")
}
module.exports = config;
