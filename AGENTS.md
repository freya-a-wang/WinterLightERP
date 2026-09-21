## Learned User Preferences

- 这是正式业务工程，不要把教学、demo 或练习本代码写进本仓库。
- 带 `t7` 的 skill/规则不要拷进本仓库；本仓库只用 `wl-*` 前缀。
- 只说「配置」时不要顺手部署。
- 用户未要求时不要 `git push`；未明确说提交时不要 commit。
- 接口替换先对齐对照、确认范围后再改代码。

## Learned Workspace Facts

- 前端栈：React + TypeScript + Less Modules + Vite。
- UI 与数据层：antd、react-router-dom、@tanstack/react-query、zustand、ahooks、dayjs。
- 路径别名 `@/` 指向 `src/`。
- 提交规范：Conventional Commits，type 英文、subject 中文；Husky pre-commit 跑 typecheck，commit-msg 跑 commitlint。
- 工作台当前使用 `features/dashboard/lib/mockDashboard.ts`，接入真实接口时只替换该层。
