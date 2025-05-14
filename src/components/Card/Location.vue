<template>
    <!-- 地标牌 -->

    <!-- 卡底 -->
    <!-- 单职业 地标牌-->
    <img :src="locationBaseURL"
        class="position-absolute top--20px z-1 pointer-events-none"
        v-if="store.classType === ClassType.Single"/>

    <!-- 双职业 地标牌 -->
    <template v-else>
        <!-- 左边 -->
        <img :src="dualClassLocationLeftURL"
            class="position-absolute top--20px z-1 pointer-events-none"/>

        <!-- 分割线 -->
        <img src="@/assets/materials/location/location-dual-classes-split.png"
            class="position-absolute top-372px z-2 pointer-events-none"/>
    
        <!-- 右边 -->
        <img :src="dualClassLocationRightURL"
            class="position-absolute top--20px z-1 translate-x--0.5px pointer-events-none"/>

        <!-- 原画框 -->
        <img src="@/assets/materials/location/location-picture-frame.png"
            class="position-absolute top-12px z-1 pointer-events-none"/>

    </template>

    <!-- 地标名称 -->
    <template v-if="store.name">
        <p class="position-absolute pointer-events-none">
            <!-- SVG绘制弧线文字 -->
            <ArcText width="400px" height="200px" 
                     text-path="M10 42 Q160 133 405 86"
                     class="font-family-GBJenLei color-white hearth-stroke-1.2px top-312px z-4 font-size-29px position-absolute
    translate-x--200px translate-y--45px rotate--5deg">
                {{ store.name }}
            </ArcText>
        </p>
    </template>


    <!-- 稀有度 -->
    <template v-if="store.rarity !== Rarity.None">
        <!-- 稀有度遮罩 -->
        <img src="@/assets/materials/location/location-rarity-mask.png"
            class="position-absolute top-391px z-3 pointer-events-none"/>

        <!-- 稀有度宝石 -->
        <img :src="rarityCrystalURL"
            class="position-absolute top-393px translate-x--1px z-3 pointer-events-none"/>
        
        <!-- 橙卡龙框 -->
        <img src="@/assets/materials/location/location-dragon.png"
            class="position-absolute top--5px translate-x-65px z-6 pointer-events-none"
            v-if="store.rarity === Rarity.Legandary"/>
    </template>

    <!-- 法力值消耗水晶 -->
    <img src="@/assets/materials/cost/cost-crystal.png"
        class="position-absolute top-69px translate-x--160px z-2 pointer-events-none"/>

    <!-- 法力值消耗数值 -->
    <div :class="
    `position-absolute top--22px z-3 font-size-57px pointer-events-none
    ${store.cost < 10 && `translate-x--160px`}
    ${store.cost >= 10 && `translate-x--165px`}`">
        <Number :num="store.cost"/>
    </div>

    <!-- 地标名称框 -->
    <img src="@/assets/materials/location/location-name.png"
    class="position-absolute top-325px translate-x-7px z-3 pointer-events-none"/>

    <!-- 地标描述底框 -->
    <!-- 无水印时 -->
    <img v-if="store.watermark === WaterMark.None" src="@/assets/materials/location/location-description-area.png"
         class="position-absolute top-395px z-2 pointer-events-none"/>
    <!-- 有水印时 -->
    <Watermark v-else :card-type="CardType.Location"
               class="position-absolute top-395px z-2 pointer-events-none"/>

    <!-- 左上角旗帜 -->
    <img :src="flagPicture" v-if="store.flag !== Flag.None"
         class="position-absolute top-78px translate-x--159px z-1 pointer-events-none"/>

    <!-- 法术描述内容 -->
    <template v-if="store.description">
        <div class="position-absolute top-442px w-273px h-130px z-5 flex justify-center items-center">
            <h3 :class="`position-relative top-0 left-0 m-0 m-auto w-fit h-fit white-space-pre-wrap 
            font-family-BlizzardGlobal color-black font-100 text-center pointer-events-none
            ${locale === 'zh' ? 'font-family-BlizzardGlobal' : 'font-family-FranklinGothic'}`"
            :style="{ fontSize: `${store.desFontSize}px` }"
            v-html="styledDescription">
            </h3>
        </div>
    </template>

    <!-- 耐久度 -->
    <!-- 底框 -->
    <img src="@/assets/materials/weapon/weapon-durability.png"
        class="position-absolute top-525px translate-x-163px z-4 pointer-events-none"/> 

    <!-- 数值 -->
    <div :class="`position-absolute top-458px z-4 font-size-48px
    ${store.vitality < 10 && `translate-x-162px`}
    ${store.vitality >= 10 && `translate-x-160px`}
    `">
        <Number :num="store.vitality"/>
    </div>

    <!-- 卡面图片 -->
    <CardFace v-if="store.cardFaceUrl" :url="store.cardFaceUrl"/>
    <!-- 遮罩 -->
    <Mask position-absolute z--2
          :card-type="CardType.Location"
          v-show="true || store.cardType === CardType.Location && store.showMask"/>
</template>

<script lang="ts" setup>
const store = useStore()

const { locale } = useI18n()

// 单职业地标
// 卡底
const locationBaseURL = computed<string>(
    () => new URL(`../../assets/locations/single-class/${store.cardClass}-location.png`, import.meta.url).href
)

// 双职业地标
// 左卡底
const dualClassLocationLeftURL = computed<string>(
    () => new URL(`../../assets/locations/dual-class/left/${store.dualCardClass.left}-location-left.png`, import.meta.url).href
)
// 右卡底
const dualClassLocationRightURL = computed<string>(
    () => new URL(`../../assets/locations/dual-class/right/${store.dualCardClass.right}-location-right.png`, import.meta.url).href
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
const styledDescription = useStyledDescription()

</script>