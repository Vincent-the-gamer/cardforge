import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import "virtual:uno.css"
import { createPinia } from "pinia"

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
