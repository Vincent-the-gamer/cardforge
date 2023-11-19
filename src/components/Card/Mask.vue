<template>
    <div :class="`bg-black color-transparent w-100% h-670px overflow-hidden ${props.cardType}-mask-hole`"></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    cardType: string
}>()

</script>

<style scoped>
/* 随从/酒馆战旗随从遮罩挖孔 */
.minion-mask-hole,
.battleground-minion-mask-hole {
    clip-path: polygon(
        0% 0%, 
        0% 100%, 
        50% 100%, 
        20% 30%, 
        23% 20%, 
        50% 8%,
        65% 14%, 
        79% 30%, 
        40% 90%, 
        48% 100%,
        100% 100%, 
        100% 0%
    );
}

/* 法术遮罩挖孔 */
.spell-mask-hole {
    clip-path: polygon(
        0% 0%, 
        0% 100%, 
        50% 100%, 
        16% 40%, 
        20% 20%, 
        50% 13%,
        65% 14%, 
        79% 20%, 
        80% 50%, 
        40% 100%,
        100% 100%, 
        100% 0%
    );
}
</style>