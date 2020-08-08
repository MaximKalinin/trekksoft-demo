import * as webpack from "webpack";
import path from "path";
import HtmlWebPackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.ConfigurationFactory = (_, argv) => {
  const development = argv.mode === "development";
  const htmlPlugin = new HtmlWebPackPlugin({
    react: development
      ? "https://unpkg.com/react@16/umd/react.development.js"
      : "https://unpkg.com/react@16/umd/react.production.min.js",
    reactDom: development
      ? "https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      : "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    redux: development
      ? "https://unpkg.com/redux@4.0.5/dist/redux.js"
      : "https://unpkg.com/redux@4.0.5/dist/redux.min.js",
    template: "./index.ejs",
  });

  const cssPlugin = new MiniCssExtractPlugin({ filename: "[name].[hash].css" });

  return {
    devtool: development ? "inline-source-map" : false,
    mode: development ? "development" : "production",
    entry: "./src/index",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: development ? "bundle.js" : "bundle.[contenthash].js",
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@app": path.resolve(__dirname, "src"),
      },
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      redux: "Redux",
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.less$/,
          use: [
            development
              ? { loader: "style-loader" }
              : { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: {
                  mode: "local",
                  localIdentName: development
                    ? "[local]__[hash:base64]"
                    : "[emoji]",
                },
              },
            },
            { loader: "less-loader" },
          ],
        },
        {
          test: /\.(jpe?g|png|svg|(o|t)tf)$/,
          loader: "file-loader",
          options: {
            esModule: false,
          },
        },
      ],
    },
    devServer: {
      proxy: {
        "/": "http://localhost:3000/",
      },
    },
    plugins: [htmlPlugin, cssPlugin],
  };
};

export default config;
