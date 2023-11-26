const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")

const isProduction = process.env.NODE_ENV == "production"
const modeStatus = isProduction ? "production" : "development"

module.exports = {
  mode: modeStatus,
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    clean: true
  },
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true
      }
    },
  },
  target: "web",
  // module: {
  //   rules: [
  // {
  //     test: /\.scss$/,
  //     use: ['css-loader', 'postcss-loader', 'sass-loader'],
  // },
  // {
  //   test: /\.(jpg|jpeg|png|webp|svg)$/,
  //   type: "asset/resource",
  //   exclude: [path.resolve(__dirname, 'src/assets/favicons')],
  //   generator: {
  //     filename: 'images/[name][ext]'
  //   }
  // },
  // {
  //     test: /\.(ttf|otf|woff|woff2|eot|svg)$/,
  //     type: "asset/resource",
  //     generator: {
  //         filename: 'fonts/[name][ext]'
  //     }
  // },
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets", to: "" }
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      exclude: [
        /index\.html$/,
      ],
      runtimeCaching: [
        {
          urlPattern: /index\.html/,
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /\.(js|png|jpg)/,
          handler: 'StaleWhileRevalidate'
        }
      ]
    })
  ],
}