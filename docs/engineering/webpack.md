# Webpack

## 说说你对 webpack 的理解？

本质上，webpack 是一个用于现代 JavaScript 应用程序的 `静态模块打包工具`。

当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 `依赖图`(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。输出的文件已经编译好了，可以在浏览器运行。

 webpack 具有打包压缩、编译兼容、能力扩展等功能。其最初的目标是实现前端项目的模块化，也就是如何更高效地管理和维护项目中的每一个资源。

webpack的作用：

- `模块打包`。可以将不同模块的文件打包整合在一起，并保证它们之间的引用正确，执行有序。
- `编译兼容`。通过 webpack 的 Loader 机制，可以编译转换诸如 .less, .vue, .jsx 这类在浏览器无法识别的文件，让我们在开发的时候可以使用新特性和新语法，提高开发效率。
- `能力扩展`。通过 webpack 的 Plugin 机制，可以进一步实现诸如按需加载，代码压缩等功能，帮助我们提高工程效率以及打包输出的质量。



##  Loader 是什么？

其作用是**让 Webpack 能够去处理那些非 JavaScript 文件**。

由于 Webpack 自身只理解 JavaScript、JSON ，其他类型/后缀的文件都需要经过 loader 处理，并将它们转换为有效模块。

loader 可以是同步的，也可以是异步的；而且**支持链式调用**，链中的每个 loader 会处理之前已处理过的资源。

当 webpack 碰到不识别的模块时， 就会在配置中查找该文件的解析规则

在 webpack 的配置中，loader 有两个属性：

1. `test`：识别出哪些文件会被转换
2. `use`：定义在进行转换时，应该使用哪个 loader

```js
const path = require('path');
module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /.txt$/, use: 'raw-loader' }],
  },
};
```

当配置多个 loader 的时候，`从右到左（从下到上）` 执行

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```



## 有哪些常见的Loader？

- `babel-loader`：使用Babel加载ES2015+ 代码并将其转换为ES5
- `ts-loader`: 将TypeScript转换成JavaScript
- `sass-loader`：将SCSS/SASS代码转换成CSS
- `style-loader`：将模块导出的内容作为样式添加到DOM中
- `css-loader`：加载CSS文件并解析import的CSS文件
- `less-loader`：将Less编译为CSS
- `node-loader`：处理Node.js插件
- `source-map-loader`：加载额外的Source Map文件，以方便断点调试



## Plugin 是什么？

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务：打包优化，资源管理，注入环境变量。plugin 会运行在 webpack 的不同阶段，贯穿整个编译周期，目的在于解决 loader 无法实现的其他事。

配置方式：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

其本质是一个具有 apply 方法 javascript对象， **apply 方法会被 webpack compiler 调用**，并且在整个编译生命周期都可以访问 compiler 对象。

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建过程开始！');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```



## 有哪些常见的Plugin？

- `clean-webpack-plugin`: 用于在打包前清理上一次项目生成的bundle文件
- `mini-css-extract-plugin`: 分离样式文件，CSS提取为独立文件
- `webpack-bundle-analyzer`: 可视化Webpack输出文件的体积 
- `speed-measure-webpack-plugin`: 可以看到每个Loader和Plugin执行耗时
- `optimize-css-assets-webpack-plugin`：压缩css文件
- `css-minimizer-webpack-plugin`：压缩css文件（用于 webpack 5）
- `uglifyjs-webpack-plugin`：压缩js文件
- `compression-webpack-plugin`：启用gzip压缩
- `html-webpack-plugin`：自动生成一个html文件，并且引用bundle.js文件
- `terser-webpack-plugin`: 可以压缩和去重 js 代码(Webpack4)



## Loader和Plugin的区别？

- `概念区别`：	
  - loader 能够让 Webpack 能够去处理那些非 JavaScript 文件，因为 Webpack 自身只能理解 JavaScript、JSON ，其他类型/后缀的文件都需要经过 loader 处理，并将它们转换为有效模块。
  - plugin 赋予了 webpack 各种灵活的功能例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事。

- `运行时机`：loader 运行在打包文件之前，plugins 在整个编译周期都起作用
- `配置方式`
  - loader 在 module.rules 中配置，类型为数组。每一项都是 Object，包含了 test、use 等属性
  - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 实例，参数都通过构造函数传入
- `工作方式`：
  - 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack 提供的 API 改变输出结果
  - 对于 loader，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将 A.scss 转变为 B.css ，单纯的文件转换过程



## 实现一个loader

首先需要了解 loader 的本质：其本质为函数，函数中的 this 作为上下文会被 webpack 填充，因此我们不能将 loader 设为一个箭头函数。函数接受一个参数，为 webpack 传递给 loader 的文件源内容。函数中 this 是由 webpack 提供的对象，能够获取当前 loader 所需要的各种信息

函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer。

代码如下所示：

```js
// 导出一个函数，source为webpack传递给loader的文件源内容
module.exports = function(source) {
    const content = doSomeThing2JsString(source);
    
    // 如果 loader 配置了 options 对象，那么this.query将指向 options
    const options = this.query;
    
    // 可以用作解析其他模块路径的上下文
    console.log('this.context');
    
    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    this.callback(null, content); // 异步
    return content; // 同步
}
```

一般在编写 loader 的过程中，保持功能单一，避免做多种功能。如 less 文件转换成 css 文件也不是一步到位，而是 less-loader 、 css-loader 、 style-loader 几个 loader 的链式调用才能完成转换。



## 实现一个plugin

由于`webpack`基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务

webpack 编译会创建两个核心对象：

- compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子
- compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建

```js
class MyPlugin {
    // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation: 当前打包构建流程的上下文
        console.log(compilation);
        
        // do something...
    })
  }
}
```

在 `emit` 事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容



## source map 是什么？

sourceMap是一项将编译、打包、压缩后的代码映射回源代码的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中 debug 会带来非常糟糕的体验， sourceMap 可以帮助我们快速定位到源代码的位置，提高我们的开发效率。

既然是一种源码的映射，那必然就需要有一份映射的文件，来标记混淆代码里对应的源码的位置，通常这份映射文件以`.map`结尾，里边的数据结构大概长这样：

```js
{
  "version" : 3,                          // Source Map版本
  "file": "out.js",                       // 输出文件（可选）
  "sourceRoot": "",                       // 源文件根目录（可选）
  "sources": ["foo.js", "bar.js"],        // 源文件列表
  "sourcesContent": [null, null],         // 源内容列表（可选，和源文件列表顺序一致）
  "names": ["src", "maps", "are", "fun"], // mappings使用的符号名称列表
  "mappings": "A,AAAB;;ABCDE;"            // 带有编码映射数据的字符串
}
```

有了这份映射文件，我们只需要在压缩代码的最末端加上这句注释，即可让 sourceMap 生效：

```js
//# sourceURL=/path/to/file.js.map
```

有了这段注释后，浏览器就会通过`sourceURL`去获取这份映射文件，通过解释器解析后，实现源码和混淆代码之间的映射。因此 sourceMap 其实也是一项需要浏览器支持的技术。

如果我们仔细查看 webpack 打包出来的 bundle 文件，就可以发现在默认的`development`开发模式下，每个`_webpack_modules__`文件模块的代码最末端，都会加上`//# sourceURL=webpack://file-path?`，从而实现对 sourceMap 的支持。



## 文件监听原理

在发现源码变化时，自动重新构建出新的输出文件。

Webpack开启监听模式，有两种方式：

- 启动 webpack 命令时，带上 --watch 参数
- 在配置 webpack.config.js 中设置 watch:true

缺点：每次需要手动刷新浏览器

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等  aggregateTimeout 后再执行。

```js
module.export = {    
    // 默认false,也就是不开启    
    watch: true,    
    // 只有开启监听模式时，watchOptions才有意义    
    watchOptions: {        
        // 默认为空，不监听的文件或者文件夹，支持正则匹配        
        ignored: /node_modules/,        
        // 监听到变化发生后会等300ms再去执行，默认300ms        
        aggregateTimeout:300,        
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次 
        poll:1000    
    }
}
```



## 说说webpack proxy工作原理？为什么能解决跨域?

### 是什么？

webpack 提供的代理服务，基本行为就是接收客户端发送的请求后转发给其他服务器 ，其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

想要实现代理首先需要一个中间服务器， webpack 中提供服务器的工具为 `webpack-dev-server`，是 webpack 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起，目的是为了提高开发者日常的开发效率，只适用在**开发阶段**。

关于配置方面，在 webpack 配置对象属性中通过 `devServer` 属性提供，如下：

```js
module.exports = {
    // ...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://api.github.com'
            }
        }
        // ...
    }
}
```

属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为`/api`，值为对应的代理匹配规则，对应如下：

- target：表示的是代理到的目标地址
- pathRewrite：重写路径，默认情况下，我们的 /apiy 也会被写入到URL中，如果希望删除，可以使用 pathRewrite: { '^/api': '' }
- secure：默认情况下不接收转发到 https 的服务器上，如果希望支持，可以设置为 false
- changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址

### 工作原理

利用 `http-proxy-middleware` 这个 http 代理中间件，实现请求转发给其他服务器。

举个例子：

在开发阶段，本地地址为`http://localhost:3000`，该浏览器发送一个前缀带有 /api 标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中。

```js
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
```

### 跨域

在开发阶段， `webpack-dev-server` 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上，所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题。

通过设置 webpack proxy 实现代理请求后，相当于浏览器与服务端中添加一个代理者。当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地。

在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据。注意：服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制。



## 如何对bundle体积进行监控和分析？

VSCode 中有一个插件 `Import Cost` 可以帮助我们对引入模块的大小进行实时监测，还可以使用 `webpack-bundle-analyzer` 生成 bundle 的模块组成图，显示所占体积。



## 文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

- `Hash`：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
- `Chunkhash`：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
- `Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

**（1）JS的文件指纹设置**

设置 output 的 filename，用 chunkhash。

```js
module.exports = {    
    entry: {        
        app: './scr/app.js',        
        search: './src/search.js'    
    },    
    output: {        
        filename: '[name][chunkhash:8].js',        
        path:__dirname + '/dist'    
    }
}
```

**（2）CSS的文件指纹设置**

设置 MiniCssExtractPlugin 的 filename，使用 contenthash。

```js
module.exports = {    
    entry: {        
        app: './scr/app.js',        
        search: './src/search.js'    
    },    
    output: {        
        filename: '[name][chunkhash:8].js',        
        path:__dirname + '/dist'    
    },    
    plugins:[        
        new MiniCssExtractPlugin({            
            filename: `[name][contenthash:8].css`        
        })    
    ]
}
```



## 如何保证各个loader按照预想方式工作？

可以使用 `enforce` 强制执行 loader 的作用顺序， pre 代表在所有正常 loader 之前执行， post 是所有 loader 之后执行。(inline 官方不推荐使用)



## 说说webpack的构建流程?

1. `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. `确定入口`：根据配置中的 entry 找出所有的入口文件
4. `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表
7. `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统



## SCSS文件在webpack中的编译打包过程是怎么样的？

1. 加载scss：sass-loader在js文件中根据模块化规则找到scss文件
2. 编译scss：sass编译器将scss编译为css
3. css-loader解析：根据css-loader对css文件进行加载并解析其中的@import和url()
4. style-loader工作：将css样式插入html文件中



## npm run dev的时候webpack做了什么事情

执行 npm run dev 时候最先执行的 build/dev-server.js 文件，该文件主要完成下面几件事情：

1. 检查node和npm的版本、引入相关插件和配置
2. webpack对源码进行编译打包并返回compiler对象
3. 创建express服务器
4. 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
5. 挂载代理服务和中间件
6. 配置静态资源
7. 启动服务器监听特定端口（8080）
8. 自动打开浏览器并打开特定网址（localhost:8080）



## webpack打包原理是什么

Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。它将各种资源，如 JavaScript、样式表、图片等，视为模块，并将它们打包成合适的文件，以供浏览器加载。

Webpack 的打包原理主要包括以下几个步骤：

1. **入口（Entry）**: Webpack 从一个或多个入口点开始分析应用程序，通常是一个 JavaScript 文件。从这些入口点开始，Webpack 构建依赖图。

2. **依赖分析（Dependency Analysis）**: Webpack 会递归地分析入口点及其依赖的模块，以构建完整的依赖图。在分析过程中，它会识别每个模块所需的依赖关系，包括 JavaScript 中的 import 语句、CSS 中的 @import 语句等。

3. **模块转换（Module Transformation）**: Webpack 在处理每个模块时，会根据配置的规则（如 loader）对模块进行转换。例如，将 ES6 语法转换为 ES5，将 Sass 转换为 CSS 等。

4. **打包（Bundle）**: 经过模块转换后，Webpack 将所有模块打包成一个或多个 bundle 文件。这些文件包含了整个应用程序的代码和依赖，可以在浏览器中加载执行。

5. **输出（Output）**: 最后，Webpack 将打包生成的 bundle 输出到指定的目录，通常是一个或多个 JavaScript 文件。输出的文件可以直接在浏览器中引入并执行。

总的来说，Webpack 打包原理就是将模块化的代码进行依赖分析、转换和打包，最终输出可在浏览器中加载运行的 bundle 文件。