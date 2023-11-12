<template>
    <Vue3DraggableResizable class="z--1"
                            :lockAspectRatio="true" 
                            :parent="true"
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
        <img :src="props.url" alt="cardbg" class="position-relative w-100% h-100%"/>
    </Vue3DraggableResizable>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const props = defineProps<{
    url: string
}>()

// 卡面图片拖拽缩放控制
const cardPicData = reactive({
    x: 100,
    y: 100,
    h: 250,
    w: 250,
    active: false
})

</script>