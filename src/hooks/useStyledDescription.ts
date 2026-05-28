
export default function useStyledDescription() {
    const store = useStore()
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

        return desc
    })

    return styledDescription
}