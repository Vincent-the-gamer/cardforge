import { createI18n } from "vue-i18n"

// 简体中文(Simplified Chinese)
import ZH from "./zh/zh.json"
import ZH_Watermark from "./zh/zh_watermark.json"
import ZH_passiveControl from "./zh/zh_passive_control.json"

// English
import EN from "./en/en.json"
import EN_Watermark from "./en/en_watermark.json"
import EN_passiveControl from "./en/en_passive_control.json"

const messages = {
    zh: {
        ...ZH,
        ...ZH_Watermark,
        ...ZH_passiveControl
    },
    en: {
        ...EN,
        ...EN_Watermark,
        ...EN_passiveControl
    }
}

const i18n = createI18n({
    locale: "en",
    legacy: false, // 如果要支持Composition API，此项必须false
    globalInjection: true, // 全局注册$t方法
    messages
})

export default i18n