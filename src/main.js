import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import routers from './router'
import pinia from './pinia'
// 引入ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as antIcons from '@ant-design/icons-vue'
// Antd 注入全部图标
Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
})
//国际化
import i18n from '@/i18n'
//引用共用样式
import '@/style/index.scss'
//引入接口api调用
import Api from '@/services/request/Api.js'
app.config.globalProperties.api = Api
//引入全局config
import config from './config/config.js'
app.config.globalProperties.config = config
/* 引入mixlinker-tools*/
import mixlinker from 'mixlinker-tools'
import 'mixlinker-tools/style'
import emitter from 'mitt';
app.config.globalProperties.emitter = emitter()
/* 设置全局字体，配置当屏幕宽度1920px时，1rem = 100px */
function setHtmlFontSize() {
    const htmlWidth = document.body.clientWidth || document.documentElement.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 19.2 + 'px';
}
setHtmlFontSize();
window.onresize = function () {
    setHtmlFontSize();
}

app.use(i18n)
app.use(Antd)
app.use(pinia)
app.use(routers)
app.use(mixlinker)
app.mount('#app')
