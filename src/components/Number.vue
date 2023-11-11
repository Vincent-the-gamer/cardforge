<template>
    <h1 class="color-white font-light hearth-stroke">
        {{ props.num }}
    </h1>
</template>

<script lang="ts" setup>
const props = defineProps<
    {
        num: number
    }
>()
</script>