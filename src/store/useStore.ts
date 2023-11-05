import { defineStore } from "pinia";
import { CardType, Rarity } from "@/datatypes/cardType"
import { CardClass, ClassType } from "@/datatypes/cardClass"

export const useStore = defineStore("cardtype", {
    state: () => {
        return {
            cardType: CardType.Minion,
            // 单职业类型
            cardClass: CardClass.Neutral,
            // 双职业类型
            dualCardClass: {
                left: CardClass.Neutral,
                right: CardClass.Warrior
            },
            cardKind: "" as string,
            // 职业类型： 单，双
            classType: ClassType.Single,
            // 稀有度
            rarity: Rarity.None,
        }
    },
    actions: {
        setCardType(cardType: CardType) {
            this.cardType = cardType
        },
        setCardClass(cardClass: CardClass){
            this.cardClass = cardClass
        },
        setDualCardClass(left: CardClass, right: CardClass){
            this.dualCardClass.left = left
            this.dualCardClass.right = right
        },
        setCardKind(cardKind: string){
            this.cardKind = cardKind
        },
        setClassType(classType: ClassType){
            this.classType = classType
        },
        setRarity(rarity: Rarity) {
            this.rarity = rarity
        }
    }
})