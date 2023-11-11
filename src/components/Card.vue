<template>
    <div id="card" class="position-relative flex justify-center w-100% h-100%">
        <!-- 随从牌 -->
        <template v-if="store.cardType === CardType.Minion">
            <!-- 卡底 -->
            <!-- 单职业 随从牌 -->
            <img :src="minionBaseURL"
                class="position-absolute top--20px z-0"
                v-if="store.classType === ClassType.Single"/>

            <!-- 双职业 随从牌 -->
            <template v-else>
                <!-- 左边 -->
                <img :src="dualClassMinionLeftURL"
                    class="position-absolute top--20px z-0"/>

                <!-- 分割线 -->
                <img src="@/assets/materials/minion/dual-classes-split.png"
                    class="position-absolute translate-x-2px top-395px z-1"/>
            
                <!-- 右边 -->
                <img :src="dualClassMinionRightURL"
                    class="position-absolute top--20px z-0 translate-x--0.5px"/>
            </template>
        

            <!-- 随从种族：野兽，元素等 -->
            <template v-if="store.cardKind.length > 0">
                <img src="@/assets/materials/minion/minion-kind.png"
                class="position-absolute top-546px translate-x-4px z-3"/>
                <!-- 种族文字 -->
                <p class="position-absolute top-550px translate-x-4px z-3 font-size-22px font-family-GBJenLei">
                    {{ store.cardKind }}
                </p>
            </template>

            <!-- 稀有度 -->
            <template v-if="store.rarity !== Rarity.None">
                <!-- 稀有度遮罩 -->
                <img src="@/assets/materials/rarity/rarity-mask.png"
                    class="position-absolute top-370px translate-x-13px z-1"/>

                <!-- 稀有度宝石 -->
                <img :src="rarityCrystalURL"
                    class="position-absolute top-381px translate-x-6.5px z-2"/>
                
                <!-- 橙卡龙框 -->
                <img src="@/assets/materials/minion/minion-dragon.png"
                    class="position-absolute top-21px translate-x-50px z-5"
                    v-if="store.rarity === Rarity.Legandary"/>
            </template>

            <!-- 随从名称框 -->
            <img src="@/assets/materials/minion/minion-name.png"
            class="position-absolute top-323px z-2"/>

            <!-- 随从描述底框 -->
            <img src="@/assets/materials/minion/minion-description-area.png"
                class="position-absolute top-407px z-1"/>

            <!-- 法力值消耗水晶 -->
            <img src="@/assets/materials/cost/cost-crystal.png"
                class="position-absolute top-60px translate-x--160px z-1"/>

            <!-- 法力值消耗数值 -->
            <div :class="
            `position-absolute top--30px z-2 font-family-GBJenLei font-size-57px 
            ${store.cost < 10 && `translate-x--160px`}
            ${store.cost >= 10 && `translate-x--165px`}`">
                <Number :num="store.cost"/>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ClassType } from '@/datatypes/cardClass';
import { CardType, Rarity } from '@/datatypes/cardType';
import Number from '@/components/Number.vue';
import { useStore } from '@/store/useStore';
import { computed } from 'vue';

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
</script>