# bitor


### vue 运行时构建
```
npm install之后的vue
再去看查vue模块，添加几行
resolve: {
  alias: {
  'vue': 'vue/dist/vue.js'
  }
}
```

webpack4 后， Vue-loader 插件都需要显式引入

webpack -p 

webpack-dev-server 不会生成 dist

原因

webpack-dev-server动态生成的包并不发布到你的真实目录中（dist/）,而是放在了内存中。

四、解决

将项目的指向配置到虚拟服务器中。

修改index.html中的src路径为：

<script src="http://localhost:8080/bundle.js"></script>

content-base
设定webpack-dev-server伺服的directory。如果不进行设定的话，默认是在当前目录下。

这个时候还要注意的一点就是在webpack.config.js文件里面，如果配置了output的publicPath这个字段的值的话，在index.html文件里面也应该做出调整。因为webpack-dev-server伺服的文件是相对publicPath这个路径的。因此，如果你的webpack.config.js配置成这样的：

webpack-dev-server支持2种自动刷新的方式：

Iframe mode

inline mode

这2种模式配置的方式和访问的路径稍微有点区别，最主要的区别还是Iframe mode是在网页中嵌入了一个iframe，将我们自己的应用注入到这个iframe当中去，因此每次你修改的文件后，都是这个iframe进行了reload。


### [babel-loader](https://www.npmjs.com/package/babel-loader)
> [Babel7 + Webpack 4.x 踩坑](https://pdsuwwz.github.io/2018/09/29/webpack4-babel7/)
> [Babel7](https://babeljs.io/docs/en/next/v7-migration)
```

安装babel-loader、babel-core、babel-preset-env
　　这三个文件都是必需的，但彼此的作用各不相同。 
　　首先，babel-loader作为webpack的loader的一种，作用同其他loader一样，实现对特定文件类型的处理。webpack官方文档中指出了loader的作用，即：

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 
JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack的打包能力，对它们进行处理。

　　虽然webpack本身就能够处理.js文件，但无法对ES2015+的语法进行转换，babel-loader的作用正是实现对使用了ES2015+语法的.js文件进行处理。 
　　要使用babel，首先要安装babel-loader，命令行中定位到项目根目录输入以下指令进行安装：

npm install -D babel-loader
1
　　笔者这里安装完成后显示版本是babel-loader@7.1.4。 
　　第二，babel-core的作用在于提供一系列api。这便是说，当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api，因此也必须安装babel-core：

npm install -D babel-core
1
　　笔者安装完成显示版本为babel-core@6.26.0。 
　　第三，babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理。事实上，babel有几种规则都可以实现对ES6语法的转码，如babel-preset-es2015、babel-preset-latest、babel-preset-env，不过官方现已建议采用babel-preset-env，本文也将采用babel-preset-env，你可以通过官网了解几种规则的区别。同样在命令行中定位到项目根目录，输入以下指令进行安装： 
　　

npm install -D babel-preset-env
1
笔者安装的版本是babel-preset-env@1.6.1。

二、配置babel 规则
　　上面仅仅是安装了三个包，如果要使babel起作用，便需要配置babel规则。 
　　第一种方式是通过package.json。在package.json文件中增加一个“babel"属性，该属性是一个JSON对象，作用是设置项目中的babel转码规则和使用到的babel插件，其基本格式如下：

"babel":{
  "presets": [],
  "plugins": []
}

　　”presets”属性字段设定转码规则，”plugins”属性设置使用到的插件。在本项目中只需将”babel”属性 的”presets”:设置为[“env”]即可，如下所示：

"babel":{
  "presets": ["env"]
}

　　上面的设置告诉npm本项目将使用babel，并且使用bable-preset-env规则进行转码，即实现对ES2015+语法进行转码。 
　　除此之外，还有第二种方式，即通过.babelrc文件。在项目根目录下新建.babelrc文件，里面只需输入第一种方式中”babel”属性的值即可：

{
  "presets": ["env"]
}

作用和第一种方式相同。

三、建立并配置webpack.config.js文件
　　仅有上面仍然不能起作用，虽然上面已经配置好babel的规则，但webpack仍然不知道何时使用该规则，这便需要使用webpack.config.js文件。 
　　这个文件的作用是对webpack打包的参数进行配置。我的第一篇关于webpack4.x的文章《webpack4.x开发环境配置》中已经提到，webpack4.x中webpack.config.js这样的配置文件不是必须的，但事实上，如果想要进行更加个性化的打包配置，仍然要使用该文件。在根目录下新建webpack.config.js文件，在其中输入：

module.exports={
    module:{
        rules:[
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            }
        ]
    }

}

　　这就告诉webpack打包时，一旦匹配到.js文件就使用babel-loader进行处理，如前文所述，babel-loader调用babel-core的api使用bable-preset-env的规则进行转码。这里并没有使用entry、output这样的参数，这是webpack4.x有默认的入口和出口，本项目无须改变，因此便不必进行设置。

四、运行查看结果
　　假使你已经在package.json文件的"scripts"属性下增加了"build"属性，即

"build": "webpack --mode production --progress --display-modules --colors --display-reasons"
```

```
"@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/plugin-proposal-decorators": "^7.1.2",
    "@babel/plugin-proposal-export-default-from": "^7.0.0",
    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
    "@babel/plugin-proposal-function-sent": "^7.0.0",
    "@babel/plugin-proposal-json-strings": "^7.0.0",
    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/plugin-syntax-import-meta": "^7.0.0",
    "@babel/plugin-transform-modules-commonjs": "^7.1.0",
    "@babel/plugin-transform-runtime": "^7.0.0",
    "@babel/polyfill": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "@babel/runtime": "^7.1.5",
    "@babel/runtime-corejs2": "^7.1.5",
    "babel-loader": "^8.0.0",
```

```
而 import/export 的写法就多种多样：import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

```
babel7中 preset-env 完全使用
const presets = [
  ['@babel/env', {
    // chrome, opera, edge, firefox, safari, ie, ios, android, node, electron
    // targets 和 browerslist 合并取最低版本
    targets: {
      ie: 8,

      // 是否使用 esmodules
      esmodules: true,
    },

    // 启用更符合规范的转换，但速度会更慢，默认为 `false`，从目前来看，是更严格的转化，包括一些代码检查。
    spec: false,

    // 有两种模式：normal, loose。其中 normal 更接近 es6 loose 更接近 es5
    loose: false,

    // "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false, defaults to "commonjs"
    modules: false,

    // 打印插件使用情况
    debug: true,

    // 按需增加移除一些功能
    // include: [],
    // exclude: [],

    // 增加 polyfills
    // 按需使用
    // useBuiltIns: 'usage',
    // 引用一次
    // useBuiltIns: 'entry',
    // 不引用，独自使用
    // useBuiltIns: false,

    // 强制使用所有的插件
    // forceAllTransforms: false,

    // 配置 browerslist 的位置
    // configPath: ,
    // 配置是否忽略 browerslist 文件
    // ignoreBrowserslistConfig: false,

    // 是否跳过 proposal 的文件
    // shippedProposals: false,
  }]
];

const plugins = [
  [
    // 重用把 babel 注入的帮助代码， 依赖 @babel/runtime
    "@babel/plugin-transform-runtime",
    {
      // false || 2, 变成全局或者局部
      "corejs": false,
      
      // 生成器运行时的使用，变成全局或者局部
      "regenerator": true,

      // 帮助函数是变成 inline, 还是  lib
      "helpers": true,

      // helpers 切换成 esm
      "useESModules": true
    }
  ]
];

module.exports = { presets, plugins };
```

```
@babel/plugin-proposal-class-properties 箭头函数在class字段中直接绑定this
@babel/plugin-transform-object-assign  Object.assign
@babel/plugin-transform-proto-to-assign bar.__proto__ = {}
@babel/runtime 避免编译输出中的重复
@babel/preset-react 转换React JSX 语法
Babel 7 
1,stage-x插件的废弃
2 es2015 插件 -> env 插件

babel-upgrade
这个工具的本质其实就是把之前的es2015换成env，stage-x换成各种proposal-xxx，并且加上了@babel作为新的Babel 7生态统一使用的scope。如果之前的项目使用了stage-x插件，就会多出大量的插件，其实这里面大部分插件都是无需使用的，你可以根据项目中用到的特性适当删减。
```