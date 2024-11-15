module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      ['🎉 init','✨ feat','🐛 fix','📝 docs','🎨 style','💄 UI','📸 image','🔊 add_log','🔖 rm_log','➕ add_dep','➖ rm_dep','🗑️ remFile','🚚 move','🔀 merge','💩 poop','🚧 wip','👷 ci','📦️ build','🙈 ignore','💡 comment:','🔄 refactor','🚀 perf','✅ test','↩️ revert','🏹release','🛠 chore']
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
