module.exports = {
  //配置Mock接口
  configureWebpack:{  //Webpack扩展
    devServer:{
      /* 
      port:8089, //端口号
      open:true, //npm run serve后，浏览器将自动从后台打开一个端口号为8089的网页
       */
      //Mock接口编写的地方
      before(app){
        //app.get('请求地址',回调)
        /* app.get('请求地址',(req,res)=>{
          //返回所请求的信息
          res.json({
            
          })
        }) */
        
        //Ⅰ.用户信息池
        let userpool = [
          {username:'xiaod',password:'123456'},
          {username:'tim',password:'123456'}
        ]
        //⚡注册接口
        app.get('/api/register',(req,res)=>{
          //request.query收到的对象为{"username":"XXX1","password":XXX2"}，通过解构赋值, 将属性从对象中取出,赋值给其他变量
          //{username,password} = {"username":"XXX1","password":XXX2"}，
          const {username,password} = req.query
          //判断用户注册的用户名或密码信息池中是否已存在
          //对“用户信息池userpool”进行数组过滤，若它的对象元素(element)中的username和req.query所收到的username进行对比，若"element.username == username"为true，则保留“用户信息池userpool”中当前正在测试的对象元素(element)至一个“新数组”中，然后.length取其长度赋值给userlength
          const userlength = userpool.filter(element => element.username == username).length
          /*判断“新数组的长度”*/
          //“新数组的长度”若大于0，则代表用户注册的username信息池中已存在，设置success为false
          if(userlength > 0){
            res.json({     //📌常用res.json()来接收从后端(接口)返回的数据
              success:false,
              message:'用户名已存在'
            })
          }else{  //“新数组的长度”若小于0，则代表用户注册的username信息池中已存在，设置success为false
            res.json({     //📌常用res.json()来接收从后端(接口)返回的数据
              success:true,
              message:'注册成功'
            })
          }
        })

        //⚡登录接口
        let tokenKey = 'shanghai'
        app.get('/api/login',(req,res) => {
          //接收到来自Login.vue中params参数中的this.model，通过解构赋值赋值给username和password变量
          const {username,password} = req.query
          if((username == 'xiaod' && password == '123456') || (username == 'tim' && password =='123456')){
            res.json({
              code:0, //请求成功
              message:'登录成功',
              //👇的token用于加密用户输入的信息
              //new Date().getTime()-创建一个Date时间对象并获取当前日期对象的时间戳，60*60*1000-设置token失效时间为1h
              token:tokenKey + '-' + username + '-' + (new Date().getTime()+60*60*1000)
            })
          }else{
            res.json({    //📌常用res.json()来接收从后端(接口)返回的数据
              code:1, //请求失败
              message:'账号或密码错误'
            })
          }
        })

        //首页轮播图数据接口
        app.get('/api/banner',(req,res)=>{
          res.json({
            data:[
              {
                url: 'https://www.canva.cn',
                image: 'https://marketplace.canva.cn/EAEL28jOGYo/3/0/1600w/canva-I8lpPnM4M0M.jpg'
              },
              {
                url: 'https://www.canva.cn',
                image: 'https://marketplace.canva.cn/EAEOTwLSoVQ/1/0/1600w/canva-xkhtO4jw1bs.jpg'
              },
              {
                url: 'https://www.canva.cn',
                image: 'https://marketplace.canva.cn/EAEOT4oLsDU/1/0/1600w/canva--arEUVf2vVo.jpg'
              }
            ]
          })
        })

        //滚动分类接口
        app.get('/api/rollinglist',(req,res)=>{
          res.json({
            data:[
              [
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAD6oNJErhM/5/0/1600w/canva-EPy4gMGCuow.jpg',
                    label:'熊本家'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEnRrAW-mU/1/0/1600w/canva--GNS9UX89B4.jpg',
                    label:'诗菲小铺'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnemjfjY/1/0/1600w/canva-dxeFSdXnaoE.jpg',
                    label:'SunBeauty'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnOrPUkI/1/0/1600w/canva-Mm2ixvT3QsQ.jpg',
                    label:'蒲茶'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEC4fzcZV4/1/0/1600w/canva-91z23Jw_nM8.jpg',
                    label:'Holly’s'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAELx0ZL4e4/2/0/1600w/canva-BCE9NdwNnKQ.jpg',
                    label:'花姑子'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEM_zjrmaM/1/0/1600w/canva-aU2qLO6BHCc.jpg',
                    label:'QUEEN'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEbFP--HWs/1/0/1600w/canva-UPxCytFjxFk.jpg',
                    label:'BLONDE'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EADmRRagD40/2/0/1600w/canva--EPQa3t0848.jpg',
                    label:'巴黎春天'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnHbUrmU/1/0/1600w/canva-6UT7oyr38zU.jpg',
                    label:'港式餐厅'
                },
              ],
              [
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAELx1gG7K4/3/0/1600w/canva-FiXn3A2aU_o.jpg',
                    label:'相宜药妆'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EADmReFqg-A/2/0/1600w/canva-WFVjZoFuSRo.jpg',
                    label:'艾伦家装'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEbFN4sXV0/1/0/1600w/canva-yIFu5fffOWc.jpg',
                    label:'SPA&LON'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEnRlZH4Xo/1/0/1600w/canva-9JkVd8J2RjI.jpg',
                    label:'美妍·美妆'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EADmRWetZFk/2/0/1600w/canva-yvddZHi40sI.jpg',
                    label:'小象童装'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EADcCTdQcJc/2/0/1600w/canva-JRqUjzEQJJw.jpg',
                    label:'一品清禾'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnA5nBgA/1/0/1600w/canva-XIv7f_K5LRw.jpg',
                    label:'付记包子'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnYzLBAE/1/0/1600w/canva-ru3RpNJTgf8.jpg',
                    label:'ALAIR’s'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnZ5Z8rE/1/0/1600w/canva-6M6NZ1FOAac.jpg',
                    label:'DADA童装'
                },
                {
                    url: 'https://www.canva.cn/templates/search/Logo',
                    image: 'https://marketplace.canva.cn/EAEVnO5-o6M/1/0/1600w/canva-0pnAn6ml7MM.jpg',
                    label:'玛格利塔'
                },
              ],
            ]
          })
        })

        //获取分类页的分类接口
        app.get('/api/classify',(req,res)=>{
          switch(req.query.type){
            case '0':
            res.json({
              data:[
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  
              ]
            });
            break;
            case '1':
            res.json({
              data: [
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
              ]
            });
            break;
            case '2':
            res.json({
              data: [
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  },
                  {
                      image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                      label:'华为'
                  }
              ]
            });
            break;
            case '3':
            res.json({
              data: [
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
                  {
                      image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                      label:'荣耀'
                  },
              ]
            });
            break;
            case '4':
            res.json({
              data: [
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
              ]
            });
            break;
            case '5':
            res.json({
              data: [
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
                  {
                      image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                      label:'苹果'
                  },
              ]
            });
            break;
            case '6':
            res.json({
              data: [
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
                  {
                      image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                      label:'小米'
                  },
              ]
            });
            break;
          }
      })
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
