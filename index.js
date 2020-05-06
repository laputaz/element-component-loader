//let i = 0
//const fs = require('fs')

// 正则匹配用到的组件
const component_pattern = /(?<=import\s{)[^}{]+(?=}\s+from\s+['"]+element-ui['"]+)/g
// 正则匹配import element-ui的语句
const statement_pattern = /import {[^}{]+}\sfrom\s['"]element-ui['"]/g
// 驼峰转中划线
const hyphenateRE = /\B([A-Z])/g
// 驼峰转中划线方法
const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
// 将使用到的组件名转换为import语句
const tranformToStatement = (arr, isCss) =>
  arr.map((v) => {
    const name = hyphenate(v.replace(/\n/g, '').trim())
    return isCss
      ? `@import "~element-ui/lib/theme-chalk/${name}"`
      : `import ${v} from 'element-ui/lib/${name}'`
  })

module.exports = function(source) {
  // 找到import语句
  try {
    let import_statement = (source.match(statement_pattern) || [])[0]
    //   console.log(import_statement)
    // 替换import语句
    if (import_statement) {
      let arr = source.match(component_pattern)[0].split(',')
      arr = arr.map((v) => v.replace(/\n/g, '').trim())
      source = source.replace(
        import_statement,
        tranformToStatement(arr).join('\n')
      )
      // 引入样式
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
