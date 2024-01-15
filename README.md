### 应用说明

​	项目是以智物联apiproxy为基础，搭建的应用模版。包含了如显示版、对象管理、维保、报表等业务。

### 配置项

​	项目需要用的配置信息，统一存放在src/config/public.js文件下，把相应的apiproxy密钥信息配置好，即可运行。

- app_id：apiproxy的id
- app_secret：apiproxy的密钥
- home_pro：显示版管理应用下，配置好的显示版信息。
  - uid：显示版的id
  - object_id：显示版关联的对象id

app_id与app_secret用于获取调apiproxy接口需要的access_token

```js
//获取token
import publicConfig from '@/config/public.js'
axios.post('/apiproxy/api', {
            action: 'get_access_token',
            app_id: publicConfig.app_id,
            app_secret: publicConfig.app_secret
}).then(res => {
      console.log(res.data.result.access_token)
})
```

### mixlinker-tools组件库

​	项目上的一些业务组件，是引用的mixlinker-tools的npm包。需要在main.js下进行全局注册

```js
//main.js
import mixlinker from 'mixlinker-tools'
import 'mixlinker-tools/style'
app.use(mixlinker)
```

如显示板组件mix-dashboard,传入显示版管理应用下的显示版id，即可以显示出显示版。

```html
 <mix-dashboard :params="{uid:'mixdashboardid123'}"></mix-dashboard>
```

详细文档请查看：https://www.npmjs.com/package/mixlinker-tools

### apiproxy的接口地址

​	用户申请到自己的app_secret后，就能通过apiproxy调用智物联平台的接口，接口的统一地址为:https://www.mixyun.com/apiproxy