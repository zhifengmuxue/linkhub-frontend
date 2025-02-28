import '@/assets/style.css'

import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router)

app.use(Antd).mount('#app')
