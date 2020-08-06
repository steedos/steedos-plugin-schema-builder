const ConsoleWebpack = require("ak-webpack");
const processPath = process.cwd()
const path = require('path')

module.exports = ConsoleWebpack({
  output: {
    path: path.join(process.cwd(), '/public/schema-builder'),
    publicPath: '/schema-builder',
    
  },
  devServer: {
    https: false ,
    open: true ,
    openPage:'schema-builder',
    proxy: {
      // "/api/v4/objects": {
      //   target: "http://127.0.0.1:5000",
      //   // target: 'http://30.43.85.42/',
      //   secure: false,
      //   changeOrigin: true,
      //   // cookieDomainRewrite: {
      //   //   '*': 'localhost' // 把相应的 cookie 域都设置成 localhost，也可以配置成自己电脑的ip，或者指定的域名
      //   // }
      // },
      // ///accounts/a
      // "/accounts": {
      //   target: "http://127.0.0.1:5000",
      //   // target: 'http://30.43.85.42/',
      //   secure: false,
      //   changeOrigin: true,
      //   // cookieDomainRewrite: {
      //   //   '*': 'localhost' // 把相应的 cookie 域都设置成 localhost，也可以配置成自己电脑的ip，或者指定的域名
      //   // }
      // },
      "*": {
        target: "http://zyking.xyz:5080",
        // target: 'http://30.43.85.42/',
        secure: false,
        changeOrigin: true,
        // cookieDomainRewrite: {
        //   '*': 'localhost' // 把相应的 cookie 域都设置成 localhost，也可以配置成自己电脑的ip，或者指定的域名
        // }
      },
    }
  },
  entry: {
    app: './webapp/test/index.tsx',
  }, 
}, 'schema-builder', {
    tsLoaderInclude: [
      path.resolve(processPath, 'webapp/src'),
      path.resolve(processPath,'webapp/test')
  ]
}
);
