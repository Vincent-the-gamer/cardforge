import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import "virtual:uno.css"
import { createPinia } from "pinia"
import i18n from './i18n'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(i18n)
app.mount('#app')
