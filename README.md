# ht-editor

基于wandEditor二次开发


# 安装
npm i ht-editor

# 使用
- 在main.js 引入
```javascript

import HtEditor from 'ht-editor';
Vue.use(HtEditor);

```
 
- 在组件中引出
```vue
<ht-editor edit-id="test" v-model="content"></ht-editor>
```

# 属性
| 名称 | 类型 | 必填 | 默认值 | 说明 | 
| --- | --- | --- | --- |---|
| editId | string | 必填 | 无 | 编辑器ID | 
| content | string | | "" | 内容，为html代码 |
| width | string/number | | 820 | 编辑器宽 |
| height | string/number | | 450 | 编辑器高 |
| baseUrl | string | | “”| 图片服务器访问链接 |

