// let i = 0
// const fs = require('fs')
const utils = require('./const.js')
const { COMPONENT_PATTERN, STATEMENT_PATTERN, hyphenate } = utils
// 将使用到的组件名转换为import语句
const tranformToStatement = (arr, isCss) =>
  arr.map((v) => {
    const name = hyphenate(v)
    return isCss
      ? `@import "~element-ui/lib/theme-chalk/${name}"`
      : `import ${v} from 'element-ui/lib/${name}'`
  })

module.exports = function(source) {
  // 找到import语句
  try {
    let import_statement = (source.match(STATEMENT_PATTERN) || [])[0]
    // 替换import语句
    if (import_statement) {
      let arr = source.match(COMPONENT_PATTERN)[0].split(',')
      arr = arr.map((v) => v.replace(/\n/g, '').trim())
      // 替换 import 语句
      source = source.replace(
        import_statement,
        tranformToStatement(arr).join('\n')
      )
      // 增加样式引入
      source = `
${source}
<style lang='scss' scoped>
::v-deep {
\t\t${tranformToStatement(arr, true).join(';\n\t\t')};
${
  arr.includes('DatePicker')
    ? '@import "~element-ui/lib/theme-chalk/button";'
    : ''
}
${
  arr.includes('Pagination')
    ? '@import "~element-ui/lib/theme-chalk/select";'
    : ''
}
${arr.includes('Table') ? '@import "~element-ui/lib/theme-chalk/tooltip";' : ''}
}
</style>
<style lang='scss'>
    $--font-path: "~element-ui/lib/theme-chalk/fonts";
    @import "~element-ui/packages/theme-chalk/src/base.scss";
    ${
      arr.includes('Dialog')
        ? '@import "~element-ui/lib/theme-chalk/dialog";'
        : ''
    }
</style>
`
    }
  } catch (e) {
    return source
  }
  // fs.writeFileSync('qwe/' + i, source)
  // i++
  return source
}
