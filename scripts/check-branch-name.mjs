/**
 * 校验 Git 分支名：<type>/<描述>
 * 长期 / 环境分支 main、master、test 放行
 */
import { execSync } from 'node:child_process'

const LONG_LIVED = new Set(['main', 'master', 'test'])
const TYPE_RE =
  /^(?:feature|feat|fix|bugfix|hotfix|release|docs|chore|refactor|perf|test|ci|build|style)/
const BRANCH_RE = new RegExp(`${TYPE_RE.source}\\/[a-z0-9]+(?:[._-][a-z0-9]+)*$`)

function readBranch() {
  const fromCi =
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME ||
    process.env.CI_COMMIT_REF_NAME

  if (fromCi) {
    return fromCi.trim().replace(/^refs\/heads\//, '')
  }

  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
  } catch {
    console.error('无法读取当前分支名')
    process.exit(1)
  }
}

const branch = readBranch()

if (!branch || branch === 'HEAD') {
  process.exit(0)
}

if (LONG_LIVED.has(branch) || BRANCH_RE.test(branch)) {
  process.exit(0)
}

console.error(`分支名不符合规范：${branch}`)
console.error('请使用 <type>/<描述>，例如 feature/sales-order-list、fix/login-redirect')
console.error(
  'type：feature、feat、fix、bugfix、hotfix、release、docs、chore、refactor、perf、test、ci、build、style'
)
console.error('<描述> 限小写英文、数字，单词间用 -（可用 _ 或 .）')
console.error('长期 / 环境分支仅允许：main、master、test')
process.exit(1)
