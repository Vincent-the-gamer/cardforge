<template>
    <Vue3DraggableResizable class="z--2"
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
        <img :src="props.url" alt="cardbg" 
              class="position-relative w-100% h-100%"/>
    </Vue3DraggableResizable>
</template>

<script lang="ts" setup>
/**
 * 卡面图片
 */
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const store = useStore()

const props = defineProps<{
    url: string
}>()

// 卡面图片尺寸数据，用于拖拽和缩放
const cardPicData = reactive({
    x: 390,
    y: 60,
    h: 300,
    w: 300,
    active: false
})
</script>