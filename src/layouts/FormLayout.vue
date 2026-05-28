<template>
    <div
        class="inline-block w-40vw max-w-420px h-80vh font-family-BlizzardGlobal border-rd-10px overflow-y-auto overflow-x-hidden scrollbar-thin"
    >
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}
.scrollbar-thin::-webkit-scrollbar {
    width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>
