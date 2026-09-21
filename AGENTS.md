## Learned User Preferences

- 这是正式业务工程，不要把教学、demo 或练习本代码写进本仓库。
- 不要整包拷贝 morningSkin 或带 `t7` 的 skill/规则；只适配适合本仓库的部分，本仓库只用 `wl-*` 前缀。
- 只说「配置」时不要顺手部署。
- 用户未要求时不要 `git push`；未明确说提交时不要 commit。
- 接口替换先对齐对照、确认范围后再改代码。

## Learned Workspace Facts

- 前端栈：React + TypeScript + Less Modules + Vite。
- UI 与数据层：antd、react-router-dom、@tanstack/react-query、zustand、ahooks、dayjs。
- 路径别名 `@/` 指向 `src/`。
- 提交规范：Conventional Commits，type 英文、subject 中文；Husky pre-commit 跑 `check:branch` + typecheck，commit-msg 跑 commitlint。
- 任务分支命名 `<type>/<描述>`（小写 kebab-case）；长期/环境分支 `main`/`test` 无需前缀；个人开发用 `feature/<slug>`，禁止无前缀短名。
- 业务目录与路由 path 对齐：`/sales` → `features/sales/`，`/login` → `features/login/`；模块接口放 `features/<route>/api/`；`src/api/` 仅通用 HTTP；`src/stores/` 仅跨路由会话；`queryKeys` 顶层 key 与路由目录同名。
- 环境变量保底三套：`.env.development`（dev）、`.env.test`（test）、`.env.production`（prod）。本机覆盖用已 gitignore 的 `.env.local` / `.env.*.local`。
- 会话写入 sessionStorage（刷新保留、关标签清除）；接口信封 `{ code, data, message }`，`code === 0` 为成功。
- 工作台当前使用 `features/dashboard/api/mockDashboard.ts`，接入真实接口时只替换该层。
- GitHub 远程：`git@github.com:freya-a-wang/WinterLightERP.git`
