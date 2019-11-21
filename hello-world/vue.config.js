const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  outputDir: "./dists",
  productionSourceMap: false,
  filenameHashing: true,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  //crossorigin: '',
  runtimeCompiler: false,
  integrity: false,
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8888,
    open: true,
    https: false,
    proxy: {
      "/api": {
        //   // target: 'http://192.168.0.159:8080',
        //   // target: 'http://192.168.0.180:8080',
        //   // target: 'http://ihospital.doctoradmin.ebaiyihui.com',
        target: "http://testihospital.doctoradmin.ebaiyihui.com",
        ws: true,
        changeOrigin: true,//允许跨域
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: true,
    requireModuleExtension: false,
    // css预设器配置项
    loaderOptions: {
      css: {

      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // module: {
  //   rules: [{
  //     test: /\.(png|jpg)$/,
  //     use: "url-loader?limit=8192&name=[path][name]_[hash:8].[ext]"
  //   }, {
  //     test: /\.css$/,
  //     use: ExtractTextPlugin.extract({
  //       fallback: "style-loader",
  //       use: "css-loader"
  //     })
  //   }]
  // },
  /**
   *  config.module
   .rule("/\.css$/")
   .use("css-loader")
   .loader("css-loader");
   */
  configureWebpack: config => {
    // js output config
    config.output.filename = "[name].[chunkhash:8].js";
    //config.output.filename="css/demo/[name].[hash:20].css";
  },
  // chainWebpack: config => {
  //   // css output config
  //   let miniCssExtractPlugin = new miniCssExtractPlugin(
  //     {
  //       filename: "[name].[chunkhash:10].css"
  //       //chunkFilename: "css/[name].[chunkhash:20].css"
  //     }
  //   );
  //   config.plugin("extract-css").use(miniCssExtractPlugin);
  //
  //   // image output config
  //   // config.module.rule("images")
  //   //   .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  //   //   .use("url-loader")
  //   //   .loader("file-loader")
  //   //   .options({
  //   //     name: "[name].[hash:8].[ext]"
  //   //   });
  //   // config.module.rule("svg")
  //   //   .test(/\.(svg)(\?.*)?$/)
  //   //   .use("file-loader")
  //   //   .loader("file-loader")
  //   //   .options({
  //   //     name: "[name].[hash:8].[ext]"
  //   //   });
  //   // config.module.rule("css")
  //   //   .test(/\.css$/i)
  //   //   .use(["css-loader",'style-loader'])
  //   //   .loader("css-loader")
  //   //   .options({
  //   //     sourceMap: true,
  //   //      import:true,
  //   //     name: "[name].[chunkhash:20].[ext]"
  //   //   });
  //
  // },
  chainWebpack: (config) => {
    config.resolve
      .alias
      .set("@", resolve("src"))
      .set("style", resolve("@/assets/style"))
      .set("img", resolve("@/assets/img"))
      .set("components", resolve("@/components"));
    // config.module
    //   .rule("css")
    //   .test("/\.css$/")
    //   .use("css-loader")
    //   .loader("css-loader");
    //config.output.filename("[name].[chunkhash:10].js").end();
  }
};
