# 技术原理图解

使用 Eleventy 将主题页面构建为静态网站。输出只包含静态文件，可以部署在 GitHub Pages 或 S3 + CloudFront，不需要运行服务器。

## 本地开发

需要 Node.js 18 或更高版本。

```sh
npm ci
npm run build
npm run serve
```

开发服务器启动后，访问终端显示的地址。`dist/` 是构建产物，不提交到仓库。

## 新增主题与语言

在 `topics.js` 注册语言无关的主题 key、网址和分类 key。中英文分别放在 `locales/zh-CN/` 和 `locales/en/`，两边使用相同结构：`topics.js` 保存导航信息，`content.json` 保存页面标题、导语、整体图、补充卡片和页脚，`steps/` 保存各主题的步骤及可选令牌说明。每种语言的 `index.js` 用相同的主题 key 组装这些内容；新增主题时需要在两边的 `index.js` 中关联步骤文件。补充卡片可以使用 HTML，以保留表格、列表和链接。

新增或修改主题时，同步维护所有支持的语言版本。新增语言时，在 `locales/` 下添加语言目录，提供按主题 key 索引的数据，并在该目录的 `index.js` 配置语言代码、URL 前缀、分类、首页和界面文案，最后在 `locales/index.js` 注册语言；目前构建要求每种语言覆盖所有已登记主题。各语言统一通过 `localized.njk`、`_includes/`、`assets/css/site.css` 和 `assets/js/steps.js` 生成和交互，不需要复制页面模板。源文件需通过 `npm run serve` 或构建后的 `dist/` 查看。

## 部署

运行 `npm ci && npm run build`，将 `dist/` 的内容发布为站点根目录。GitHub Pages 可使用 Actions 上传该目录；CloudFront 可使用私有 S3 源站和 OAC，并将默认根对象设为 `index.html`。中文页面位于站点根目录，英文页面位于 `en/`；语言切换保留当前主题。站内链接采用相对路径，支持项目子路径。Mermaid 当前通过 jsDelivr 加载，访问图表需要浏览器能连接该 CDN。
