const fs = require('fs')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const { createServer: createViteServer } = require('vite')

async function createServer(isProd = process.env.NODE_ENV === "production") {
  const resolve = (p) => path.resolve(__dirname, p);
  const app = express()
  if(!isProd) {
    app.use(logger('dev'));
  }

  const manifest = isProd ?	require('./dist/client/ssr-manifest.json') : {};

  // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  //
  // 如果你想使用 Vite 自己的 HTML 服务逻辑（将 Vite 作为
  // 一个开发中间件来使用），那么这里请用 'html'
  let vite;
  if(!isProd){
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' }
    })
    // 使用 vite 的 Connect 实例作为中间件
    app.use(vite.middlewares)
  }else {
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
      const url = req.originalUrl;


    try {
      // 1. 读取 index.html
      let template;
      let render;

      if(!isProd){
        template = fs.readFileSync(
          resolve('index.html'),
          'utf-8'
        )
    
        // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
        //    同时也会从 Vite 插件应用 HTML 转换。
        //    例如：@vitejs/plugin-react-refresh 中的 global preambles
        template = await vite.transformIndexHtml(url, template)
        // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
        //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
        //    并提供类似 HMR 的根据情况随时失效。
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
      } else {
        template = fs.readFileSync(resolve("./dist/client/index.html"), "utf-8")
        render = require("./dist/server/entry-server.js").render;
      }
  
      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const appHtml = await render(url, manifest)
      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
  
      // 6. 返回渲染后的 HTML。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })
  /**
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/test', (req, res) => {
    res.send('Hello World test!')
  })

  app.get("/error", function(req, res, next){
    process.nextTick(function(){
      next(new Error('oh no!'));
    });
  })

  // 静态文件
  // /a.txt
  app.use(express.static(path.join(__dirname, 'public')));

  // /static/a.txt
  app.use("/static", express.static(path.join(__dirname, "public")))

  // /style.css代替 /static/css/style.css
  app.use(express.static(path.join(__dirname, 'public', 'css')));
   */
  // function error(err, req, res, next) {  
  //   // respond with 500 "Internal Server Error".
  //   res.status(500);
  //   res.send('Internal Server Error');
  // }

  // // the error handler is placed after routes
  // app.use(error);



  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })
}

createServer()