<template>
    <div name="minion-card" class="position-relative flex justify-center w-100% h-100%">
        <!-- 卡底： 随从牌 -->
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



    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/useStore';
import { computed } from 'vue';

const store = useStore()

const minionURL = computed<string>(
    () => new URL(`../assets/minions/${store.cardClass}-minion.png`, import.meta.url).href
)


</script>