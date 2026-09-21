# Winter Light ERP

Winter Light ERP 前端工程：React + TypeScript + Less + Vite。当前为可运行的管理端脚手架，工作台使用 mock 数据演示数据分层。

## 本地启动

```bash
pnpm install
pnpm dev
```

开发时接口前缀默认是 `/api`，由 Vite 代理到 `VITE_DEV_PROXY_TARGET`（默认 `http://127.0.0.1:8080`）。可复制 `.env.example` 为 `.env.local` 覆盖本地配置。

其它命令：

```bash
pnpm run typecheck
pnpm run lint
pnpm build
```

## 技术栈

| 层 | 选型 |
|----|------|
| 构建 | Vite + TypeScript + Less Modules |
| UI | Ant Design 6 |
| 路由 | react-router-dom |
| 远程数据 | TanStack React Query |
| 会话状态 | Zustand |
| 交互 hook | ahooks |
| 日期 | dayjs |

## 目录

```
src/
  app/                 根组件与路由
  layouts/             管理端壳层
  features/            业务模块（dashboard / sales / inventory / finance / system）
  components/          跨模块共享 UI
  lib/                 queryClient、dayjs、appMessage
  stores/              Zustand 会话
  api/                 HTTP 与 ApiError
  styles/              全局 token
```

## 工程约定

提交说明：**type 英文、subject 中文**，例如 `feat(sales): 销售订单列表支持按客户筛选`。

任务分支：**`<type>/<描述>`**，例如 `feature/sales-order-list`。长期 / 环境分支 `main`、`test` 无需前缀。

`pnpm install` 后会通过 Husky 注册：

- `pre-commit`：`pnpm run check:branch` + `pnpm run typecheck`
- `commit-msg`：commitlint

细则见 `.cursor/rules/` 与 `.cursor/skills/`。
