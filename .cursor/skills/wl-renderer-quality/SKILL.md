---
name: wl-renderer-quality
description: >-
  Winter Light ERP 代码质量与封装规范：单文件 500 行上限、ComponentName/index.tsx 目录结构、
  组件/hook/工具拆分规则。重构大页面、提取共享 UI、新功能开发或用户提到代码质量、
  行数限制、封装时使用。
---

# 代码质量与封装规范

## 何时使用

- 新增/修改 `src/` 下的页面、组件、hooks
- 拆分超过行数上限的文件
- 提取共享 UI
- 评审 PR 或做封装重构

数据分层细则仍遵守 `.cursor/rules/data-layer.mdc` 及 `ahooks` / `react-query` / `zustand` 子规则。本 skill 侧重**结构与体量**。

---

## 文件行数（硬约束）

| 类型 | 上限 | 建议 |
|------|------|------|
| 任意 `.ts` / `.tsx` | **500 行** | 超过即必须拆分，不得继续堆逻辑 |
| 页面 `index.tsx` | 300 行 | 超出则拆子组件 + hooks |
| 展示组件 `index.tsx` | 150 行 | 超出考虑拆 markup / 子块 |
| 自定义 hook | 120 行 | 超出按职责拆多个 hook |
| `index.module.less` | 250 行 | 超出拆子组件样式或共享 less |

**检查方式**（改完后执行）：

```bash
pnpm run typecheck
```

---

## 目录与命名

### 页面 / 组件

```
FeatureName/
  index.tsx
  index.module.less    # 有样式时
  components/
    SubComponent/
      index.tsx
      index.module.less
```

- 文件夹名 = 组件名（PascalCase），入口固定 `index.tsx`，样式固定 `index.module.less`
- **禁止** 与文件夹同名的 `HomePage.tsx` 与 `HomePage/index.tsx` 并存
- 跨 feature 共享 UI → `src/components/`
- feature 内私有组件 → `features/<feature>/components/`
- hooks → `features/<feature>/hooks/` 或 `src/hooks/`（跨 feature 时）
- 纯函数 / 常量 → `lib/`、`constants.ts`、`types.ts`

### 导入

- 样式：`import styles from './index.module.less'`
- 目录导入：`import X from '../components/X'`（解析到 `index.tsx`）
- 路径别名：`@/...`（与 `tsconfig.app.json` 一致）

---

## 封装决策（何时抽什么）

### 抽共享组件

满足任一即抽：

1. 相同 UI 结构出现 **≥ 2 次**
2. 单块 JSX **> 80 行** 且可独立命名
3. 样式类名重复

落点：`src/components/<Name>/index.tsx`

### 抽自定义 Hook

| 逻辑类型 | 做法 |
|----------|------|
| 远程**读取** | `useQuery` + `queryKeys`（可包一层 `useXxxQuery`） |
| **写入** + 刷新 | `useMutation` + `invalidateQueries` |
| 防抖搜索 | `useDebounceFn` |
| 稳定回调 | `useMemoizedFn` |
| 弹窗开关 | `useBoolean` |

**禁止**：页面内 `useState` + `useEffect` 手写拉列表（用 React Query）。

### 抽工具 / 服务

满足任一即抽：

1. 纯函数重复 **≥ 2 次**
2. 常量配置 **> 30 行** 堆在页面顶部
3. 与 UI 无关的业务规则

落点：

- 跨 API：`api/`
- 跨 feature：`lib/`
- feature 内：`features/<feature>/lib/`、`constants.ts`

---

## 注释与语义化命名

- **变量 / 函数**：动词或动词短语表行为，名词表数据
- **布尔值**：`is` / `has` / `can` 前缀
- **组件**：PascalCase，体现 UI 职责
- **Hook**：`use` + 领域 + 职责
- **类型**：语义明确，避免 `Data`、`Info` 等泛化名

新增或修改代码时**必须**带简约注释：

1. **导出的函数 / Hook / 组件**：声明上一行用一行 `/** ... */` 说明**做什么**
2. **非显而易见的业务规则**：简短行内或块注释
3. **禁止**：复述代码字面意思、大段注释、每个变量都注释
4. **语言**：中文为主；代码标识符、API 名保持英文

### 时间处理

- 统一使用 **dayjs**，入口：`@/lib/dayjs`
- 禁止直接使用 `new Date()`、`Date.now()`、`toLocaleTimeString()` 做格式化或比较

---

## 代码质量要求

### 必须

- [ ] `pnpm run typecheck` 通过
- [ ] 单文件 ≤ 500 行
- [ ] 新组件遵循 `Folder/index.tsx` 结构
- [ ] 导出符号有一行简约注释（函数 / Hook / 组件）
- [ ] 命名语义化，布尔用 is/has/can 前缀
- [ ] 错误提示用 `appMessage.error(error, feedbackMessages.xxx)` 或 `getErrorMessage`，禁止直接 `antd message`

### 禁止

- 为抽而抽：一行 helper 不要单独文件
- 过度抽象：无第二处复用点不提前建 `components/`
- 在 skill 未要求时批量改无关文件

---

## 拆分大文件的标准流程

1. **读**目标文件，标出：常量块、工具函数、独立 UI 区块、可抽 hook 的状态
2. **先外提**无 JSX 部分 → `constants.ts` / `lib/*.ts`
3. **再抽 hooks** → 数据与副作用
4. **再拆组件** → 每块一个文件夹 `index.tsx`
5. **最后**页面只保留布局编排与 wiring
6. **跑** `typecheck`，确认行数 < 500
