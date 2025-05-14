<template>
    <!-- 法术牌 -->

    <!-- 卡底 -->
    <!-- 单职业 法术牌 -->
    <img :src="spellBaseURL"
        class="position-absolute top--20px z-1 pointer-events-none"
        v-if="store.classType === ClassType.Single"/>

    <!-- 双职业 法术牌 -->
    <template v-else>
        <!-- 左边 -->
        <img :src="dualClassSpellLeftURL"
            class="position-absolute top--20px z-1 pointer-events-none"/>

        <!-- 分割线 -->
        <img src="@/assets/materials/spell/spell-dual-classes-split.png"
            class="position-absolute top-88px z-2 pointer-events-none"/>
    
        <!-- 右边 -->
        <img :src="dualClassSpellRightURL"
            class="position-absolute top--20px z-1 translate-x--0.5px pointer-events-none"/>
    </template>

    <!-- 法术名称 -->
    <template v-if="store.name">
        <p class="position-absolute pointer-events-none">
            <!-- SVG绘制弧线文字 -->
            <ArcText width="400px" height="200px" 
                     text-path="M -28 110 C 40 100 250 0 490 165"
                     assist-path="M 30 150 C0 110 240 0 500 190"
                     class="font-family-GBJenLei color-white hearth-stroke-1.2px top-312px z-4 font-size-30px position-absolute
    translate-x--234px translate-y--40px rotate--5deg">
                {{ store.name }}
            </ArcText>
        </p>
    </template>

    <!-- 法术派系 -->
    <!-- 单派系 -->
    <template v-if="store.kindType === KindType.Single && store.cardKind.length > 0">
        <img src="@/assets/materials/spell/spell-kind.png"
        class="position-absolute top--21px z-4 pointer-events-none"/>
        <!-- 派系文字 -->
        <p class="position-absolute top-550px color-white z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.cardKind }}
        </p>
    </template>

    <!-- 双派系 -->
    <template v-else-if="
        store.kindType === KindType.Dual &&
        (store.dualCardKind.up !== '' || store.dualCardKind.down !== '')
    ">
        <img src="@/assets/materials/spell/dual-spell-kind.png"
        class="position-absolute top--21px z-4 pointer-events-none"/>
        <!-- 派系1文字 -->
        <p class="position-absolute top-553px color-white z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.dualCardKind.up }}
        </p>
        <!-- 派系2文字 -->
        <p class="position-absolute top-573px color-white z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.dualCardKind.down }}
        </p>
    </template>

    <!-- 稀有度 -->
    <template v-if="store.rarity !== Rarity.None">
        <!-- 稀有度遮罩 -->
        <img src="@/assets/materials/spell/spell-rarity-mask.png"
            class="position-absolute top-379px z-2 pointer-events-none"/>

        <!-- 稀有度宝石 -->
        <img :src="rarityCrystalURL"
            class="position-absolute top-390px z-3 pointer-events-none"/>
        
        <!-- 橙卡龙框 -->
        <img src="@/assets/materials/spell/spell-dragon.png"
            class="position-absolute top-49px translate-x-68px z-6 pointer-events-none"
            v-if="store.rarity === Rarity.Legandary"/>
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

    <!-- 法术名称框 -->
    <img src="@/assets/materials/spell/spell-name.png"
    class="position-absolute top-316px z-3 pointer-events-none"/>

    <!-- 法术描述底框 -->
    <!-- 无水印时 -->
    <img v-if="store.watermark === WaterMark.None" src="@/assets/materials/spell/spell-description-area.png"
         class="position-absolute top--20px z-2 pointer-events-none"/>
    <!-- 有水印时 -->
    <Watermark v-else :card-type="CardType.Spell"
               class="position-absolute top-390px translate-x--1px z-2 pointer-events-none"/>

    <!-- 法术描述内容 -->
    <template v-if="store.description">
        <div class="position-absolute top-435px w-273px h-130px z-5 flex justify-center items-center">
            <h3 :class="`position-relative top-0 left-0 m-0 m-auto w-fit h-fit white-space-pre-wrap 
            font-family-BlizzardGlobal color-black font-100 text-center pointer-events-none
            ${locale === 'zh' ? 'font-family-BlizzardGlobal' : 'font-family-FranklinGothic'}`"
            :style="{ fontSize: `${store.desFontSize}px` }"
            v-html="styledDescription">
            </h3>
        </div>
    </template>

    <!-- 卡面图片 -->
    <CardFace v-if="store.cardFaceUrl" :url="store.cardFaceUrl"/>
    <!-- 遮罩 -->
    <Mask absolute z--2
          :card-type="CardType.Spell"
          v-show="store.cardType === CardType.Spell && store.showMask"/>
</template>

<script lang="ts" setup>
const store = useStore()

const { locale } = useI18n()

// 单职业法术
// 卡底
const spellBaseURL = computed<string>(
    () => new URL(`../../assets/spells/single-class/${store.cardClass}-spell.png`, import.meta.url).href
)

// 双职业随从
// 左卡底
const dualClassSpellLeftURL = computed<string>(
    () => new URL(`../../assets/spells/dual-class/left/${store.dualCardClass.left}-spell-left.png`, import.meta.url).href
)
// 右卡底
const dualClassSpellRightURL = computed<string>(
    () => new URL(`../../assets/spells/dual-class/right/${store.dualCardClass.right}-spell-right.png`, import.meta.url).href
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

// 对描述的字体进行关键词等标记的特殊样式处理
const styledDescription = useStyledDescription()

</script>