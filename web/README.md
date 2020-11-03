# 前台

> 2020/11/03

### 错误日志

```js
    修改webpack别名导致报错
        ERROR  Failed to compile with 6 errors                                                         
        friendly-errors 21:41:35
        These dependencies were not found:                                                          
        friendly-errors 21:41:35
        friendly-errors 21:41:35
        * nuxt_plugin_axios_139125ab in ./dist/indexjs                                                                                                                 
        friendly-errors 21:41:35
        * nuxt_plugin_axios_3566aa80 in ./dist/index.js                                                              
        friendly-errors 21:41:35
        * nuxt_plugin_plugin_260ac315 in ./dist/index.js                                                              
        friendly-errors 21:41:35
        * nuxt_plugin_terminal_a6a2501c in ./dist/index.js                                                              
        friendly-errors 21:41:35
        * ~/components/loading/loading.vue in ./dist/App.js 
    问题定位： nuxt 项目有默认别名不能直接覆盖自己定义的别名要merge进去  
```