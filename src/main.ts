import { createApp } from 'vue'
import './styles/reset.css'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
