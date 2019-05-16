/* global process */

/**
 * @param {array} plugins - array plugins
 * @param {RegExp} exclude - exclude
 * @param {RegExp} include
 * */
module.exports = (plugins = [], exclude = /node_modules/, include = /src/) => ({
  test: /\.tsx?$/,
  exclude: exclude,
  include: include,
  use: {
    loader: require.resolve("babel-loader"),
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: ['@babel/preset-env', "@babel/preset-typescript", '@babel/preset-react'],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            /** @desc https://www.styled-components.com/docs/tooling#control-the-components-displayname */
            fileName: false,
            /** @desc https://www.styled-components.com/docs/tooling#control-the-components-displayname */
            displayName: false,
            /** @desc https://www.styled-components.com/docs/tooling#serverside-rendering */
            ssr: true,
            /** @desc https://www.styled-components.com/docs/tooling#dead-code-elimination */
            pure: true,
            /** @desc https://www.styled-components.com/docs/tooling#minification */
            minify: true,
          },
        ],
        '@babel/plugin-proposal-class-properties',
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ...(process.env.hmr ? ["react-hot-loader/babel"] : []),


        ...plugins,
      ],
    }
  },
});
