import { defineConfig, presetUno, presetAttributify } from 'unocss'

// uno.config.ts
export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
    ],
    rules: [
        [
            /^bg-rgba-([\.\d]+)-([\.\d]+)-([\.\d]+)-([\.\d]+)$/, 
            ([_, r, g, b, a]) => ({ "background-color": `rgba(${r}, ${g}, ${b}, ${a})` })
        ],
    ],
    shortcuts: []
})