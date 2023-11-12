<template>
    <div id="card" class="position-relative flex justify-center w-100% h-100% z-2">
        <!-- 随从牌 -->
        <template v-if="store.cardType === CardType.Minion">
            <!-- 卡底 -->
            <!-- 单职业 随从牌 -->
            <img :src="minionBaseURL"
                class="position-absolute top--20px z-1 pointer-events-none"
                v-if="store.classType === ClassType.Single"/>

            <!-- 双职业 随从牌 -->
            <template v-else>
                <!-- 左边 -->
                <img :src="dualClassMinionLeftURL"
                    class="position-absolute top--20px z-1 pointer-events-none"/>

                <!-- 分割线 -->
                <img src="@/assets/materials/minion/dual-classes-split.png"
                    class="position-absolute translate-x-2px top-395px z-2 pointer-events-none"/>
            
                <!-- 右边 -->
                <img :src="dualClassMinionRightURL"
                    class="position-absolute top--20px z-1 translate-x--0.5px pointer-events-none"/>
            </template>
        
            <!-- 随从名称 -->
            <template v-if="store.name">
                <p class="color-white position-absolute top-310px z-4 font-size-30px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
                    {{ store.name }}
                </p>
            </template>

            <!-- 随从种族：野兽，元素等 -->
            <!-- 单种族 -->
            <template v-if="store.kindType === KindType.Single && store.cardKind.length > 0">
                <img src="@/assets/materials/common/card-kind.png"
                class="position-absolute top-546px translate-x-7px z-4 pointer-events-none"/>
                <!-- 种族文字 -->
                <p class="position-absolute top-550px translate-x-7px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
                    {{ store.cardKind }}
                </p>
            </template>

            <!-- 双种族 -->
            <template v-else-if="
                store.kindType === KindType.Dual &&
                (store.dualCardKind.up !== '' || store.dualCardKind.down !== '')
            ">
                <img src="@/assets/materials/common/dual-card-kind.png"
                class="position-absolute top-560px translate-x-7px z-4 pointer-events-none"/>
                <!-- 种族1文字 -->
                <p class="position-absolute top-550px translate-x-7px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
                    {{ store.dualCardKind.up }}
                </p>
                <!-- 种族2文字 -->
                <p class="position-absolute top-570px translate-x-7px z-4 font-size-22px font-family-GBJenLei hearth-stroke-1.2px pointer-events-none">
                    {{ store.dualCardKind.down }}
                </p>
            </template>

            <!-- 稀有度 -->
            <template v-if="store.rarity !== Rarity.None">
                <!-- 稀有度遮罩 -->
                <img src="@/assets/materials/rarity/rarity-mask.png"
                    class="position-absolute top-370px translate-x-13px z-2 pointer-events-none"/>

                <!-- 稀有度宝石 -->
                <img :src="rarityCrystalURL"
                    class="position-absolute top-381px translate-x-6.5px z-3 pointer-events-none"/>
                
                <!-- 橙卡龙框 -->
                <img src="@/assets/materials/minion/minion-dragon.png"
                    class="position-absolute top-21px translate-x-50px z-6 pointer-events-none"
                    v-if="store.rarity === Rarity.Legandary"/>
            </template>

            <!-- 随从名称框 -->
            <img src="@/assets/materials/minion/minion-name.png"
            class="position-absolute top-323px z-3 pointer-events-none"/>

            <!-- 随从描述底框 -->
            <img src="@/assets/materials/minion/minion-description-area.png"
                class="position-absolute top-407px z-2 pointer-events-none"/>

            <!-- 随从描述内容 -->
            <template v-if="store.description">
                <div class="position-absolute top-420px w-280px h-141px z-5 flex justify-center items-center">
                    <h3 :class="`position-relative top-0 left-0 m-0 m-auto w-fit h-fit white-space-pre-wrap 
                    font-family-BlizzardGlobal color-black font-100 text-center pointer-events-none`"
                    :style="{ fontSize: `${store.desFontSize}px`}"
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

            <!-- 攻击力，生命值底框 -->
            <img src="@/assets/materials/common/attack.png"
                class="position-absolute top-505px translate-x--170px z-4 pointer-events-none"/>

            <img src="@/assets/materials/common/vitality.png"
                class="position-absolute top-511px translate-x-156px z-4 pointer-events-none"/> 

            <!-- 攻击力，生命值数值 -->
            <div :class="`position-absolute top-457px z-4 font-size-48px pointer-events-none
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

            <!-- 卡牌背景图片 -->
            <CardBackground v-if="props.imageUrl" :url="props.imageUrl"/>
        </template>
     
    </div>
</template>

<script lang="ts" setup>
import { ClassType, KindType } from '@/datatypes/cardClass';
import { CardType, Rarity } from '@/datatypes/cardType';
import CardBackground from '@/components/CardBackground.vue';
import Number from '@/components/Number.vue';
import { useStore } from '@/store/useStore';
import { computed } from 'vue';

const props = defineProps<{
    imageUrl: string
}>()

const store = useStore()

// 单职业随从
// 卡底
const minionBaseURL = computed<string>(
    () => new URL(`../assets/minions/single-class/${store.cardClass}-minion.png`, import.meta.url).href
)

// 双职业随从
// 左卡底
const dualClassMinionLeftURL = computed<string>(
    () => new URL(`../assets/minions/dual-class/left/${store.dualCardClass.left}-minion-left.png`, import.meta.url).href
)
// 右卡底
const dualClassMinionRightURL = computed<string>(
    () => new URL(`../assets/minions/dual-class/right/${store.dualCardClass.right}-minion-right.png`, import.meta.url).href
)

// 稀有度
const rarityCrystalURL = computed<string>(
    () => {
        if(store.rarity === Rarity.None){
            return ""
        }
        return new URL(`../assets/materials/rarity/${store.rarity}-crystal.png`, import.meta.url).href
    }
)

// 对描述的字体进行关键词等标记的特殊样式处理
const styledDescription = computed<string>(() => {
    // 加粗
    const boldPattern = /\*\*(.*?)\*\*/
    const matchbold: RegExpMatchArray | null = store.description.match(boldPattern)
    if(matchbold){
        for(let i = 1; i < matchbold.length; i++){
            store.description = store.description.replace(
                boldPattern, 
                `<span style="font-weight: bold; text-shadow: 0 0 1px black;">${matchbold[i]}</span>`
            )
        }
    }

    // 斜体
    const italicPattern = /~(.*?)~/
    const matchItalic: RegExpMatchArray | null = store.description.match(italicPattern)
    if(matchItalic){
        for (let i = 0; i < matchItalic.length; i++) {
            store.description = store.description.replace(
                italicPattern, 
                `<span style="font-style: italic;">${matchItalic[i]}</span>`
            )
        }
    }

    return store.description
})



</script>