import { defineStore } from "pinia";
import { CardType } from "@/datatypes/cardType"
import { CardClass, ClassType } from "@/datatypes/cardClass"

export const useStore = defineStore("cardtype", {
    state: () => {
        return {
            cardType: CardType.Minion,
            cardClass: CardClass.Neutral,
            cardKind: "" as string,
            // 职业类型： 单，双
            classType: ClassType.Single
        }
    },
    actions: {
        setCardType(cardType: CardType) {
            this.cardType = cardType
        },
        setCardClass(cardClass: CardClass){
            this.cardClass = cardClass
        },
        setCardKind(cardKind: string){
            this.cardKind = cardKind
        },
        setClassType(classType: ClassType){
            this.classType = classType
        }
    }
})