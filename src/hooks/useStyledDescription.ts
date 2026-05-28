
export default function useStyledDescription() {
    const store = useStore()

    // 匹配 emoji 字符及其修饰序列，防止 modern-screenshot 截图时因宽度计算偏差导致换行
    const EMOJI_REGEX = /\p{Emoji_Presentation}(?:\uFE0F|\u200D(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}))*/gu
    const wrapEmoji = (text: string) =>
        text.replace(
            EMOJI_REGEX,
            '<span style="display: inline-block; white-space: nowrap;">$&</span>'
        )

    // 对描述的字体进行关键词等标记的特殊样式处理（不修改 store 原始数据）
    const styledDescription = computed<string>(() => {
        // 使用副本进行操作，避免污染 store 原始数据
        let desc = store.description

        const isWeapon = store.cardType === CardType.Weapon
        const textShadowStyle = isWeapon
            ? 'font-weight: bold; text-shadow: 0 0 1px white;'
            : 'font-weight: bold; text-shadow: 0 0 1px black;'

        // 加粗
        desc = desc.replace(/\*\*(.*?)\*\*/g, (_, text) =>
            `<span style="${textShadowStyle}">${text}</span>`
        )

        // 斜体加粗 (~text~)
        desc = desc.replace(/~(.*?)~/g, (_, text) =>
            `<span style="${textShadowStyle} font-style: italic;">${text}</span>`
        )

        // 斜体 (*text*) — 必须在加粗之后处理，避免冲突
        desc = desc.replace(/\*(.*?)\*/g, (_, text) =>
            `<span style="font-style: italic;">${text}</span>`
        )

        // 将 emoji 包裹为 inline-block，避免 modern-screenshot 截图时因宽度计算偏差导致换行
        return wrapEmoji(desc)
    })

    return styledDescription
}