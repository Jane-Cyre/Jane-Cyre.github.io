module.exports = {
    pages: {
      index: {
        //入口
        entry: 'src/main.js',
      },
    },
    //保存时自动检查
    lintOnSave:false,   //关闭语法检查

    //开启代理服务器(方式一)：其端口号和Vue脚手架所创建的本地服务器端口号一致，均为：8080，代理服务器则将向端口号为5000的目标服务器传递由端口号为8080的本地服务器所发送过来的请求
    /* devServer: {
      //该代理服务器所标识的端口号是指：请求所要转发到的"目标服务器"的端口号，也就是5000
      proxy: 'http://localhost:5000'
    }, */

    //开启代理服务器(方式二)
    devServer: {
      proxy: {

        //想走代理服务器，加“请求前缀”，否则，不加“请求前缀”
        '/atguigu': {           // /XXX为“请求前缀”(可自定义)，如果本机请求的“请求前缀”为/atguigu，那么代理服务器便会将该请求转发至“目标服务器”，否则不转发
          target: 'http://localhost:5000',
          //pathRewrite的值的形式为:对象{'key(正则匹配条件)':'value'}
          pathRewrite:{'^/atguigu':''},  //将“代理服务器”转发给“目标服务器”的请求中的“请求前缀”替换成''空字符串，确保路径的准确
          // ws: true,  //用于支持websocket
          // changeOrigin: true  // 用于控制请求头中的host值。为true - 说谎: 端口号与目标服务器一致， 为false - 实话实说: 端口号与目标服务器不一致
        },

        '/demo': {           
          target: 'http://localhost:5001',
          pathRewrite:{'^/demo':''},  
          // ws: true,            //不写默认为true
          // changeOrigin: true   //不写默认为true
        }

      }
    }
  }