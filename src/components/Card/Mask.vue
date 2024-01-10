<template>
    <div :class="`${isDark ? 'bg-black' : 'bg-pink'} color-transparent w-100% h-680px translate-y--10px overflow-hidden ${props.cardType}-mask-hole`"></div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core';

const props = defineProps<{
    cardType: string
}>()

const isDark = useDark()

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
        50% 10%,
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
        50% 15%,
        65% 14%, 
        79% 20%, 
        80% 50%, 
        40% 100%,
        100% 100%, 
        100% 0%
    );
}

/* 武器遮罩挖孔 */
.weapon-mask-hole {
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

/* 英雄遮罩挖孔 */
.hero-mask-hole {
    clip-path: polygon(
        0% 0%, 
        0% 100%, 
        50% 100%, 
        17% 40%, 
        20% 20%, 
        50% 10%,
        65% 14%, 
        79% 20%, 
        80% 50%, 
        40% 100%,
        100% 100%, 
        100% 0%
    );
}

/* 地标遮罩挖孔 */
.location-mask-hole {
    clip-path: polygon(
        0% 0%, 
        0% 100%, 
        50% 100%, 
        17% 40%, 
        23% 15%, 
        50% 8%,
        70% 12%, 
        80% 18%, 
        80% 50%, 
        40% 100%,
        100% 100%, 
        100% 0%
    );
}
</style>