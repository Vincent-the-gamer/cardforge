<template>
    <div class="position-fixed z-8 w-80% h-80% left-10% top-10%
    bg-rgba-0-0-0-0.8 box-shadow-0px-0px-18px-deeppink border-rd-9px">
        <div class="flex flex-col justify-center items-center">
            <h1>{{ $t("passiveControl") }}</h1>
            <p>{{ $t("passiveDescription") }}</p>
            <span>{{ $t("passiveWs") }}: </span>
            <input class="input-text w-40%" type="text" v-model="wsUrl"/>
            <button class="button m-t-10px p-9px font-size-16px"
                      @click="connectWebSocket"
                      v-if="wsState !== WebSocketState.Connected">
                {{ $t("passiveConnect") }}
            </button>
            <button class="button m-t-10px p-9px font-size-16px"
                      @click="() => ws?.close()" v-else>
                {{ $t("passiveCloseConnect") }}
            </button>
            <p>
                <span>{{ $t("passiveConnState") }}：</span>
                <span class="color-green" v-if="wsState === WebSocketState.Connected">{{ $t("passiveConnected") }}</span>
                <span class="color-yellow" v-else-if="wsState === WebSocketState.Disconnected">{{ $t("passiveDisconnected") }}</span>
                <span class="color-red" v-else-if="wsState === WebSocketState.Error">{{ $t("passiveError") }}</span>
            </p>

            <p class="position-relative w-60% h-fit">
                <p class="m-1px" align="center">{{ $t("passiveLog") }}</p>
                <div class="border-2px border-solid border-white border-rd-5px p-5px max-h-200px 
                white-space-pre-wrap overflow-auto">
                    <h4 class="m-0">{{ log === "" ? t("passiveNoLog") : log }}</h4>
                </div>
            </p>

            <button class="button position-absolute bottom-40px p-7px w-120px h-60px 
            bg-rgba-255-0-0-1 hover:bg-violet hover:color-white font-size-18px"
                      @click="() => emitter('close')">{{ $t("passiveCloseWindow") }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CardClass, ClassType, KindType, CardType, Rarity, Flag, WaterMark } from '@/datatypes/card';
import { WebSocketState } from '@/datatypes/websocket';
import useCardClassMap from '@/hooks/useCardClassMap';
import { useStore } from '@/store/useStore';
import { domToPng } from 'modern-screenshot';
import { watch } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emitter = defineEmits(["close"])

const { t, locale } = useI18n()

const store = useStore()
const cardClassMap = useCardClassMap()

const wsUrl = ref<string>("ws://localhost:8081")
const wsState = ref<WebSocketState>(WebSocketState.Disconnected)
watch(() => wsState.value, newVal => {
    store.setWebsocketState(newVal)
})

const log = ref<string>("")

/**
 * WebSocket
 */
const ws = ref<WebSocket | null>(null)
function connectWebSocket() {
    try{
        ws.value = new WebSocket(wsUrl.value)
        ws.value.onopen = () => {
            wsState.value = WebSocketState.Connected
            log.value += t("passiveMsgSuccess") + "\n"
        }
        ws.value.onerror = (err: any) => {
            wsState.value = WebSocketState.Error
            log.value = err
        }
        ws.value.onclose = () => {
            wsState.value = WebSocketState.Disconnected
            log.value += t("passiveMsgClose") + "\n"
        }
        ws.value.onmessage = (msgEvent: MessageEvent) => {
            try {
                const { data } = msgEvent
                const jsonData = JSON.parse(data)
   
                // Language
                if(jsonData.language){
                    let lang = jsonData.language
                    if(["zh", "en"].includes(lang)){
                        locale.value = lang
                    }
                }

                // cardType
                if(jsonData.cardType) {
                    let cardType = jsonData.cardType
                    if(Object.values(CardType).includes(cardType)){
                        store.setCardType(cardType)
                    }
                }
                // classType
                if(jsonData.classType){
                    let classType = jsonData.classType
                    if(Object.values(ClassType).includes(classType)){
                        store.setClassType(classType)
                    }
                }
                // cardClass
                if(jsonData.cardClass){
                    let cardClass = jsonData.cardClass
                    if(cardClassMap[cardClass as CardClass] !== undefined){
                        store.setCardClass(cardClass)
                    }
                }

                if(jsonData.leftClass) {
                    let leftClass = jsonData.leftClass
                    if(cardClassMap[leftClass as CardClass] !== undefined){
                        store.setDualCardClassLeft(leftClass)
                    }
                }
                if(jsonData.rightClass) {
                    let rightClass = jsonData.rightClass
                    if(cardClassMap[rightClass as CardClass] !== undefined){
                        store.setDualCardClassRight(rightClass)
                    }
                }

                // flag
                if(jsonData.flag){
                    let flag = jsonData.flag
                    if(Object.values(Flag).includes(flag)){
                        store.setFlag(flag)
                    }
                }

                // rarity
                if(jsonData.rarity){
                    let rarity = jsonData.rarity
                    if(Object.values(Rarity).includes(rarity)){
                        store.setRarity(rarity)
                    }
                }

                // name
                if(jsonData.name){
                    store.setName(jsonData.name)
                }

                // kindType
                if(jsonData.kindType){
                    let kindType = jsonData.kindType
                    if(Object.values(KindType).includes(kindType)){
                        store.setKindType(kindType)
                    }
                }

                // cardKind
                if(jsonData.cardKind){
                    store.setCardKind(jsonData.cardKind)
                }
                   
                if(jsonData.upKind) {
                    store.setDualCardKindUp(jsonData.upKind)
                }
                if(jsonData.downKind) {
                    store.setDualCardKindDown(jsonData.downKind)
                }
                    
                // description
                if(jsonData.description){
                    store.setDescription(jsonData.description)
                }

                // watermark
                if(jsonData.watermark){
                    if(Object.values(WaterMark).includes(jsonData.watermark)) {
                        store.setWatermark(jsonData.watermark)
                    }
                }

                // desFontSize
                if(jsonData.desFontSize && typeof jsonData.desFontSize === "number") {
                    store.setDesFontSize(jsonData.desFontSize)
                }

                // cost
                if(jsonData.cost){
                    store.setCost(jsonData.cost)
                }

                // attack
                if(jsonData.attack){
                    store.setAttack(jsonData.attack)
                }
                
                // vitality / durability(weapon) / armor(hero)
                if(jsonData.vitality || jsonData.durability || jsonData.armor){
                    jsonData.vitality && store.setVitality(jsonData.vitality)
                    jsonData.durability && store.setVitality(jsonData.durability)
                    jsonData.armor && store.setVitality(jsonData.armor)
                }

                // cardFaceUrl
                if(jsonData.cardFaceUrl) {
                    store.setCardFaceUrl(jsonData.cardFaceUrl)
                }

                // generate picture after a while
                setTimeout(() => {
                    // 截图
                    const card = document.getElementById("card") as HTMLElement
                    card.style.color = "black"
                    // 开启遮罩
                    store.setShowMask(true)
                    domToPng(card).then(dataUrl => {
                        ws.value?.send(dataUrl)
                        store.setShowMask(false)
                    })
                }, 800)

            } catch (err) {
            }
        }
    } catch(err: any) {
        wsState.value = WebSocketState.Error
        log.value = err
    }
}
</script>