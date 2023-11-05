<template>
    <div name="minion-card" class="position-relative flex justify-center w-100% h-100%">
        <!-- 卡底：单职业 随从牌 -->
        <img :src="minionURL"
            class="position-absolute top--20px z-1"/>

        <!-- 随从种族：野兽，元素等 -->
        <template v-if="store.cardKind.length > 0">
            <img src="@/assets/materials/minion-kind.png"
            class="position-absolute top-548px translate-x-4px z-1"/>
            <!-- 种族文字 -->
            <p class="position-absolute top-548px translate-x-4px z-1 font-size-22px">
                {{ store.cardKind }}
            </p>
        </template>

        <!-- 稀有度遮罩 -->
        <img src="@/assets/materials/rareness-mask.png"
             class="position-absolute top-370px translate-x-13px z-1"/>

        <!-- 随从名称框 -->
        <img src="@/assets/materials/minion-name.png"
             class="position-absolute top-323px z-2"/>

        <!-- 随从描述底框 -->
        <img src="@/assets/materials/minion-description-area.png"
             class="position-absolute top-407px z-2"/>

    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/useStore';
import { computed } from 'vue';

const store = useStore()

// 单职业随从
const minionURL = computed<string>(
    () => new URL(`../assets/minions/single-class/${store.cardClass}-minion.png`, import.meta.url).href
)


</script>