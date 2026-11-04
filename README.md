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

## 新增主题

从 `templates/template.html` 复制出新的 `docs/` 下的 HTML 文件，替换页面元数据、整体图和补充卡片。将 `templates/template.js` 复制到 `assets/js/topics/` 作为新主题数据文件，替换所有示例步骤，并将页面元数据中的 `topicScript` 和 `permalink` 改为新文件名。按项目规范检查图文与交互。

在 `topics.js` 注册与语言无关的主题 key、页面文件名和分类 key；在 `locales/zh-topics.js` 与 `locales/en-topics.js` 中分别用同一个主题 key 添加中文和英文内容。中文页面正文及步骤数据仍分别位于 `docs/` 和 `assets/js/topics/`；英文正文和步骤数据在 `locales/en-topics.js`。修改主题时应同步检查已有译文。没有译文的主题不会出现在该语言的导航中，语言切换器也不会提供指向缺失页面的链接。

## 新增语言

在 `locales/` 添加以主题 key 为索引的译文数据文件，并在 `locales/index.js` 注册语言代码、单层 URL 前缀、显示名称、分类名称、首页文案和 `ui` 界面文案。译文内容使用与英文相同的数据结构，可以先只翻译部分主题。构建时 `localized.njk` 根据语言配置生成首页和已翻译的主题页，共用布局、导航和交互，不需要为每种语言复制模板或修改交互代码。添加语言需要提供实际译文，不会自动翻译。

模板仅供开发参考，不会作为主题页面发布。源文件使用模板语法，需通过 `npm run serve` 或构建后的 `dist/` 查看。

页面共用 `_includes/layouts/` 中的布局、`_includes/parts/` 中的导航与步骤组件、`assets/css/site.css` 中的样式，以及 `assets/js/steps.js` 中的图表和步骤交互。各主题的正文保留在 `docs/` 的 HTML 文件中，步骤和可选的令牌说明放在 `assets/js/topics/`。

## 部署

运行 `npm ci && npm run build`，将 `dist/` 的内容发布为站点根目录。GitHub Pages 可使用 Actions 上传该目录；CloudFront 可使用私有 S3 源站和 OAC，并将默认根对象设为 `index.html`。中文页面位于站点根目录，英文页面位于 `en/`；语言切换保留当前主题。站内链接采用相对路径，支持项目子路径。Mermaid 当前通过 jsDelivr 加载，访问图表需要浏览器能连接该 CDN。
