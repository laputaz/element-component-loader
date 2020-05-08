// 正则匹配用到的组件
const COMPONENT_PATTERN = /(?<=import\s{)[^}{]+(?=}\s+from\s+['"]+element-ui['"]+)/g
// 正则匹配import element-ui的语句
const STATEMENT_PATTERN = /import {[^}{]+}\sfrom\s['"]element-ui['"]/g
// 驼峰转中划线
const HYPHENATE_PATTERN = /\B([A-Z])/g
// 驼峰转中划线方法
const hyphenate = (str) => {
  return str.replace(HYPHENATE_PATTERN, '-$1').toLowerCase()
}

module.exports = {
  COMPONENT_PATTERN,
  STATEMENT_PATTERN,
  HYPHENATE_PATTERN,
  hyphenate
}
