<template>
    <div
        flex="~ row justify-center items-center"
        absolute
        h-full
        w-full
        top-0
        hide-scrollbar
    >
        <!-- 移动端打开/关闭菜单 -->
        <button
            fixed
            z-9
            top-45px
            left-10px
            w-40px
            h-40px
            dark:color-white
            dark:border-white
            dark:bg-black
            bg-transparent
            border-1px
            border-solid
            border-black
            color-black
            border-rd-8px
            hover:bg-black
            hover:color-white
            hover:cursor-pointer
            hover:shadow-md
            transition-all-300
            v-show="showToggleButton"
            @click="showFormLayout = !showFormLayout"
        >
            <div i-grommet-icons-menu relative w-full h-full />
        </button>
        <!-- 操作菜单切换显示按钮 -->
        <button
            z-9
            fixed
            top-12
            right-4
            w-40px
            h-40px
            color-black
            dark:color-white
            dark:border-white
            dark:bg-black
            hover:bg-black
            hover:color-white
            hover:cursor-pointer
            hover:shadow-md
            border="black rd-8 solid 1px"
            transition-all-300
            @click="showActionMenu = !showActionMenu"
            :class="
                showActionMenu
                    ? 'bg-black! color-white! dark:bg-white! dark:color-black!'
                    : ''
            "
        >
            <div i-grommet-icons-apps-rounded relative w-full h-full />
        </button>
        <FormLayout
            v-show="showFormLayout"
            m-r-5px
            z-8
            p-t-10px
            p-b-25px
            position-relative
            top-0
            w-400px
            flex="~ col justify-center items-center"
            w-fit
            class="form-panel backdrop-blur-16px border-rd-12px border-1px border-solid border-white/10"
            :class="
                isDark
                    ? 'bg-[#1a1a2e]/65 color-white shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
                    : 'bg-[#0f0f23]/75 color-white shadow-[0_8px_40px_rgba(0,0,0,0.3)]'
            "
        >
            <div class="h-100%">
                <p class="flex justify-center items-center m-0">
                    <span>{{ $t("cardType") }}：</span>
                    <select class="select w-fit" v-model="store.cardType">
                        <option :value="CardType.Minion">
                            {{ $t("minion") }}
                        </option>
                        <option :value="CardType.Spell">
                            {{ $t("spell") }}
                        </option>
                        <option :value="CardType.Weapon">
                            {{ $t("weapon") }}
                        </option>
                        <option :value="CardType.Hero">{{ $t("hero") }}</option>
                        <option :value="CardType.BattlegroundMinion">
                            {{ $t("battlegroundsMinion") }}
                        </option>
                        <option :value="CardType.Location">
                            {{ $t("location") }}
                        </option>
                    </select>
                </p>
                <MinionMenu v-if="store.cardType === CardType.Minion" />
                <SpellMenu v-else-if="store.cardType === CardType.Spell" />
                <WeaponMenu v-else-if="store.cardType === CardType.Weapon" />
                <HeroMenu v-else-if="store.cardType === CardType.Hero" />
                <BattlegroundMinionMenu
                    v-else-if="store.cardType === CardType.BattlegroundMinion"
                />
                <LocationMenu
                    v-else-if="store.cardType === CardType.Location"
                />
            </div>
        </FormLayout>

        <CardLayout
            card-layout
            flex="~ col justify-center items-center"
            h-full
            w-550px
            overflow-hidden
        >
            <Card :class="`position-absolute h-700px translate-y-10px`" />
            <!-- 操作菜单 -->
            <div
                fixed
                h-fit
                p-5
                right-15
                top-15
                backdrop-blur-16px
                border="1px solid white/10"
                border-rd-12px
                shadow="0 8px 40px rgba(0,0,0,0.45)"
                z-2
                color-white
                v-if="showActionMenu"
                :class="isDark ? 'bg-[#0f0f23]/88' : 'bg-[#0f0f23]/88'"
            >
                <p
                    align="center"
                    :class="`m-0 mb-3 color-yellow/80 font-size-13px ${locale === 'en' && 'font-size-11px'}`"
                >
                    {{ $t("cardHint") }}
                </p>
                <label
                    class="flex justify-center items-center gap-2 mb-3 cursor-pointer text-sm"
                >
                    <span>{{ $t("lockAspectRatio") }}</span>
                    <input type="checkbox" v-model="store.lockAspectRatio" />
                </label>
                <div class="flex justify-center items-center gap-2 mb-3">
                    <span class="text-sm whitespace-nowrap">{{
                        $t("fileName")
                    }}</span>
                    <input
                        type="text"
                        v-model="store.exportFileName"
                        class="input-text w-120px h-30px text-xs"
                    />
                </div>
                <div class="flex justify-center items-center m-0 gap-2">
                    <div class="relative inline-block">
                        <input
                            type="file"
                            accept="image/*"
                            @change="handleUpload"
                            class="absolute inset-0 opacity-0 cursor-pointer z-1"
                        />
                        <button class="button h-40px w-auto z-0">
                            {{ $t("uploadCardFace") }}
                        </button>
                    </div>
                    <button class="button h-40px w-auto" @click="generateImage">
                        {{ $t("generatePicture") }}
                    </button>
                </div>
            </div>
        </CardLayout>
    </div>
</template>

<script lang="ts" setup>
import { domToPng } from "modern-screenshot";
import CardLayout from "./CardLayout.vue";
import FormLayout from "./FormLayout.vue";
import { isMobile } from "@/utils/isMobile";

const mobile: boolean = isMobile();

// websocket menu hide & show
const wsRef = ref<HTMLElement | null>(null);

const { isOutside } = useMouseInElement(wsRef);
watch(
    () => isOutside.value,
    (newVal) => {
        newVal ? (showWebSocket.value = false) : (showWebSocket.value = true);
    },
);

// store
const store = useStore();

// theme
const isDark = useDark();

// i18n
const { locale } = useI18n();

// show websocket menu
const showWebSocket = ref<boolean>(false);

// 窄视图显示/隐藏菜单
const showToggleButton = ref<boolean>(mobile);
const showFormLayout = ref<boolean>(!mobile);

// 显示操作菜单
const showActionMenu = ref<boolean>(false);

// 根据页面宽度来控制控件的显示
window.addEventListener("resize", () => {
    let width = window.innerWidth;
    if (width >= 1024) {
        showFormLayout.value = true;
        showToggleButton.value = false;
    } else {
        showToggleButton.value = true;
        showFormLayout.value = false;
    }
});

// 处理上传逻辑
function handleUpload(e: any) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            store.setCardFaceUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// 生成图片
async function generateImage() {
    const card = document.getElementById("card") as HTMLElement;
    if (!card) return;

    // 开启遮罩并等待 DOM 更新
    store.setShowMask(true);
    await nextTick();
    // 额外等待一帧确保渲染完成
    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
        const dataUrl = await domToPng(card, {
            width: card.offsetWidth,
            height: card.offsetHeight,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = store.exportFileName || "MyCard";
        link.click();
    } finally {
        store.setShowMask(false);
    }
}

// cardType切换时清空description, 否则也会将正则匹配替换的结果显示到菜单中
watch(
    () => store.cardType,
    () => {
        store.setDescription("");
        // 武器没有双派系
        if (store.cardType === CardType.Weapon) {
            store.kindType = KindType.Single;
        }
    },
);
</script>

<style scoped>
/* 页面容器不显示滚动条 */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.toggle-menu {
    position: fixed;
    top: 50px;
    left: 20px;
}

.form-panel {
    position: fixed;
    top: 50px;
    left: 60px;
}

.card-layout {
    overflow: auto;
}
</style>
