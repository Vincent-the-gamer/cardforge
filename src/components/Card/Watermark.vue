<template>
    <img :src="minionWatermark" alt="watermark"/>
</template>

<script setup lang="ts">
import { CardType } from '@/datatypes/card';
import { useStore } from '@/store/useStore';
import { computed } from 'vue';

const props = defineProps<{
    cardType: CardType
}>()

const store = useStore()


// 水印框
// 随从
const minionWatermark = computed<string>(() => {
    if(props.cardType === CardType.BattlegroundMinion){
        return new URL(`../../assets/materials/watermark/${CardType.Minion}/${store.watermark}.png`, import.meta.url).href
    } else {
        return new URL(`../../assets/materials/watermark/${props.cardType}/${store.watermark}.png`, import.meta.url).href
    }
})
</script>