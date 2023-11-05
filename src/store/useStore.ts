import { defineStore } from "pinia";
import { CardType } from "@/datatypes/cardType"
import { CardClass } from "@/datatypes/cardClass"

export const useStore = defineStore("cardtype", {
    state: () => {
        return {
            cardType: CardType.Minion,
            cardClass: CardClass.Neutral,
            cardKind: "" as string
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
        }
    }
})