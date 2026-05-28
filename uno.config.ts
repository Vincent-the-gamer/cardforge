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
            "button": `bg-transparent border-rd-6px px-4 py-2
            border-1px border-solid border-white/40
            text-white text-sm font-family-BlizzardGlobal
            transition-all-250 hover:cursor-pointer
            hover:bg-white/15 hover:border-white/70
            active:scale-97`
        },
        {
            "select": `bg-white/8 border-rd-6px border-1px border-solid border-white/25
             w-100px h-34px px-2 font-family-BlizzardGlobal text-white text-sm
             transition-all-200 hover:border-white/50
             focus:outline-none focus:border-white/60 focus:bg-white/12
             appearance-none cursor-pointer`
        },
        {
            "input-text": `bg-white/8 w-200px h-34px px-3
            border-1px border-solid border-white/25 border-rd-6px
            font-family-BlizzardGlobal text-white text-sm
            transition-all-200
            placeholder:text-white/30
            hover:border-white/50
            focus:outline-none focus:border-white/60 focus:bg-white/12`
        }
    ]
})