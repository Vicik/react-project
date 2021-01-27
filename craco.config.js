const CracoLessPlugin = require('craco-less');

module.exports = {
  babel:{
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }], // 支持装饰器写法
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true //设置为true即是less
        }
      ]
    ]
  },

//配置代理解决跨域
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://baidu.com",
//         //target: 'http://192.168.9.19:8080',
//         changeOrigin: true,
//         pathRewrite: {
//           "^/api": ""
//         }
//       }
//     }
//   },
  plugins: [
    {
      plugin: CracoLessPlugin, // 自定义主题
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};