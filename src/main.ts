import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

console.log(ElementUI)

const app = createApp(App)

app.use(ElementUI)
app.use(createPinia())
app.use(router)

app.mount('#app')
