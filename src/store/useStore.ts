import { defineStore } from "pinia";
import { CardType } from "@/datatypes/cardType.ts"

export const useStore = defineStore("cardtype", {
    state: () => {
        return {
            cardType: CardType.Minion
        }
    },
    actions: {
        setCardType(cardType: CardType) {
            this.cardType = cardType
        }
    }
})