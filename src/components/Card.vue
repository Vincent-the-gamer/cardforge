<template>
    <div name="minion-card" class="position-relative flex justify-center w-100% h-100%">
        <!-- 卡底： 随从牌 -->
        <img :src="getImageUrl(store.cardClass)"
            class="position-absolute top--20px z-1"/>
        <!-- 随从种类：野兽，元素等 -->
        <img src="@/assets/materials/minion-type.png"
            class="position-absolute top-548px translate-x-4px z-1"/>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/useStore';

const store = useStore()

function getImageUrl(cardClass: string){
    return new URL(`@/assets/minions/${cardClass}-minion.png`, import.meta.url).href
}

</script>