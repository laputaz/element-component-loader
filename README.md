# element-component-loader

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
