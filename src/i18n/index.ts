import { createI18n } from "vue-i18n"

// 简体中文(Simplified Chinese)
import ZH from "./zh.json"
// English
import EN from "./en.json"

const messages = {
    zh: ZH,
    en: EN
}

const i18n = createI18n({
    locale: "zh",
    legacy: false, // 如果要支持Composition API，此项必须false
    globalInjection: true, // 全局注册$t方法
    messages
})

export default i18n