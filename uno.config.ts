import { 
    defineConfig,
    presetUno, 
    presetAttributify,
    presetIcons
} from 'unocss'

// uno.config.ts
export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                display: "inline-block"
            }
        })
    ],
    rules: [
        [
            /^bg-rgba-([\.\d]+)-([\.\d]+)-([\.\d]+)-([\.\d]+)$/, 
            ([_, r, g, b, a]) => ({ "background-color": `rgba(${r}, ${g}, ${b}, ${a})` })
        ]
    ],
    shortcuts: [
        { 
            "button": `bg-transparent color-white border-rd-4px
            border-1px border-solid border-white hover:bg-white hover:color-black 
            transition-all-250 hover:cursor-pointer` 
        }
    ]
})