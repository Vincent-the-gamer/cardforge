import { defineStore } from "pinia";

export const useStore = defineStore("card", {
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
            attack: 0 as number,
            // 生命值 或 武器耐久度 或 英雄护甲值
            vitality: 1 as number,
            // 卡面缩放锁定纵横比
            lockAspectRatio: false as boolean,
            // 遮罩开启/关闭
            showMask: false as boolean,
            // 旗帜
            flag: Flag.None,
            // 酒馆战旗随从等级
            battlegroundLevel: 1 as number,
            // 酒馆战旗随从无稀有度时，是否展示龙框
            showDragon: false as boolean,
            // 水印
            watermark: WaterMark.None,
            // Websocket连接状态
            websocketState: WebSocketState.Disconnected,
            // 卡面图片Url
            cardFaceUrl: "" as string,
            // 导出的文件名
            exportFileName: "" as string
        }
    },
    actions: {
        setCardType(cardType: CardType) {
            this.cardType = cardType
        },
        setClassType(classType: ClassType){
            this.classType = classType
        },
        setCardClass(cardClass: CardClass){
            this.cardClass = cardClass
        },
        setDualCardClassLeft(left: CardClass){
            this.dualCardClass.left = left
        },
        setDualCardClassRight(right: CardClass){
            this.dualCardClass.right = right
        },
        setFlag(flag: Flag){
            this.flag = flag
        },
        setRarity(rarity: Rarity){
            this.rarity = rarity
        },
        setName(name: string){
            this.name = name
        },
        setKindType(kindType: KindType){
            this.kindType = kindType
        },
        setCardKind(cardKind: string){
            this.cardKind = cardKind
        },
        setDualCardKindUp(up: string){
            this.dualCardKind.up = up
        },
        setDualCardKindDown(down: string){
            this.dualCardKind.down = down
        },
        setDescription(description: string) {
            this.description = description
        },
        setDesFontSize(desFontSize: number) {
            this.desFontSize = desFontSize
        },
        setWatermark(watermark: WaterMark){
            this.watermark = watermark
        },
        setCost(cost: number){
            this.cost = cost
        },
        setAttack(attack: number) {
            this.attack = attack
        },
        setVitality(vitality: number) {
            this.vitality = vitality
        },
        setBattlegroundLevel(level: number){
            this.battlegroundLevel = level
        },
        setShowMask(showMask: boolean){
            this.showMask = showMask
        },
        setWebsocketState(webSocketState: WebSocketState){
            this.websocketState = webSocketState
        },
        setCardFaceUrl(cardFaceUrl: string){
            this.cardFaceUrl = cardFaceUrl
        }
    }
})