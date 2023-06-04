import { container } from "webpack";
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "feed-app",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  devServer: {
    port: 4201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: "angular-shell",
      filename: "remoteEntry.js",
      remotes: {
        react_components: `react_components@http://localhost:3001/remoteEntry.js`,
        vue_components: `vue_components@http://localhost:3002/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
