---
name: wl-git-commit
description: >-
  Winter Light ERP 仓库 Git 提交与 PR 说明规范：Conventional Commits 类型前缀
  保留英文，subject 与 body 一律中文。在用户要求提交代码、写 commit message、
  创建 PR、或提到 feat/fix/docs 提交说明时使用。
---

# Winter Light Git 提交说明规范

## 何时使用

- 用户要求 `git commit`、提交代码、写提交说明
- 创建 Pull Request 的标题与正文
- 评审或改写不符合规范的 commit message

**仅在用户明确要求提交时执行 commit**；本 skill 只规定**怎么写**。

---

## 格式

```
<type>(<scope>): <中文简述>

<中文正文，可选，说明原因与影响>
```

| 部分 | 语言 | 说明 |
|------|------|------|
| `type` | **英文** | 固定关键字，见下表 |
| `scope` | 英文小写 | 可选；模块名，如 `sales`、`inventory`、`finance` |
| subject | **中文** | 一句说清「做了什么」，≤ 72 字，句末不加句号 |
| body | **中文** | 可选；说清「为什么」，完整句子 |

**禁止**：subject/body 用英文（类型前缀除外）；`WIP`、`update`、`fix bug` 等模糊表述。

---

## type 对照表（前缀英文，含义中文）

| type | 中文含义 | 何时使用 |
|------|----------|----------|
| `feat` | 新功能 | 用户可感知的新能力、新页面、新流程 |
| `fix` | 缺陷修复 | 修 bug、纠错、恢复预期行为 |
| `docs` | 文档 | README、Skill、注释说明（不改运行逻辑） |
| `style` | 样式 | 代码格式、缩进、分号（不改逻辑） |
| `refactor` | 重构 | 结构调整、提取模块，不改外部行为 |
| `perf` | 性能 | 提速、减包、减渲染开销 |
| `test` | 测试 | 新增或修改测试 |
| `build` | 构建 | 打包、CI、依赖版本 |
| `ci` | 持续集成 | 流水线配置 |
| `chore` | 杂务 | 不影响 src 的维护性改动（如 gitignore） |
| `revert` | 回滚 | 撤销某次提交 |

不确定时：**修问题用 `fix`，加能力用 `feat`，只动文档用 `docs`**。

---

## scope 建议

| scope | 范围 |
|-------|------|
| `sales` | 销售订单、报价、出库 |
| `inventory` | 物料、仓库、库存流水 |
| `finance` | 应收应付、对账 |
| `system` | 组织、权限、字典 |
| `dashboard` | 工作台 |
| `layout` | 管理端壳层、导航 |
| `deps` | 依赖升级（也可用 `build`） |

scope 可省略；改动集中在一个 feature 时**建议写上**。

---

## 示例

```
feat(sales): 销售订单列表支持按客户筛选

fix(inventory): 修复低库存预警数量未刷新

docs: 补充 Git 提交规范与 Husky 门禁
```

---

## Husky 自动门禁

`pnpm install` 后 Husky 会注册 Git hooks（见 `.cursor/rules/git-hooks.mdc`）：

| 阶段 | 检查 |
|------|------|
| `pre-commit` | `pnpm run typecheck` |
| `commit-msg` | commitlint（`commitlint.config.js`，允许中文 subject） |

本地可先自测：

```bash
pnpm run typecheck
echo "feat(sales): 示例说明" | pnpm exec commitlint
```

**禁止** Agent 默认使用 `git commit --no-verify`；仅用户明确要求时方可跳过。

---

## 增量提交

多步骤改动**按任务拆成少量多次 commit**。细则见 `.cursor/rules/incremental-commits.mdc`。

---

## 提交前检查清单

1. `git status` / `git diff` 看清本次变更范围
2. 不提交 `.env`、密钥、本地路径等敏感文件
3. subject 用**中文**写「做了什么」（须通过 commitlint）
4. 需要时说清**为什么**（body，中文）
5. `pnpm run typecheck` 通过（pre-commit 会自动执行）
6. 提交后 `git status` 确认干净（除非故意留未提交文件）

---

## Pull Request

- **标题**：与 commit subject 同风格，`type(scope): 中文简述`
- **Summary / 测试计划**：中文，完整句子

---

## 项目 Skill 文档语言

本仓库 `.cursor/skills/` 下 Skill 正文与 description **一律使用中文**；代码标识符、API 名、文件路径、commit type 前缀（`feat`/`fix` 等）保持英文。

## 禁止

- 未经用户要求自动 `git push`
- `git commit --amend` 除非用户明确要求且符合安全协议
- `--no-verify` 跳过 hook（除非用户明确要求）
