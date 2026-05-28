<template>
    <div
        class="inline-block w-40vw max-w-420px h-80vh font-family-BlizzardGlobal border-rd-10px overflow-y-auto overflow-x-hidden hide-scrollbar"
    >
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
