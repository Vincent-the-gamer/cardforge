<template>
    <!-- SVG绘制弧线文字 -->
    <svg :width="props.width" :height="props.height"
         :class="props.class">
        <defs>
            <path id="MyPath" :d="props.textPath" />
        </defs>
        <text class="fill-white">
            <textPath xlink:href="#MyPath" startOffset="50%" text-anchor="middle">
                <slot/>
            </textPath>
        </text>
        <path :d="props.assistPath ? props.assistPath : 'M -500 150 C0 160 260 0 500 165'" 
              class="fill-none"/>
    </svg>
</template>

<script lang="ts" setup>
const props = defineProps<{
    width: string,
    height: string,
    textPath: string,
    assistPath?: string,
    class?: string
}>()


</script>