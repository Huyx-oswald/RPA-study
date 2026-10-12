---
name: "github-pages-deploy"
description: "Deploy/overwrite static site files (HTML/CSS/JS) to a GitHub Pages repo via shallow-clone → overwrite → commit → push. Invoke when user asks to push/update the tutorial site to GitHub or confirm GitHub Pages deployment."
---

# GitHub Pages 静态站点部署

将本地工作区的静态站点文件同步到 GitHub Pages 仓库 main 分支的标准化流程。

## 适用场景

- 用户要求"推送到 GitHub"、"更新网站"、"发布到 Pages"
- 本地 HTML/CSS/JS 文件修改后需要覆盖远端同名文件
- 仓库重命名后需要更新远端地址或 README

## 前置约定

- 站点源码目录（如 `/workspace/<project>/`）与远端仓库根目录一一对应：`*.html` 在根、静态资源在 `assets/`
- **不要在仓库内新建子文件夹**：Pages 从 main 根目录直接服务，嵌套文件夹会产生重复文件和错误路径
- 缓存破坏：修改 CSS/JS 后，将 HTML 中引用的版本号统一递增，如 `?v=YYYYMMDDa` → `?v=YYYYMMDDb`，所有页面和文件保持一致
- 认证依赖环境已配置的 `gh`（`GH_TOKEN`）；先 `gh auth status` 确认登录

## 部署步骤

1. **浅克隆远端 main 到临时目录**（避免污染工作区）：
   ```bash
   cd /tmp && rm -rf <tmp-name> && gh repo clone <owner>/<repo> <tmp-name> -- --depth 1 -b main
   ```
2. **覆盖文件**：把源码目录的 `*.html`、`README.md`、`.nojekyll` 和 `assets/*` 复制进克隆目录（用 `cp -f` 覆盖，不新建目录）。
3. **校验**：`wc -c *.html assets/*` 确认文件大小非 0 且符合预期。
4. **提交并推送**：
   ```bash
   cd <tmp-name>
   git config user.email "<owner>@users.noreply.github.com"
   git config user.name "<owner>"
   git add -A
   git status --short          # 人工核对变更文件清单
   git commit -m "<分类: 摘要，正文可列要点>"
   git push origin main
   ```
5. **线上验证**：
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://<owner>.github.io/<repo>/
   ```
   返回 200 即部署成功（Pages 有 1-2 分钟构建延迟，刚推送可稍候重试）。
6. 清理临时目录 `rm -rf /tmp/<tmp-name>`。

## 关键规则

- **只覆盖，不建目录**：若发现仓库出现与根目录重复的子文件夹（如误推了一层项目名目录），在克隆目录中 `git rm -r` 删除该子文件夹后提交
- **提交信息**用 conventional 风格（`feat:`/`fix:`/`docs:`/`重构：`等），正文用要点列出页面级变更
- 推送前向用户报告 `git status` 的变更清单，避免误提交无关文件
- 不要主动 `git commit` 除非用户明确要求推送

## 仓库重命名相关

- `gh repo rename` 需要 token 具备 Administration 权限；细粒度 token（`ghu_` 开头且 scopes 为空）会返回 **HTTP 403**，此时让用户在 GitHub 网页 Settings → Repository name 手动重命名
- 重命名后验证：`gh repo view <owner>/<new-name> --json name,url`；旧 github.com 链接自动重定向
- **Pages 网址不随重命名重定向**：旧 `https://<owner>.github.io/<old-name>/` 会 404，必须更新 README/分享链接为新地址
- 新地址校验：`curl -s -o /dev/null -w "%{http_code}" https://<owner>.github.io/<new-name>/`

## 常见问题

| 现象 | 处理 |
|------|------|
| HTTP 403 on rename/push | token 权限不足；重命名走网页，push 检查 token 的 contents 写权限 |
| Pages 404（刚推送） | 等待 1-2 分钟构建；确认根目录有 index.html 和 .nojekyll |
| 样式/脚本未更新 | HTML 中 `?v=` 版本号未递增或多页面版本号不一致 |
| 仓库出现重复子文件夹 | `git rm -r <子文件夹>` 后提交，根目录保留唯一一份文件 |
