<template>
    <h1 class="color-white font-light hearth-stroke-2.5px font-family-GBJenLei">
        {{ props.num }}
    </h1>
</template>

<script lang="ts" setup>
const props = defineProps<{
    num: number
}>()
</script>