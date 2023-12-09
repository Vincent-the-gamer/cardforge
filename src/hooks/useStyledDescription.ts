import { CardType } from "@/datatypes/card"
import { useStore } from "@/store/useStore"
import { computed } from "vue"

export default function useStyledDescription() {
    const store = useStore()
    // 对描述的字体进行关键词等标记的特殊样式处理
    // 武器牌描述文字颜色为白色
    const styledDescription = computed<string>(() => {
        // 加粗
        const boldPattern = /\*\*(.*?)\*\*/g
        const matchBold: RegExpMatchArray | null = store.description.match(boldPattern)
        // 斜体
        const italicPattern = /\*(.*?)\*/g
        const matchItalic: RegExpMatchArray | null = store.description.match(italicPattern)
        // 斜体加粗
        const boldItalicPattern = /~(.*?)~/g
        const matchBoldItalic: RegExpMatchArray | null = store.description.match(boldItalicPattern)

        if(matchBold){
            for (let i = 0; i < matchBold.length; i++) {
                if(store.cardType === CardType.Weapon){
                    store.description = store.description.replaceAll(
                        matchBold[i], 
                        `<span style="font-weight: bold; text-shadow: 0 0 1px white;">${matchBold[i]}</span>`.replaceAll("*", "")
                    )
                }
                else {
                    store.description = store.description.replaceAll(
                        matchBold[i], 
                        `<span style="font-weight: bold; text-shadow: 0 0 1px black;">${matchBold[i]}</span>`.replaceAll("*", "")
                    )
                }  
            }
        } 
        if(matchItalic){
            for (let i = 0; i < matchItalic.length; i++) {
                store.description = store.description.replaceAll(
                    matchItalic[i], 
                    `<span style="font-style: italic;">${matchItalic[i]}</span>`.replaceAll("*", "")
                )
            }
        }
        if(matchBoldItalic){
            for (let i = 0; i < matchBoldItalic.length; i++) {
                if(store.cardType === CardType.Weapon) {
                    store.description = store.description.replaceAll(
                        matchBoldItalic[i], 
                        `<span style="font-weight: bold; text-shadow: 0 0 1px white; font-style: italic;">${matchBoldItalic[i]}</span>`
                        .replaceAll("~", "")
                    )
                }
                else {
                    store.description = store.description.replaceAll(
                        matchBoldItalic[i], 
                        `<span style="font-weight: bold; text-shadow: 0 0 1px black; font-style: italic;">${matchBoldItalic[i]}</span>`
                        .replaceAll("~", "")
                    )
                }
            }
        }

        return store.description
    })

    return styledDescription
}