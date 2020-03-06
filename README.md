> 模板基于 vue-cli4 和 Vant-ui 搭建，进行大型 H5 项目开发最佳实践方案，让我们来一探究竟



## 项目结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```sh
├── .github                    # git log
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   ├── components             # 全局公用组件
│   ├── constants              # 常量
│   ├── core                   # 分层
│   ├── enum                   # 枚举
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── pages                  # pages 所有页面
│   ├── pwa                    # 渐进式Web应用
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .editorconfig              # 代码风格
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .sentryclirc.js            # 前端异常日志监控配置
├── .babel.config              # babel 配置
├── plopfile.js                # 基本模板配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
...
```



## 安装

```sh
# 克隆项目
git clone https://github.com/push-over/vue-h5-template.git

# 进入项目目录
cd vue-h5-template

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm start
```

> TIP
>
> 强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。若还是不行，可使用 [yarn](https://github.com/yarnpkg/yarn) 替代 `npm`。
>
> Windows 用户若安装不成功，很大概率是`node-sass`安装失败，[解决方案](https://github.com/PanJiaChen/vue-element-admin/issues/24)。
>
> 另外因为 `node-sass` 是依赖 `python`环境的，如果你之前没有安装和配置过的话，需要自行查看一下相关安装教程。



启动完成后会自动打开浏览器访问 [http://localhost:9000， 你看到下面的页面就代表操作成功了。



<img src="https://imgkr.cn-bj.ufileos.com/5a1ea14f-ba92-4ae9-b950-e53d969a2fa8.png" style="zoom: 67%;" />



接下来你可以修改代码进行业务开发了，本项目内建了典型业务模板、模拟数据、状态管理、国际化、全局路由等等各种实用的功能来辅助开发

## 常用命令

```sh
# 项目打包
npm run build:xxx

# 自动创建
npm run new

# 规范Git提交
npm run git-cz

# 生成CHANGELOG
npm run genlog
```



## 分层架构

目前前端的一个开发趋势是以搭建单页应用 (*SPA*) 为主的。当应用体系比较大，或者你的应用业务逻辑足够复杂的时候，会遇到各种各样的问题，我们随便提两点：

- 产品需要多人协作时，每个人的代码风格和对业务的理解不同，导致业务逻辑分布杂乱无章

- 对产品的理解停留在页面驱动层面，导致实现的技术模型与实际业务模型出入较大，当业务需求变动时，技术模型很容易被摧毁

- ...

针对上面所遇到的问题，我们以下面这张架构图做讲解：

![](https://imgkr.cn-bj.ufileos.com/cbc72f4d-e555-44ec-8f2a-56701871d29b.png)



其中 **视图层/View** 是大家接触最多的，想必大家都很了解，就不在这里介绍了，重点介绍其他几个层的含义：

### Services 层

Services 层是用来对底层技术进行操作的，例如封装 `AJAX` 请求,操作浏览器 `Cookie`、`LocaStorage`、`IndexedDB`，操作 `Native` 提供的能力（如调用摄像头等），以及建立 `Websocket` 与后端进行交互等。



**Axios 封装**

```js
.....

export default async function(options) {
  const { url } = options
  const requestOptions = Object.assign({}, options)

  try {
    const { data, data: { errno, errmsg }} = await instance.request(requestOptions)
    if (errno) {
      errorReport(url, errmsg, requestOptions, data)
      throw new Error(errmsg)
    }
    return data
  } catch (err) {
    errorReport(url, err, requestOptions)
    throw err
  }
}
```



**IndexedDB**

```js
...

export class DBRequest {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new DBRequest()
    }
    return this.instance
  }
  async create(options = {}) {
    const { name, data } = options
    const db = await indexDB(name)
    return await db.add(name, data)
  }
    ...
}

```

.......



### Entities 层

实体 Entity 是领域驱动设计的核心概念，它是领域服务的载体，它定义了业务中某个个体的属性和方法。区分一个对象是否是实体，主要是看他是否有唯一的标志符（例如 id）


![](https://imgkr.cn-bj.ufileos.com/c64f797f-6bc9-4cfb-8a9f-90562e569600.png)


通过上面的代码可以看到，这里主要是以实体本身的属性以及派生属性为主，当然实体本身也可以具有方法，用于实现属于实体自身的业务逻辑。

并不是所有的实体都应该按上面那样封装成一个类，如果某个实体本身业务逻辑很简单，就没有必要进行封装，例如本模板中的 `Test` 只是做个演示。

### Interactors 层

Interactors 层是负责处理业务逻辑的层，主要是由业务用例组成

```js
import { Request } from '@/utils/request'
import { CARDS } from '@/constants/api/test'

class TestHttpInteractor {
  service
  constructor(service) {
    this.service = service
  }
  async getTest() {
    try {
      const options = { url: CARDS }
      return await this.service.get(options)
    } catch (error) {
      throw error
    }
  }
  async createTest(data) {
    try {
      const optons = { url: CARDS, data }
      await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
	...
}

const testHttpInteractor = new TestHttpInteractor(Request.getInstance())
export default testHttpInteractor
```

通过上面的代码可以看到，Sevices 层提供的类的实例主要是通过 Interactors 层的类的构造函数获取到，这样就可以达到两层之间解耦，实现快速切换 service 的目的了，当然这个和依赖注入 DI 还是有些差距的，不过已经满足了我们的需求。

另外 Interactors 层还可以获取 Entities 层提供的实体类，将实体类提供的与实体强相关的业务逻辑和 Interactors 层的业务逻辑融合到一起提供给 View 层，例如：

![](https://imgkr.cn-bj.ufileos.com/c7d90e83-443d-4fa2-9ab2-cdd77d4c1238.png)


当然这种分层架构并不是银弹，其主要适用的场景是：实体关系复杂，而交互相对模式化，例如企业软件领域。相反实体关系简单而交互复杂多变就不适合这种分层架构了。

然后需要明确的是，架构和项目文件结构并不是等同的，文件结构是你从视觉上分离应用程序各部分的方式，而架构是从概念上分离应用程序的方式。你可以在很好地保持相同架构的同时，选择不同的文件结构方式。没有完美的文件结构，因此请根据项目的不同选择适合你的文件结构。



## 布局

页面整体布局是一个产品最外层的框架结构, 这里使用了 vue-router 路由嵌套, 所以一般情况下，你增加或者修改页面只会影响 `app-main`这个主体区域。其它配置在 `layout` 中的内容如：底部导航都是不会随着你主体页面变化而变化的。

```tex
/foo                                  /bar
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | foo.vue      | |  +------------>  | | bar.vue     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```



这里在 `app-main` 外部包了一层 `keep-alive` 主要是为了缓存 的，如不需要可自行去除。


![](https://imgkr.cn-bj.ufileos.com/cea246f9-7c90-4846-9d62-e24ed9e69070.png)



## 样式

### CSS Modules

在样式开发过程中，有两个问题比较突出：

- 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；
- 选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标示，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多，最终导致难以维护。

好在 vue 为我们提供了 [scoped](https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles) 可以很方便的解决上述问题。 它顾名思义给 css 加了一个域的概念。

```css
/* 编译前 */
.example {
  color: red;
}

/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```

只要加上 `style scoped` 这样 css 就只会作用在当前组件内了。

> TIP
>
> 使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。



### 目录结构

**vue-h5-template** 所有全局样式都在 `@/src/styles` 目录下设置

```bash
├── styles
│   ├── _animation               # 按钮样式
│   ├── index.scss               # 全局通用样式
│   ├── _mixin.scss              # 全局mixin
│   ├── _transition.scss         # 过渡效果
│   └── variables.scss           # 全局变量
```



## 一次完整的与服务器端交互

在 `vue-h5-template` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1. UI 组件交互操作
2. 调用统一管理的 api service 请求函数
3. 使用封装的 request.js 发送请求
4. 获取服务端返回
5. 更新 data

### request.js

其中，`@/src/utils/request.js` 是基于 Server目录的 http 的二次封装，便于统一处理 POST，GET 等请求方式。具体可以参看项目代码。

```js
...
export class Request {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  async post(options = {}) {
    const { data } = await service({
      method: 'post',
      ...options
    })
    return data
  }
    ...
}

```



### 例子

定义接口地址统一管理 `src/constants/api/test.js`

```js
export const CARDS = '/admin/cards'
```

请求方法 `src/core/interactors/test-interactor.js`

```js
async getTest() {
  try {
    const options = { url: CARDS }
    return await this.service.get(options)
  } catch (error) {
    throw error
  }
}
```

请求方式 `src/utils/request.js`

```js
async get(options = {}) {
   const { data } = await service({
     method: 'get',
     ...options
   })
   return data
}
```

> TIP
>
> 目录结构不要纠结，个人习惯而定



页面使用  `src/pages/test/index.vue`

```js
# 生命周期
async created() {
   if (this.id) {
     await this.handleGetTest()
   }
}

# 请求
async handleGetTest() {
  try {
    const test = await testInteractor.getTest(this.id)
    this.addressInfo = Object.assign({}, test)
  } catch (error) {
    console.log(error)
  }
}
```

可能大家会觉得很繁琐，这么多文件容易搞混，重复编写代码等等，不要着急，本模板配置了自动生成文件，上述除了视图/View层这块需要你手动去编写代码，其他的我们都会去一键生成，接下来我们就来讲讲使用方法。



## 生成所需文件

在开发过程中,无论我们添加页面也好还是添加组件等等。都需要不停地新建 `.vue`文件(或者其他框架或者html/js/css文件) 

以Vue项目为例, 我们新建一个component 或 view 的时候，需要新建一个.vue文件，然后写 `<template>、<script>、<style>`。最后写我们的业务代码。如果使用 class 风格来写 Vue 还需要在每个页面都引入 Vue 和Component

既然这种重复性的工作，而且并没有实际的操作难度，我们是学不到任何东西的，那有没有什么办法可以告别手敲呢， 在这里给大家介绍一个插件 [plop](https://www.npmjs.com/package/plop)，它的使用方式比较简单，在这里我不做过多介绍了，大家可以查阅文档，或者直接拉取本模板进行查阅



本项目中我一个配置了5项，他们分别代表着什么呢？

```js
module.exports = function(plop) {
  plop.setGenerator('page', pageGenerator)        			// Page
  plop.setGenerator('component', componentGenerator)		// 组件
  plop.setGenerator('store', storeGenerator)				// vuex
  plop.setGenerator('interactor', interactorGenerator)		// 业务逻辑
  plop.setGenerator('db-interactor', dbInteractorGenerator)	//db业务逻辑
}
```

> TIP
>
> 创建模板指令是 npm run new，记得属于目录或文件名称哦



## 环境变量与配置文件

### env

```txt
# 移动端控制台  开(yes) | 关(no)
VCONSOLE=no

# 标题
VUE_APP_TITLE=CHINA-GOODS-H5

# 端口号
DEVSERVERPORT=9000

# 错误监控平台
SENTRY_ENABLED=yes
SENTRY_DSN='https://b84aa04e3def4784a471f8032dc62fd4@sentry.io/3619515'
SENTRY_PLUGIN_ENABLED=no
```

### settings

```js
export const TITLE = ''      			// 标题
export const TOKEN_KEY = ''				// token-key
export const LANGUAGE_KEY = 'language'	// 国际化
...
```



## ESLint  .editorconfig

不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。

ESLint 所有的配置文件都在 [.eslintrc.js](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js) 中。 本项目基本规范是依托于 vue 官方的 eslint 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 做了少许的修改。大家可以按照自己的需求进行定制化配置。

代码风格在 .editorconfig，大家可以按照个人喜欢个性化修改。



## 图标 SVG

如果你没有在本项目 Icon 中找到需要的图标，可以到 [iconfont.cn](http://iconfont.cn/) 上选择并生成自己的业务图标库，再进行使用。或者其它 svg 图标网站，下载 svg 并放到文件夹之中就可以了。

![](https://my-wechat.mdnice.com/mdnice/i_am_svg_20191024083453.svg)

## 生成图标库代码

首先，搜索并找到你需要的图标，将它采集到你的购物车里，在购物车里，你可以将选中的图标添加到项目中（没有的话，新建一个），后续生成的资源/代码都是以项目为维度的。

![](https://gw.alipayobjects.com/zos/rmsportal/jJQYzRyqVFBBamUOppXH.png)

**现在本项目支持和推荐单独导出 svg 的引入使用方式。下载方式如下图：**

![](https://wpimg.wallstcn.com/1f8b1e56-cfd9-4ef7-a0aa-dfb0c2883aa3.gif)

下载完成之后将下载好的 .svg 文件放入 `@/icons/svg` 文件夹下之后就会自动导入。



## 更进一步优化自己的svg

已经配置指令，只需要执行相关指令就好：

```sh
npm run svgo
```



## 使用方式

```js
<svg-icon icon-class="password" /> // icon-class 为 icon 的名字
```



## 国际化

本项目集合了国际化 i18n 方案。通过 [vue-i18n](https://github.com/kazupon/vue-i18n)而实现。

由于本项目 ui 框架使用了 `Vant UI`，所以国际化的同时也要将其国际化。同时将当前 `lang` 语言存在 `cookie`之中，为了下次打开页面能记住上次的语言设置。

```js
export const VueVantLocales = (lang = getLocale()) => {
  switch (lang) {
    case 'zh':
      Locale.use('zh-CN', vantZhLocale)
      break
    case 'en':
      Locale.use('en-US', vantEnLocale)
      break
  }
}

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: getLocale(),
  messages
})
```



### 使用

Html 中使用：

```html
// $t 是 vue-i18n 提供的全局方法
$t('heoll')
```

Js 中使用：

```js
const options = [
  {
    value: '1',
    label: this.$t('i18nView.one')
  },
  {
    value: '2',
    label: this.$t('i18nView.two')
  }
]
```



## 样式适配

由于本模板是H5开发模板，所以一定要有样式适配啦。对此目前主流方案有 vw 和 rem，我们来使用一个工具来帮助我们完成屏幕的适配，[postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport)，安装之后我们只需要在 `postcss.config.js` 配置即可，具体配置说明还请查阅文档。



![](https://imgkr.cn-bj.ufileos.com/1fcd1987-36e7-4c17-b211-db5d1b4b28e6.png)



## 调试控制台

在调试方面，本项目使用 `vconsole` 作为手机端调试面板，功能相当于打开 PC 控制台，可以很方便地查看 Console, Network, Element、Storage 等关键调试信息。



<img src="https://imgkr.cn-bj.ufileos.com/a08878bf-ed91-4200-a7c9-a3557c5ce04a.png" style="zoom:67%;" />



 ## 错误监控平台

对别的错误监控平台也不太了解，只记得当时在写 `PHP` 的时候有用过 `sentry`，所以本项目中就配置了它作为错误监控平台。同时使用了这个大佬的插件 [编译时自动在 try catch 中添加错误上报函数的 babel 插件](https://github.com/mcuking/babel-plugin-try-catch-error-report)，相关配置在 `.sentryclirc` 这个文件中，具体相关配置在你创建时就会给出提示。还不清楚的请查阅 [配置sentry](https://www.cnblogs.com/qiezuimh/p/11440506.html)

```js
[defaults]
url=https://sentry.io
org=组织名
project=项目名

[auth]
token=token
```



## GIT 提交风格

代码提交记录是一个很好的代码修改日志。规范的代码提交记录，不管在平时代码开发维护过程中，还是在定位 bug 或者回退版本来说都是极为重要。



### 相关指令

```sh
npm run git-cz
```


![](https://imgkr.cn-bj.ufileos.com/534c0f54-65a1-4387-963b-8961040ce61b.png)



### 详细说明

```
1. Select the type of change that you're committing
选择您要提交的更改类型

# 样式适配

在移动端网页开发时，样式适配始终是一个绕不开的问题。对此目前主流方案有 vw 和 rem（当然还有 vw + rem 结合方案），其实基本原理都是相通的，就是随着屏幕宽度或字体大小成正比变化。因为原理方面的详细资料网络上已经有很多了，就不在这里赘述了，下面主要提供一些这工程方面的工具。

关于 rem，阿里无线前端团队在 15 年的时候基于 rem 推出了 flexible 方案，以及 postcss 提供的自动转换 px 到 rem 的插件 postcss-pxtorem。

关于 vw，可以使用 postcss-px-to-viewport 进行自动转换 px 到 vw。postcss-px-to-viewport 相关配置如下：

```json
"postcss-px-to-viewport": {
  viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
  viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
  unitPrecision: 3,  // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
  selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
  minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
  mediaQuery: false // 媒体查询里的单位是否需要转换单位
}
```

<<<<<<< HEAD
<<<<<<< HEAD
- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置，脚本文件等更新
- chore 非 src 或者 测试文件的更新
- revert commit 回退
```



### 生成 CHANGELOG.md

 也已经配置相关指令：

```sh
npm run genlog
```

就会出现类似与这种的文件格式：

```js
### Features

* 国际化 拦截器 完善模板 ([379b452](https://10.6.30.204/front/china-goods-h5/commits/379b4522f9c0c0a1c282281af68c92c1cca10858))
* 飞入购物车 ([f1a5f2d](https://10.6.30.204/front/china-goods-h5/commits/f1a5f2db2fe6e67e3b5801c26563ba9f089e470b))
```



## PWA

PWA是Progressive Web App的英文缩写， 翻译过来就是渐进式增强WEB应用， 是Google 在2016年提出的概念，2017年落地的web技术。目的就是在移动端利用提供的标准化框架，在网页应用中实现和原生应用相近的用户体验的渐进式网页应用。

- 可以生成桌面小图标，不需要打开浏览器，方便用户访问
- 通过网络缓存提升页面访问速度，达到渐进式的页面甚至离线访问，提升用户体验
- 实现类似app的推送功能，生成系统通知推送给用户

vue 最新脚手架中集成了 `pwa` 的插件，将 `pwa` 的实现变得更加的简单，只需要在 `vue.config.js` 文件中配置 `pwa` 属性就可以自动生成对应的 `service-worker.js` 配置文件，在这不做过多介绍。



## WebPack 配置

### 一些配置说明

```js
# PWA
pwa: {
    name: VUE_APP_TITLE,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: resolve('src/pwa/service-worker.js')
    }
  }

# 别名
configureWebpack: {
    name: VUE_APP_TITLE,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

# 在样式引入时，对于变量的引入，需要在每个文件里都要引入一遍，为了避免每次使用时都需要单独引入一遍的问题，采用了style-resources-loader
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss')
      ]
    }
  },

# vconsole
config.plugin('VConsolePlugin')
 .use(new VConsolePlugin({
	filter: [],
	enable: DEV && VCONSOLE === 'yes'
 }))
.end()

# 引入 lodash  在页面可以直接使用 _.isString() ...
 config.plugin('ProvidePlugin')
  .use(new webpack.ProvidePlugin({
    _: 'lodash'
  }))
  .end()

# 设置 svg-sprite-loader
config.module
  .rule('svg')
  .exclude.add(resolve('src/icons'))
  .end()
config.module
  .rule('icons')
  .test(/\.svg$/)
  .include.add(resolve('src/icons'))
  .end()
  .use('svg-sprite-loader')
  .loader('svg-sprite-loader')
  .options({
    symbolId: 'icon-[name]'
  })
  .end()

# 提交 map 文件
config.plugin('sentryPlugin')
  .use(new SentryPlugin({
    release: version,
    include: path.join(__dirname, './dist/static/js'),
    urlPrefix: '~/vue-h5-template/statis/js',
    ignore: ['node_modules']
  }))
  .end()
```



### 相关插件

- vconsole-webpack-plugin
- @sentry/webpack-plugin

- lodash-webpack-plugin

...



项目中还做了一些细节处理，详情请拉取项目查看，谢谢观看。觉得好可以给颗 star [模板地址](https://github.com/push-over/vue-h5-template) ，会持续更新，有问题可以留言或加我微信 `gao1336650475`





=======
=======
>>>>>>> 19b15606d40955c3f2f75d0f50bf04f9d374e41f
# 表单校验

由于大部分移动端组件库都不提供表单校验，因此需要自己封装, 本项目的表单校验方案是在 async-validator 基础上进行二次封装，代码如下，原理很简单，基本满足需求。

# 移动端 console

在调试方面，本项目使用 VConsole 作为手机端调试面板，功能相当于打开 PC 控制台，可以很方便地查看 console, network, cookie, localStorage 等关键调试信息。

# 错误监控

移动端网页相对 PC 端，主要有设备众多，网络条件各异，调试困难等特点。导致如下问题：

1. 设备兼容或网络异常导致只有部分情况下才出现的 bug，测试无法全面覆盖
2. 无法获取出现 bug 的用户的设备，又不能复现反馈的 bug
3. 部分 bug 只出现几次，后面无法复现，不能还原事故现场


这时就非常需要一个异常监控平台，将异常实时上传到平台，并及时通知相关人员。
相关工具有 sentry，fundebug 等，其中 sentry 因为功能强大，支持多平台监控（不仅可以监控前端项目），完全开源，可以私有化部署等特点，而被广泛采纳。


# DSBridge

DSBridge的主要特点：

- DSBridge真正跨平台，官方同时支持ios和android。
- DSBridge支持同步调用。
- 三端友好；无论是在ios、android或者web，使用起来都非常简单优雅，这一点和WebViewJavascriptBridge相比，简直就是艺术。
- DSBridge为国人项目，有详细中文文档和问题反馈渠道。

DSBridge 是H5页面与Native之间通信的桥梁，它有如下特点：

- 跨平台；同时支持ios和android。
- 双向调用；js可以调用native， native可以调用js
- 不仅支持异步调用，而且页支持同步调用（dsbridge是唯一一个支持同步调用的javascript bridge）
- 支持进度回调，多次返回（常用于文件下载进度、计时器等）
- Android支持腾讯x5内核
- 三端易用；无论是前端还是android或ios，使用都非常简单，极大的降低集成／学习成本


# Svg Icon 图标

这里要使用到 svg-sprite-loader 这个神器了， 它是一个 webpack loader ，可以将多个 svg 打包成 svg-sprite 。

# 国际化

使用vue-i18n实现国际化

# 自动生成代码

在开发过程中,无论我们添加页面也好还是添加组件也好。都需要不停地新建Vue文件(或者其他框架或者html/js/css文件)，这个时候自动生成一些重复的文件结构是很有必要的。

# 规范 git 提交

代码提交记录是一个很好的代码修改日志。规范的代码提交记录，不管在平时代码开发维护过程中，还是在定位 bug 或者回退版本来说都是极为重要。

![](https://user-gold-cdn.xitu.io/2020/3/6/170ab93988c11059?w=1695&h=538&f=png&s=565032)


生成 CHANGELOG


![](https://user-gold-cdn.xitu.io/2020/3/6/170ab941bdbfcba6?w=1189&h=432&f=png&s=59895)


# 分层架构

目前前端开发主要是以单页应用为主，当应用的业务逻辑足够复杂的时候，总会遇到各种各样的问题

## services

Services 层是用来对底层技术进行操作的，例如封装 AJAX 请求,操作浏览器 cookie、locaStorage、indexDB，操作 native 提供的能力（如调用摄像头等），以及建立 Websocket 与后端进行交互等。

## entities 

实体 Entity 是领域驱动设计的核心概念，它是领域服务的载体，它定义了业务中某个个体的属性和方法。区分一个对象是否是实体，主要是看他是否有唯一的标志符（例如 id）

## interactors

Interactors 层是负责处理业务逻辑的层，主要是由业务用例组成。一般情况下 Interactor 是一个单例，它使我们能够存储一些状态并避免不必要的 HTTP 调用，提供一种重置应用程序状态属性的方法


# 其他处理

<<<<<<< HEAD
- 点击网页输入框会导致网页放大
=======
- 点击网页输入框会导致网页放大 
>>>>>>> 19b15606d40955c3f2f75d0f50bf04f9d374e41f
- 唤起键盘后元素被键盘顶起
- 唤起软键盘后会遮挡输入框
- 键盘收回后页面不回落
- webpack 的配置
- ....


开箱即用，适用于 H5 便利开发的一套模板，还不完善，后续会有补充...

[模板地址](https://github.com/push-over/vue-h5-template)
<<<<<<< HEAD
>>>>>>> 19b15606d40955c3f2f75d0f50bf04f9d374e41f
=======
>>>>>>> 19b15606d40955c3f2f75d0f50bf04f9d374e41f
