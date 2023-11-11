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
        ],
        [
            /^font-family-([a-zA-Z_-]+)$/,
            ([_, fontFamily]) => ({ "font-family": fontFamily })
        ],
        [
            /^hearth-stroke-([\.\d]+)px$/,
            ([_, size]) => ({ "text-shadow": `-${size}px -${size}px 0 black, ${size}px -${size}px 0 black, -${size}px ${size}px 0 black, ${size}px ${size}px 0 black` })
        ]
    ],
    shortcuts: [
        { 
            "button": `bg-transparent color-white border-rd-4px
            border-1px border-solid border-white hover:bg-white hover:color-black 
            transition-all-250 hover:cursor-pointer` 
        },
        {
            "select": `bg-transparent color-white border-rd-4px border-1px border-solid 
            border-white w-90px h-30px`
        },
        {
            "input-text": `bg-transparent w-200px h-30px border-white border-1px 
            border-solid border-rd-5px color-white`
        }
    ]
})