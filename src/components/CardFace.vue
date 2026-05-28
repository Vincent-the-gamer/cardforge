<template>
    <Vue3DraggableResizable
        class="z--2 pointer-events-auto"
        :lockAspectRatio="store.lockAspectRatio"
        :initW="cardPicData.w"
        :initH="cardPicData.h"
        v-model:x="cardPicData.x"
        v-model:y="cardPicData.y"
        v-model:w="cardPicData.w"
        v-model:h="cardPicData.h"
        v-model:active="cardPicData.active"
        :draggable="true"
        :resizable="true"
    >
        <img
            :src="props.url"
            alt="cardbg"
            class="position-relative w-100% h-100%"
            draggable="false"
        />
    </Vue3DraggableResizable>
</template>

<script lang="ts" setup>
/**
 * 卡面图片 - 可拖拽缩放的卡面插图
 */
import type { Component } from "vue";
import DraggableModule from "vue3-draggable-resizable";
// CJS interop: Vite wraps the CJS exports namespace as the default export,
// so we need to extract the .default property which holds the actual component
const Vue3DraggableResizable: Component = (
    DraggableModule as { default: Component }
).default;
// 需引入默认样式
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

const store = useStore();

const props = defineProps<{
    url: string;
    cardType: CardType;
}>();

// 不同卡牌类型对应的卡面插图区域默认位置和尺寸
const cardFaceDefaults: Record<
    CardType,
    { x: number; y: number; w: number; h: number }
> = {
    [CardType.Minion]: { x: 120, y: 75, w: 280, h: 370 },
    [CardType.Spell]: { x: 115, y: 80, w: 280, h: 360 },
    [CardType.Weapon]: { x: 115, y: 80, w: 280, h: 350 },
    [CardType.Hero]: { x: 110, y: 70, w: 280, h: 370 },
    [CardType.BattlegroundMinion]: { x: 120, y: 75, w: 280, h: 370 },
    [CardType.Location]: { x: 115, y: 60, w: 280, h: 370 },
};

const defaults = cardFaceDefaults[props.cardType];

// 卡面图片尺寸数据，用于拖拽和缩放
const cardPicData = reactive({
    x: defaults.x,
    y: defaults.y,
    w: defaults.w,
    h: defaults.h,
    active: false,
});

// 卡牌类型切换时重置为对应默认位置
watch(
    () => props.cardType,
    (newType) => {
        const d = cardFaceDefaults[newType];
        cardPicData.x = d.x;
        cardPicData.y = d.y;
        cardPicData.w = d.w;
        cardPicData.h = d.h;
    },
);
</script>
