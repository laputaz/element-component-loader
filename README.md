# element-component-loader

## 说明

因为某些原因, 不使用官方的 `babel-component-plugin`,  所以写了一个`webpack`的`loader`;

将
```html
<script>
  import { xx } from 'element-ui'
  ...
  ...
</script>
```
转换为如下语句:

```html
<!-- in script-->
<script>
  import xx from 'element-ui/lib/xx'
  ...
  ...
</script>

<!-- in style 不需要 scoped-->
<style lang="scss">
   $--font-path: "~element-ui/lib/theme-chalk/fonts";
   @import "~element-ui/packages/theme-chalk/src/base.scss";
   @import "~element-ui/lib/theme-chalk/xx"
</style>

<!-- in style 需要 scoped-->
<style lang="scss" scoped>
  ::v-deep{
     @import "~element-ui/lib/theme-chalk/xx"
  }
</style>
```

## 使用

in vue-cli =>  `vue-config.js`
```javascript
chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('element-component-loader')
      .loader('./build/element-component-loader.js')
      .end()
}
```
生成的`webpack配置`
```javascript
 module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          ...
          ...
          {
            loader: 'xx/xx/element-component-loader.js'
          }
        ]
      }
```
