<template>
    <div flex="~ row justify-center items-center" absolute h-full w-full top-0 hide-scrollbar>
        <!-- 移动端打开/关闭菜单 -->
        <button fixed z-9 top-45px left-10px w-40px h-40px dark:color-white dark:border-white dark:bg-black
                bg-transparent border-1px border-solid border-black color-black
                border-rd-6px hover:bg-black hover:color-white hover:cursor-pointer transition-all-250
                v-show="showToggleButton" 
                @click="showFormLayout = !showFormLayout">
            <div i-grommet-icons-menu relative w-full h-full />
        </button>
        <!-- 操作菜单切换显示按钮 -->
        <button z-9 fixed top-12 right-4 w-40px h-40px color-black dark:color-white dark:border-white dark:bg-black hover:bg-black hover:color-white hover:cursor-pointer
                     border="black rd-2 solid 1px" transition-all-250 @click="showActionMenu = !showActionMenu">
            <div i-grommet-icons-apps-rounded relative w-full h-full />
        </button>
        <FormLayout v-show="showFormLayout"
            class="form-layout m-r-5px z-8 p-t-10px p-b-25px position-relatives top-0 overflow-y-auto 
            w-400px flex flex-col justify-center items-center"
            :class="`${mobile ? 'w-fit' : ''} ${isDark ? 'bg-rgba-63-63-63-0.4 color-white' : 'bg-rgba-0-0-0-0.6 color-white'}`">
            <div class="h-100%">
                <p class="flex justify-center items-center m-0">
                    <span>{{ $t("cardType") }}：</span>
                    <select class="select w-fit" v-model="store.cardType">
                        <option :value="CardType.Minion">{{ $t("minion")}}</option>
                        <option :value="CardType.Spell">{{ $t("spell") }}</option>
                        <option :value="CardType.Weapon">{{ $t("weapon") }}</option>
                        <option :value="CardType.Hero">{{ $t("hero") }}</option>
                        <option :value="CardType.BattlegroundMinion">{{ $t("battlegroundsMinion") }}</option>
                        <option :value="CardType.Location">{{ $t("location") }}</option>
                    </select>
                </p>
                <MinionMenu v-if="store.cardType === CardType.Minion"/>
                <SpellMenu v-else-if="store.cardType === CardType.Spell"/>
                <WeaponMenu v-else-if="store.cardType === CardType.Weapon"/>
                <HeroMenu v-else-if="store.cardType === CardType.Hero"/>
                <BattlegroundMinionMenu v-else-if="store.cardType === CardType.BattlegroundMinion"/>
                <LocationMenu v-else-if="store.cardType === CardType.Location"/>
            </div>
           
        </FormLayout>
    
        <CardLayout :class="mobile ? 'left-17% translate-y-60px flex-1' : ''">

            <Card />
            <!-- 操作菜单 -->
            <div fixed h-fit p-3 right-15 top-15 bg-rgba-0-0-0-0.6 z-2 color-white v-if="showActionMenu">
                <p align="center" :class="`m-5px color-yellow ${locale === 'en' && 'font-size-12px'}`">{{ $t("cardHint") }}</p>
                <p class="flex justify-center items-center hover:cursor-pointer m-5px">
                    <span>{{ $t("lockAspectRatio") }}: </span>
                    <input type="checkbox" v-model="store.lockAspectRatio"
                        class="w-20px h-20px"/>
                </p>
                <div flex="~ justify-center" mb-2>
                    <span>{{ $t("fileName") }}:</span>
                    <input type="text" v-model="store.exportFileName" m-inline-1 border="1px rd-1"/>
                </div>
                <input type="file"
                    @mouseenter="() => mask = `cursor-pointer upload-input-mask`"
                    @mouseleave="() => mask = ''"
                    @change="handleUpload"
                    class="button h-38px w-98px m-0 font-size-0 position-absolute translate-x-130px z-1 opacity-0"/>
                <div class="flex justify-center items-center m-0">
                    <button :class="`button h-40px w-100px z-0 hover:cursor-pointer ${mask}`">
                       {{ $t("uploadCardFace") }}
                    </button>
                    <button :class="`button h-40px w-90px m-l-7px `" @click="generateImage">
                        {{ $t("generatePicture") }}
                    </button>
                </div>
            </div>
          
        </CardLayout>
    </div>
</template>


<script lang="ts" setup>
import { domToPng } from 'modern-screenshot'
import CardLayout from './CardLayout.vue';
import FormLayout from './FormLayout.vue';
import { isMobile } from '@/utils/isMobile';

const mobile: boolean = isMobile()

// websocket menu hide & show
const wsRef = ref<HTMLElement | null>(null)

const { isOutside } = useMouseInElement(wsRef)
watch(() => isOutside.value, newVal => {
    newVal ? showWebSocket.value = false : showWebSocket.value = true
})

// store
const store = useStore();

// theme
const isDark = useDark()

// i18n
const { locale } = useI18n()

// show websocket menu
const showWebSocket = ref<boolean>(false)

// 窄视图显示/隐藏菜单
const showToggleButton = ref<boolean>(
    mobile
)
const showFormLayout = ref<boolean>(
    !mobile
)

// 显示操作菜单
const showActionMenu = ref<boolean>(false)


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
        link.download = store.exportFileName || "MyCard"
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