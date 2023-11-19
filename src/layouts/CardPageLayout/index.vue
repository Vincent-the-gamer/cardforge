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
            class="form-layout m-r-5px z-8 p-t-20px p-b-20px position-relative top-0 overflow-y-auto min-w-500px w-500px flex flex-col justify-center items-center bg-rgba-63-63-63-0.7">
            <p class="m-b-2px">
                <span>{{ $t("cardType") }}</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Minion"/><span>{{ $t("minion")}} </span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Spell"/><span>{{ $t("spell") }}</span>
                <!-- <input type="radio" name="card-type" v-model="cardType" :value="CardType.Weapon"/><span>武器</span>  -->
            </p>
           <MinionMenu v-if="store.cardType === CardType.Minion"/>
           <SpellMenu v-else-if="store.cardType === CardType.Spell"/>
        </FormLayout>
    
        <CardLayout class="card-layout flex justify-center items-center flex-col h-100% w-500px overflow-hidden">
            <Card class="position-absolute h-650px"/>
            <div class="position-absolute m-0 z-2 bottom-0">
                <p align="center" :class="`m-5px color-yellow ${locale === 'en' && 'font-size-12px'}`">{{ $t("cardHint") }}</p>
                <p class="flex justify-center items-center hover:cursor-pointer m-5px">
                    <span>{{ $t("lockAspectRatio") }}</span>
                    <input type="checkbox" v-model="lockAspectRatio"
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
import { useStore } from "@/store/useStore"
import { provide, ref, watch } from 'vue';
import { CardType } from '@/datatypes/cardType'
import { useI18n } from 'vue-i18n'

// store
const store = useStore();

// i18n
const { locale } = useI18n()


// 窄视图显示/隐藏菜单
const showToggleButton = ref<boolean>(false)
const showFormLayout = ref<boolean>(true)
// 根据页面宽度来控制控件的显示
window.addEventListener("resize", () => {
    let width = window.innerWidth
    if(width >= 800){
        showFormLayout.value = true
        showToggleButton.value = false
    } else {
        showToggleButton.value = true
        showFormLayout.value = false
    }
})

// card type 卡牌类型：随从(Minion)等
const cardType = ref<CardType>(store.cardType)
watch(() => cardType.value, newVal => {
    store.setCardType(newVal)
})

// 卡面缩放锁定纵横比
const lockAspectRatio = ref<boolean>(store.lockAspectRatio)
watch(() => lockAspectRatio.value, newVal => {
    store.setLockAspectRatio(newVal)
})

// 上传卡牌配图
// 上传按钮遮罩样式
const mask = ref<string>("")

// 处理上传逻辑
const imageUrl = ref<string>("")
provide("imageUrl", imageUrl)

function handleUpload(e: any){
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = (e: any) => {
            imageUrl.value = e.target.result
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

</script>


<style scoped>
.hide-scrollbar{
    ::-webkit-scrollbar {
        display: none;
    }
}

/* 窄视图样式调整 */
@media screen and (max-width: 800px) {
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