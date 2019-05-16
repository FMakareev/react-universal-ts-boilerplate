module.exports = {
  test: /\.(graphql|graphqls|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
};
