<template>
    <div class="position-fixed z-8 w-80% h-80% left-10% top-10%
    bg-rgba-0-0-0-0.8 box-shadow-0px-0px-18px-deeppink border-rd-9px">
        <div class="flex flex-col justify-center items-center">
            <h1>连接WebSocket</h1>
            <p>用于其它客户端给服务端发请求，反向控制页面输出图片。</p>
            <span>WebSocket地址:</span>
            <input class="input-text w-40%" type="text" v-model="wsUrl"/>
            <button class="button m-t-10px p-9px font-size-16px"
                      @click="connectWebSocket"
                      v-if="wsState !== WebSocketState.Connected">
                连接
            </button>
            <button class="button m-t-10px p-9px font-size-16px"
                      @click="() => ws?.close()" v-else>
                关闭连接
            </button>
            <p>
                <span>连接状态：</span>
                <span class="color-green" v-if="wsState === WebSocketState.Connected">已连接</span>
                <span class="color-yellow" v-else-if="wsState === WebSocketState.Disconnected">已断开</span>
                <span class="color-red" v-else-if="wsState === WebSocketState.Error">错误</span>
            </p>

            <p class="position-relative w-60% h-fit">
                <p class="m-1px" align="center">日志</p>
                <div class="border-2px border-solid border-white border-rd-5px p-5px max-h-200px 
                white-space-pre-wrap overflow-auto">
                    <h4 class="m-0">{{ log === "" ? "无日志" : log }}</h4>
                </div>
            </p>

            <button class="button position-absolute bottom-40px p-7px w-120px h-60px 
            bg-rgba-255-0-0-1 hover:bg-violet hover:color-white font-size-18px"
                      @click="() => emitter('close')">关闭窗口</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CardClass, ClassType, KindType } from '@/datatypes/cardClass';
import { CardType, Rarity } from '@/datatypes/cardType';
import { Flag } from '@/datatypes/flag';
import useCardClassMap from '@/hooks/useCardClassMap';
import { useStore } from '@/store/useStore';
import { ref } from 'vue';

const emitter = defineEmits(["close"])

enum WebSocketState {
    Connected,
    Disconnected,
    Error
}

const store = useStore()
const cardClassMap = useCardClassMap()

const wsUrl = ref<string>("ws://localhost:8081")
const wsState = ref<WebSocketState>(WebSocketState.Disconnected)
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
            log.value += "WebSocket 连接成功！！\n"
        }
        ws.value.onerror = (err: any) => {
            wsState.value = WebSocketState.Error
            log.value = err
        }
        ws.value.onclose = () => {
            wsState.value = WebSocketState.Disconnected
            log.value += "已关闭连接\n"
        }
        ws.value.onmessage = (msgEvent: MessageEvent) => {
            try {
                const { data } = msgEvent
                const jsonData = JSON.parse(data)
                // cardType
                if(jsonData.cardType) {
                    let cardType = jsonData.cardType
                    if([CardType.Minion,CardType.Spell,CardType.Weapon,CardType.BattlegroundMinion].includes(cardType)){
                        store.setCardType(cardType as CardType)
                    }
                }
                // classType
                if(jsonData.classType){
                    let classType = jsonData.classType
                    if([ClassType.Single, ClassType.Dual].includes(classType)){
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
                // flag
                if(jsonData.flag){
                    let flag = jsonData.flag
                    if([Flag.None, Flag.Forge, Flag.Tradeable].includes(flag)){
                        store.setFlag(flag)
                    }
                }

                // rarity
                if(jsonData.rarity){
                    let rarity = jsonData.rarity
                    if([Rarity.None, Rarity.Common, Rarity.Rare, Rarity.Epic, Rarity.Legandary].includes(rarity)){
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
                    if([KindType.Single, KindType.Dual].includes(kindType)){
                        store.setKindType(kindType)
                    }
                }

                // cardKind
                if(jsonData.cardKind){
                    store.setCardKind(jsonData.cardKind)
                }

                // description
                if(jsonData.description){
                    store.setDescription(jsonData.description)
                }
                
            } catch (err) {
                log.value += "格式不正确！消息必须是json格式！\n"
            }
        }
    } catch(err: any) {
        wsState.value = WebSocketState.Error
        log.value = err
    }
}
</script>