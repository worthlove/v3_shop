module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: [
    '🎉 init', '✨ feat', '🐛 fix', '📝 docs', '🎨 style', '💄 UI', '📸 image', '🔊 add_log', '🔖 rm_log', '➕ add_dep', '➖ rm_dep', '🗑️ remFile', '🚚 move', '🔀 merge', '💩 poop', '🚧 wip', '👷 ci', '📦️ build', '🙈 ignore', '💡 comment:', '🔄 refactor', '🚀 perf', '✅ test', '↩️ revert', '🏹release', '🛠 chore'
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  types: [
    {name: "🎉 开始(init):            项目初始化", value: "🎉 init", emoji: "🎉"},
    {name: "✨ 特性(feat):            新增功能", value: "✨ feat", emoji: "✨"},
    {name: "🐛 修复(fix):              修复缺陷", value: "🐛 fix", emoji: "🐛"},
    {name: "📝 文档(docs):            文档变更", value: "📝 docs", emoji: "📝"},
    {name: "🎨 格式(style):           代码格式（不影响功能，例如空格、分号等格式修正）", value: "🎨 style", emoji: "🎨"},
    {name: "👷 集成(CI):              修改 CI 配置、脚本", value: "👷 ci", emoji: "👷"},
    {name: "📦️ 构建(build):           构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", value: "📦️ build", emoji: "📦️"},
    {name: "🙈 忽略(ignore):          忽略文件 | 忽略", value: "🙈 ignore", emoji: "🙈"},
    {name: "💡 注释(comment):         注释说明", value: "💡 comment:", emoji: "💡"},
    {name: "🔄 重构(refactor):        代码重构（不包括 bug 修复、功能新增）", value: "🔄 refactor", emoji: "🔄"},
    {name: "🚀 性能(perf):            性能优化", value: "🚀 perf", emoji: "🚀"},
    {name: "✅ 测试(test):            添加疏漏测试或已有测试改动", value: "✅ test", emoji: "✅"},
    {name: "↩️ 回退(revert):          回滚 commit", value: "↩️ revert", emoji: "↩️"},
    {name: "💄 界面(UI):              UI 调整 | UI 更新", value: "💄 UI", emoji: "💄"},
    {name: "📸 图片(image):           图片", value: "📸 image", emoji: "📸"},
    {name: "🔊 日志(add_log):         添加日志 | 日志", value: "🔊 add_log", emoji: "🔊"},
    {name: "🔖 日志(rem_log):         移除日志 | 日志", value: "🔖 rm_log", emoji: "🔖"},
    {name: "➕ 依赖(add_dep):         添加依赖", value: "➕ add_dep", emoji: "➕"},
    {name: "➖ 依赖(rem_dep):         移除依赖", value: "➖ rm_dep", emoji: "➖"},
    {name: "🗑️ 文件(rem_file):         删除文件", value: "🗑️ remFile", emoji: "🗑️"},
    {name: "🚚 移动(move_file):        移动文件 | 移动", value: "🚚 move", emoji: "🚚"},
    {name: "🔀 合并(merge):           合并分支 | 合并", value: "🔀 merge", emoji: "🔀"},
    {name: "💩 优化(poop):            写了一些屎一样待优化的代码", value: "💩 poop", emoji: "💩"},
    {name: "🚧 工作(wip):             正在开发中", value: "🚧 wip", emoji: "wip"},
    {name: "🏹 发布(release):         发布", value: '🏹release', emoji: '🏹'},
    {name: "🛠️ 其他(chore):           对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", value: "🛠️ chore", emoji: "🛠️"}
  ],
  // scope 类型（定义之后，可通过上下键选择）
  // // 定义一个包含提交范围选项的数组
  scopes: [
    // 初始化相关
    ['initialCommit', '初始化提交'],
    // 文件相关(移除、添加
    ['file', '项目文件 (移除、添加、移动)'],
    // git相关
    ['git', 'git操作 (合并、回退)'],
    // 日志相关
    ['log', '项目日志 (console、debugger)'],
    // 组件相关的修改
    ["components", "组件相关(组件封装)"],
    // hook 相关的修改
    ["hooks", "hook 相关"],
    // utils 相关的修改
    ["utils", "utils 相关(工具函数)"],
    // 对 element-ui 的调整
    ["elementPlus", "对 element-plus 的调整"],
    // 样式相关的修改
    ["styles", "样式相关"],
    // 项目依赖相关的修改
    ["deps", "项目依赖"], ,
    // 测试相关
    ['test', '测试相关(添加疏漏测试或已有测试改动)'],
    // CI相关
    ['ci', 'CI 相关 (修改 CI 配置、脚本)'],
    // 其他类型的修改
    ["other", "其他修改"],
    
    // 自定义范围选项，如果选择此项，用户需要输入自定义的 scope
    // ["custom", "以上都不是？我要自定义"]
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),
  
  
  messages: {
    // 提示选择提交类型
    type: '确保本次提交遵循：前端代码规范！请选择要提交的更改类型：',
    scope: "选择一个 scope（可选）：", // 选择 scope: custom 时会出下面的提示
    // 提示选择影响的范围
    customScope: '请输入自定义的 scope：',
    // 提示输入简短的描述
    subject: '填写简短精炼的变更描述：',
    // 提示输入详细描述
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    // 提示输入破坏性变更
    breaking: '列举非兼容性重大的变更（可选）使用 "|" 换行：\n',
    // 提示输入关闭的 issue
    footer: '列举出关联 ISSUES CLOSED（可选）。 例如: #31, #34： \n',
    generatingByAI: '正在通过 AI 生成你的提交简短描述...',
    generatedSelectByAI: '选择一个 AI 生成的简短描述:',
    // 确认提交信息
    confirmCommit: '是否确认提交commit？(y/n/e/h)\n',
  },
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ["feat", "fix"],
  // 跳过要询问的步骤
  skipQuestions: ["body", "footer"],
  subjectLimit: 100, // subject 限制长度
  breakLineChar: "|", // 换行符，支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
  useEmoji: true,
  emojiAlign: "center",
  useAI: false,
  aiNumber: 1,
  themeColorCode: "",
  allowCustomScopes: true, // 允许自定义 scopes
  allowEmptyScopes: true, // 允许 scope 为空
  customScopesAlign: "bottom",
  customScopesAlias: "custom",
  emptyScopesAlias: "empty",
  upperCaseSubject: false, // 使用大写字母开头的 subject
  markBreakingChangeMode: false, // 使用特殊字符标记破坏性变更
  breaklineNumber: 100,
  breaklineChar: "|",
  issuePrefixes: [
    {value: "closed", name: "closed:   ISSUES has been processed"}
  ],
  customIssuePrefixAlign: "top",
  emptyIssuePrefixAlias: "skip",
  customIssuePrefixAlias: "custom",
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  scopeOverrides: undefined,
  defaultBody: "",
  defaultIssues: "",
  defaultScope: "",
  defaultSubject: ""
}
