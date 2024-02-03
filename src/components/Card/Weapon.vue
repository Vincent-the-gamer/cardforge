<template>
    <!-- 武器牌 -->

    <!-- 卡底 -->
    <!-- 单职业 -->
    <img :src="weaponBaseURL"
        class="position-absolute top--20px z-1 pointer-events-none"
        v-if="store.classType === ClassType.Single"/>

    <!-- 双职业 -->
    <template v-else>
        <!-- 左边 -->
        <img :src="dualClassMinionLeftURL"
            class="position-absolute top--20px z-1 pointer-events-none"/>

        <!-- 分割线 -->
        <img src="@/assets/materials/minion/dual-classes-split.png"
            class="position-absolute translate-x-1px top-398px z-2 pointer-events-none"/>
    
        <!-- 右边 -->
        <img :src="dualClassMinionRightURL"
            class="position-absolute top--20px z-1 translate-x--0.5px pointer-events-none"/>
    </template>

    <!-- 名称 -->
    <template v-if="store.name">
        <p class="position-absolute pointer-events-none">
            <span class="font-family-GBJenLei color-white hearth-stroke-1.2px top-314px z-4 font-size-30px position-absolute
    translate-x--200px w-400px h-40px flex justify-center items-center">
                <span>{{ store.name }}</span>
            </span>
        </p>
    </template>

    <!-- 武器派系 -->
    <template v-if="store.kindType === KindType.Single && store.cardKind.length > 0">
        <img src="@/assets/materials/weapon/weapon-kind.png"
        class="position-absolute top-556px z-4 pointer-events-none translate-x--1px"/>
        <!-- 派系文字 -->
        <p class="position-absolute top-542px color-white translate-x-1px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
            {{ store.cardKind }}
        </p>
    </template>

    <!-- 稀有度 -->
    <template v-if="store.rarity !== Rarity.None">
        <!-- 稀有度遮罩 -->
        <img src="@/assets/materials/weapon/weapon-rarity-mask.png"
            class="position-absolute top-364px translate-x-1px z-3 pointer-events-none"/>

        <!-- 稀有度宝石 -->
        <img :src="rarityCrystalURL"
            class="position-absolute top-384px translate-x-1px z-3 pointer-events-none"/>
        
        <!-- 橙卡龙框 -->
        <img src="@/assets/materials/weapon/weapon-dragon.png"
            class="position-absolute top-28.5px translate-x-51px z-6 pointer-events-none"
            v-if="store.rarity === Rarity.Legandary"/>
    </template>

    <!-- 随从名称框 -->
    <img src="@/assets/materials/weapon/weapon-name.png"
    class="position-absolute top-323px z-3 pointer-events-none"/>

    <!-- 武器描述底框 -->
    <!-- 无水印时 -->
    <img v-if="store.watermark === WaterMark.None" src="@/assets/materials/weapon/weapon-description-area.png"
        class="position-absolute top-407px z-2 pointer-events-none"/>
    <!-- 有水印时 -->
    <Watermark v-else :card-type="CardType.Weapon"
               class="position-absolute top-407px z-2 pointer-events-none"/>

    <!-- 武器描述内容 -->
    <template v-if="store.description">
        <div class="position-absolute top-430px w-278px h-135px z-5 flex justify-center items-center">
            <h3 :class="`position-relative top-0 left-0 m-0 m-auto w-fit h-fit white-space-pre-wrap 
             color-white font-100 text-center pointer-events-none
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

    <!-- 攻击力，耐久底框 -->
    <img src="@/assets/materials/weapon/weapon-attack.png"
        class="position-absolute top-530px translate-x--160px z-4 pointer-events-none"/>

    <img src="@/assets/materials/weapon/weapon-durability.png"
        class="position-absolute top-525px translate-x-158px z-4 pointer-events-none"/> 

    <!-- 攻击力，耐久数值 -->
    <div :class="`position-absolute top-457px z-4 font-size-48px pointer-events-none
    ${store.attack < 10 && `translate-x--160px`}
    ${store.attack >= 10 && `translate-x--161px`}
    `">
        <Number :num="store.attack"/>
    </div>

    <div :class="`position-absolute top-457px z-4 font-size-48px
    ${store.vitality < 10 && `translate-x-156px`}
    ${store.vitality >= 10 && `translate-x-156px`}
    `">
        <Number :num="store.vitality"/>
    </div>

    <!-- 卡面图片 -->
    <CardFace v-if="store.cardFaceUrl" :url="store.cardFaceUrl"/>
    <!-- 遮罩 -->
    <Mask class="position-absolute z--2"
          :card-type="CardType.Weapon"
          v-show="store.cardType === CardType.Weapon && store.showMask"/>
</template>

<script lang="ts" setup>
const store = useStore()

const { locale } = useI18n()

// 单职业武器
// 卡底
const weaponBaseURL = computed<string>(
    () => new URL(`../../assets/weapons/single-class/${store.cardClass}-weapon.png`, import.meta.url).href
)

// 双职业武器
// 左卡底
const dualClassMinionLeftURL = computed<string>(
    () => new URL(`../../assets/weapons/dual-class/left/${store.dualCardClass.left}-weapon-left.png`, import.meta.url).href
)
// 右卡底
const dualClassMinionRightURL = computed<string>(
    () => new URL(`../../assets/weapons/dual-class/right/${store.dualCardClass.right}-weapon-right.png`, import.meta.url).href
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