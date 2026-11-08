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

在 `topics.js` 添加文件名、导航名称、首页标题、简介及分类；同时在 `english-topics.js` 添加对应的英文内容，使用相同的文件名。Eleventy 构建时自动生成中英文首页、主题页面和侧边栏导航。英文版使用独立的概述、步骤与边界说明；修改主题时应同步检查两种语言的技术内容。模板仅供开发参考，不会作为主题页面发布。源文件使用模板语法，需通过 `npm run serve` 或构建后的 `dist/` 查看。

页面共用 `_includes/layouts/` 中的布局、`_includes/parts/` 中的导航与步骤组件、`assets/css/site.css` 中的样式，以及 `assets/js/steps.js` 中的图表和步骤交互。各主题的正文保留在 `docs/` 的 HTML 文件中，步骤和可选的令牌说明放在 `assets/js/topics/`。

## 部署

运行 `npm ci && npm run build`，将 `dist/` 的内容发布为站点根目录。GitHub Pages 可使用 Actions 上传该目录；CloudFront 可使用私有 S3 源站和 OAC，并将默认根对象设为 `index.html`。中文页面位于站点根目录，英文页面位于 `en/`；语言切换保留当前主题。站内链接采用相对路径，支持项目子路径。Mermaid 当前通过 jsDelivr 加载，访问图表需要浏览器能连接该 CDN。
