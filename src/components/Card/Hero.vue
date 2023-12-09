<template>
    <!-- 英雄牌 -->

    <!-- 卡底 -->
    <!-- 单职业 英雄牌 -->
    <img :src="heroBaseURL"
        class="position-absolute top--20px z-1 pointer-events-none"
        v-if="store.classType === ClassType.Single"/>

    <!-- 双职业 -->
    <template v-else>
        <!-- 左边 -->
        <img :src="dualClassHeroLeftURL"
            class="position-absolute top--20px z-1 pointer-events-none"/>

        <!-- 分割线 -->
        <img src="@/assets/materials/minion/dual-classes-split.png"
            class="position-absolute translate-x--4px top-395px z-2 pointer-events-none"/>
    
        <!-- 右边 -->
        <img :src="dualClassHeroRightURL"
            class="position-absolute top--20px z-1 translate-x--0.5px pointer-events-none"/>
    </template>

    <!-- 英雄名称 -->
    <template v-if="store.name">
        <p class="position-absolute pointer-events-none">
            <!-- SVG绘制弧线文字 -->
            <ArcText width="400px" height="200px" 
                     text-path="M -28 110 C 120 100 250 0 490 175"
                     class="font-family-GBJenLei color-white hearth-stroke-1.2px top-312px z-4 font-size-28px position-absolute
    translate-x--240px translate-y--40px rotate--5deg">
                {{ store.name }}
            </ArcText>
        </p>
    </template>

    <!-- 英雄派系 -->
    <!-- 单派系 -->
    <template v-if="store.kindType === KindType.Single && store.cardKind.length > 0">
        <img src="@/assets/materials/minion/minion-kind.png"
        class="position-absolute top-546px translate-x-7px z-4 pointer-events-none"/>
        <!-- 派系文字 -->
        <p class="position-absolute top-550px color-white translate-x-5px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.cardKind }}
        </p>
    </template>

    <!-- 双种族 -->
    <template v-else-if="
        store.kindType === KindType.Dual &&
        (store.dualCardKind.up !== '' || store.dualCardKind.down !== '')
    ">
        <img src="@/assets/materials/minion/dual-minion-kind.png"
        class="position-absolute top-560px translate-x-7px z-4 pointer-events-none"/>
        <!-- 种族1文字 -->
        <p class="position-absolute top-550px color-white translate-x-5px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.dualCardKind.up }}
        </p>
        <!-- 种族2文字 -->
        <p class="position-absolute top-570px color-white translate-x-5px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.dualCardKind.down }}
        </p>
    </template>

    <!-- 稀有度 -->
    <template v-if="store.rarity !== Rarity.None">
        <!-- 稀有度遮罩 -->
        <img src="@/assets/materials/hero/hero-rarity-mask.png"
            class="position-absolute top-369px z-3 pointer-events-none"/>

        <!-- 稀有度宝石 -->
        <img :src="rarityCrystalURL"
            class="position-absolute top-381px translate-x--2px z-3 pointer-events-none"/>
        
        <!-- 橙卡龙框 -->
        <img src="@/assets/materials/hero/hero-dragon.png"
            class="position-absolute top-12px translate-x-45px z-6 pointer-events-none"
            v-if="store.rarity === Rarity.Legandary"/>
    </template>

    <!-- 随从名称框 -->
    <img src="@/assets/materials/hero/hero-name.png"
    class="position-absolute top-316px z-3 pointer-events-none"/>

    <!-- 随从描述底框 -->
    <!-- 无水印时 -->
    <img v-if="store.watermark === WaterMark.None" src="@/assets/materials/hero/hero-description-area.png"
        class="position-absolute top-382px z-2 pointer-events-none"/>
    <!-- 有水印时 -->
    <Watermark v-else :card-type="CardType.Hero"
               class="position-absolute top-382px z-2 pointer-events-none"/>

    <!-- 随从描述内容 -->
    <template v-if="store.description">
        <div class="position-absolute top-420px w-280px h-148px z-5 flex justify-center items-center">
            <h3 :class="`position-relative top-0 left-0 m-0 m-auto w-fit h-fit white-space-pre-wrap 
             color-black font-100 text-center pointer-events-none
             ${locale === 'zh' ? 'font-family-BlizzardGlobal' : 'font-family-FranklinGothic'}`"
            :style="{ fontSize: `${store.desFontSize}px` }"
            v-html="styledDescription">
            </h3>
        </div>
    </template>

    <!-- 法力值消耗水晶 -->
    <img src="@/assets/materials/cost/cost-crystal.png"
        class="position-absolute top-60px translate-x--160px z-2 pointer-events-none"/>

    <!-- 法力值消耗数值 -->
    <div :class="
    `position-absolute top--30px z-3 font-size-57px pointer-events-none
    ${store.cost < 10 && `translate-x--160px`}
    ${store.cost >= 10 && `translate-x--165px`}`">
        <Number :num="store.cost"/>
    </div>

    <!-- 左上角旗帜 -->
    <img :src="flagPicture" v-if="store.flag !== Flag.None"
        class="position-absolute top-70px translate-x--159px z-1 pointer-events-none"/>

    <!-- 攻击力，护甲值底框 -->
    <img src="@/assets/materials/common/attack.png"
        class="position-absolute top-505px translate-x--170px z-4 pointer-events-none"
        v-if="store.attack > 0"/>

    <img src="@/assets/materials/common/armor.png"
        class="position-absolute top-528px translate-x-156px z-4 pointer-events-none"/> 

    <!-- 攻击力，护甲值数值 -->
    <div v-if="store.attack > 0"
         :class="`position-absolute top-457px z-4 font-size-48px pointer-events-none
    ${store.attack < 10 && `translate-x--160px`}
    ${store.attack >= 10 && `translate-x--167px`}
    `">
        <Number :num="store.attack"/>
    </div>

    <div :class="`position-absolute top-457px z-4 font-size-48px
    ${store.vitality < 10 && `translate-x-156px`}
    ${store.vitality >= 10 && `translate-x-155px`}
    `">
        <Number :num="store.vitality"/>
    </div>

    <!-- 卡面图片 -->
    <CardFace v-if="store.cardFaceUrl" :url="store.cardFaceUrl"/>
    <!-- 遮罩 -->
    <Mask class="position-absolute z--2"
          :card-type="CardType.Hero"
          v-show="store.cardType === CardType.Hero && store.showMask"/>
</template>

<script lang="ts" setup>
import { ClassType, KindType, Flag, Rarity, CardType, WaterMark } from '@/datatypes/card';
import CardFace from '@/components/CardFace.vue';
import Number from '@/components/Number.vue';
import ArcText from "@/components/ArcText.vue"
import { useStore } from '@/store/useStore';
import { computed } from 'vue';
import Mask from './Mask.vue';
import useStyledDescription from "@/hooks/useStyledDescription"
import Watermark from './Watermark.vue';
import { useI18n } from 'vue-i18n';


const store = useStore()

const { locale } = useI18n()

// 单职业英雄
// 卡底
const heroBaseURL = computed<string>(
    () => new URL(`../../assets/heroes/single-class/${store.cardClass}-hero.png`, import.meta.url).href
)

// 双职业英雄
// 左卡底
const dualClassHeroLeftURL = computed<string>(
    () => new URL(`../../assets/heroes/dual-class/left/${store.dualCardClass.left}-hero-left.png`, import.meta.url).href
)
// 右卡底
const dualClassHeroRightURL = computed<string>(
    () => new URL(`../../assets/heroes/dual-class/right/${store.dualCardClass.right}-hero-right.png`, import.meta.url).href
)

// 稀有度
const rarityCrystalURL = computed<string>(
    () => {
        if(store.rarity === Rarity.None){
            return ""
        }
        return new URL(`../../assets/materials/rarity/${store.rarity}-crystal.png`, import.meta.url).href
    }
)

// 旗帜
const flagPicture = computed<string>(
    () => new URL(`../../assets/materials/flag/${store.flag}-flag.png`, import.meta.url).href
)

// 对描述的字体进行关键词等标记的特殊样式处理
const styledDescription = useStyledDescription(store.cardType)

</script>