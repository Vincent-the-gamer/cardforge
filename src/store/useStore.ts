import { defineStore } from "pinia";
import { CardType, Rarity } from "@/datatypes/cardType"
import { CardClass, ClassType, KindType } from "@/datatypes/cardClass"

export const useStore = defineStore("cardtype", {
    state: () => {
        return {
            // 卡牌类型：随从 法术等
            cardType: CardType.Minion,
            // 单职业类型
            cardClass: CardClass.Neutral,
            // 双职业类型
            dualCardClass: {
                left: CardClass.Neutral,
                right: CardClass.Warrior
            },
            // 卡牌种族类型： 单 双
            kindType: KindType.Single,
            // 卡牌类型（种族）
            cardKind: "" as string,
            // 双卡牌类型（双种族）
            dualCardKind: {
                up: "" as string,
                down: "" as string
            },
            // 职业类型： 单，双
            classType: ClassType.Single,
            // 稀有度
            rarity: Rarity.None,
            // 法力值消耗
            cost: 1 as number,
            // 卡牌名称
            name: "" as string,
            // 卡牌描述
            description: "" as string,
            // 描述字体大小
            desFontSize: 20 as number,
            // 攻击力
            attack: 1 as number,
            // 生命值
            vitality: 1 as number,
            // 卡面缩放锁定纵横比
            lockAspectRatio: false as boolean
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
        setKindType(kindType: KindType){
            this.kindType = kindType
        },
        setCardKind(cardKind: string){
            this.cardKind = cardKind
        },
        setDualCardKind(up: string, down: string) {
            this.dualCardKind.up = up
            this.dualCardKind.down = down
        },
        setClassType(classType: ClassType){
            this.classType = classType
        },
        setRarity(rarity: Rarity) {
            this.rarity = rarity
        },
        setCost(cost: number) {
            this.cost = cost
        },
        setName(name: string) {
            this.name = name
        },
        setDescription(description: string) {
            this.description = description
        },
        setAttack(attack: number){
            this.attack = attack
        },
        setVitality(vitality: number){
            this.vitality = vitality
        },
        setDesFontSize(desFontSize: number){
            this.desFontSize = desFontSize
        },
        setLockAspectRatio(lockAspectRatio: boolean){
            this.lockAspectRatio = lockAspectRatio
        }

    }
})