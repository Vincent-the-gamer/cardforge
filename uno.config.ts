import { 
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind3
} from 'unocss'

// uno.config.ts
export default defineConfig({
    presets: [
        presetWind3(),
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
        ],
        [
            /^white-space-([a-zA-Z_-]+)$/,
            ([_, whiteSpace]) => ({ "white-space": whiteSpace })
        ],
        [
            /^box-shadow-([\.\d]+)px-([\.\d]+)px-([\.\d]+)px-([a-zA-Z_-]+)$/,
            ([_, offsetX, offsetY, blur, color]) => ({ "box-shadow": `${offsetX}px ${offsetY}px ${blur}px ${color}` })
        ]
    ],
    shortcuts: [
        { 
            "button": `bg-transparent border-rd-4px
            border-1px border-solid transition-all-250 hover:cursor-pointer` 
        },
        {
            "select": `bg-transparent border-rd-4px border-1px border-solid
             w-90px h-30px font-family-BlizzardGlobal`
        },
        {
            "input-text": `bg-transparent w-200px h-30px border-1px 
            border-solid border-rd-5px font-family-BlizzardGlobal`
        }
    ]
})