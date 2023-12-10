<template>
    <div class="flex justify-center items-center flex-row position-absolute h-100% w-100% top-0 hide-scrollbar">
        <!-- 移动端打开/关闭菜单 -->
        <button class="position-fixed z-9 top-45px left-10px w-40px h-40px 
                bg-transparent border-1px border-solid border-white color-white
                border-rd-6px hover:bg-white hover:color-black hover:cursor-pointer transition-all-250"
                v-show="showToggleButton"
                @click="showFormLayout = !showFormLayout">
            <div class="i-grommet-icons-menu position-relative w-100% h-100%"></div>
        </button>
        <FormLayout v-show="showFormLayout"
            class="form-layout m-r-5px z-8 p-t-55px p-b-20px position-relative top-0 overflow-y-auto 
            min-w-500px w-500px flex flex-col justify-center items-center bg-rgba-63-63-63-0.7"
            :class="currentPlatform === 'mobile' ? 'w-fit' : ''">
            <p class="m-b-2px">
                <span>{{ $t("cardType") }}：</span>
                <select class="select w-fit" v-model="store.cardType">
                    <option :value="CardType.Minion">{{ $t("minion")}}</option>
                    <option :value="CardType.Spell">{{ $t("spell") }}</option>
                    <option :value="CardType.Weapon">{{ $t("weapon") }}</option>
                    <option :value="CardType.Hero">{{ $t("hero") }}</option>
                    <option :value="CardType.BattlegroundMinion">{{ $t("battlegroundsMinion") }}</option>
                </select>
            </p>
           <MinionMenu v-if="store.cardType === CardType.Minion"/>
           <SpellMenu v-else-if="store.cardType === CardType.Spell"/>
           <WeaponMenu v-else-if="store.cardType === CardType.Weapon"/>
           <HeroMenu v-else-if="store.cardType === CardType.Hero"/>
           <BattlegroundMinionMenu v-else-if="store.cardType === CardType.BattlegroundMinion"/>
        </FormLayout>
    
        <CardLayout class="card-layout flex justify-center items-center flex-col h-100% w-500px overflow-hidden"
            :class="currentPlatform === 'mobile' ? 'left-17% translate-y-60px flex-1' : ''">

            <!-- WebSocket Connect -->
            <Teleport to="body">
                <div :class="`w-fit h-fit position-fixed z-5 top-50px right-19px p-4px
                border-1px border-solid border-white border-rd-5px hover:bg-white hover:color-black
                hover:cursor-pointer transition-all-200 ${store.websocketState === WebSocketState.Connected ? 'bg-green' : ''}`" @click="showWebSocket = !showWebSocket">
                    <div class="i-grommet-icons-connect"></div>
                    <span v-if="store.websocketState === WebSocketState.Disconnected">
                        {{ $t("passiveControlShort") }} {{ $t("passiveDisconnected") }}
                    </span>
                    <span v-else-if="store.websocketState === WebSocketState.Connected">
                        {{ $t("passiveControlShort") }} {{ $t("passiveConnected") }}
                    </span>
                </div>
                <WebSocket v-show="showWebSocket" 
                           @close="showWebSocket = false"/>
            </Teleport>
            <!-- WebSocket Connect End-->

            <Card class="position-absolute h-650px translate-y-5px"/>
            <div class="position-absolute m-0 z-2 bottom-0">
                <p align="center" :class="`m-5px color-yellow ${locale === 'en' && 'font-size-12px'}`">{{ $t("cardHint") }}</p>
                <p class="flex justify-center items-center hover:cursor-pointer m-5px">
                    <span>{{ $t("lockAspectRatio") }}: </span>
                    <input type="checkbox" v-model="store.lockAspectRatio"
                        class="w-20px h-20px"/>
                </p>
                <input type="file"
                    @mouseenter="() => mask = 'bg-white color-black cursor-pointer'"
                    @mouseleave="() => mask = ''"
                    @change="handleUpload"
                    class="button h-38px w-98px m-0 font-size-0 position-absolute translate-x-130px z-1 opacity-0"/>
                <div class="flex justify-center items-center m-0">
                    <button :class="`button h-40px w-100px z-0 hover:cursor-pointer ${mask}`">
                       {{ $t("uploadCardFace") }}
                    </button>
                    <button class="button h-40px w-90px m-l-7px" @click="generateImage">
                        {{ $t("generatePicture") }}
                    </button>
                </div>
            </div>
          
        </CardLayout>
    </div>
</template>


<script lang="ts" setup>
import { domToPng } from 'modern-screenshot'
import FormLayout from './FormLayout.vue'
import CardLayout from "./CardLayout.vue"
import Card from "@/components/Card/Card.vue"
import MinionMenu from '@/components/Menu/MinionMenu.vue'
import SpellMenu from "@/components/Menu/SpellMenu.vue"
import BattlegroundMinionMenu from "@/components/Menu/BattlegroundsMinionMenu.vue"
import { useStore } from "@/store/useStore"
import { ref, watch } from 'vue';
import { CardType, KindType } from '@/datatypes/card'
import { useI18n } from 'vue-i18n'
import useCurrentPlatform from "@/hooks/useCurrentPlatform"
import WeaponMenu from '@/components/Menu/WeaponMenu.vue'
import WebSocket from '@/components/WebSocket.vue'
import { WebSocketState } from '@/datatypes/websocket'
import HeroMenu from '@/components/Menu/HeroMenu.vue'

// store
const store = useStore();

// i18n
const { locale } = useI18n()

// show websocket menu
const showWebSocket = ref<boolean>(false)

// 窄视图显示/隐藏菜单
const currentPlatform = useCurrentPlatform()
const showToggleButton = ref<boolean>(
    currentPlatform === "mobile" ? true : false
)
const showFormLayout = ref<boolean>(
    currentPlatform === "mobile" ? false : true
)
// 根据页面宽度来控制控件的显示
window.addEventListener("resize", () => {
    let width = window.innerWidth
    if(width >= 1024){
        showFormLayout.value = true
        showToggleButton.value = false
    } else {
        showToggleButton.value = true
        showFormLayout.value = false
    }
})


// 上传卡牌配图
// 上传按钮遮罩样式
const mask = ref<string>("")

// 处理上传逻辑
function handleUpload(e: any){
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = (e: any) => {
            store.setCardFaceUrl(e.target.result)
        }
        reader.readAsDataURL(file)
    }
}

// 生成图片
function generateImage(){
    const card = document.getElementById("card") as HTMLElement
    card.style.color = "black"
    // 截图
    // 开启遮罩
    store.setShowMask(true)
    domToPng(card).then(dataUrl => {
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "MyCard.png"
        link.click()
        // 关闭遮罩
        store.setShowMask(false)
    })
}

// cardType切换时清空description, 否则也会将正则匹配替换的结果显示到菜单中
watch(() => store.cardType, () => {
    store.setDescription("")
    // 武器没有双派系
    if(store.cardType === CardType.Weapon) {
        store.kindType = KindType.Single
    }
})

</script>


<style scoped>
.hide-scrollbar{
    ::-webkit-scrollbar {
        display: none;
    }
}

/* 窄视图样式调整 */
@media screen and (max-width: 1024px) {
    .toggle-menu {
        position: fixed;
        top: 50px;
        left: 20px;
    }
    .form-layout {
        position: fixed;
        top: 50px;
        left: 60px;
    }
    .card-layout {
        overflow: auto;
    }
}
</style>