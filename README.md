> 本项目以基于 vue-cli4 和 Vant-ui 搭建的，进行移动端开发中的一些最佳实践方案

[模板地址](https://github.com/push-over/vue-h5-template)

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

- 点击网页输入框会导致网页放大 
- 唤起键盘后元素被键盘顶起
- 唤起软键盘后会遮挡输入框
- 键盘收回后页面不回落
- webpack 的配置
- ....


开箱即用，适用于 H5 便利开发的一套模板，还不完善，后续会有补充...

[模板地址](https://github.com/push-over/vue-h5-template)
