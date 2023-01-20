const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 生产webpack配置文件工厂
 * @param {*} webpackEnv 环境信息 development production
 */
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv == "development"; //是否是开发环境
  const isEnvProduction = webpackEnv == "production"; //是否生产环境
  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: paths.appIndexJs,
    output: {
      path: paths.appBuild,
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.appSrc, //只转译src目录下面的文件
          use: [
            {
              loader: "babel-loader",
              options: {
                //插件的集合，可以把jsx编译成js
                presets: ["@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),
    ],
  };
};
