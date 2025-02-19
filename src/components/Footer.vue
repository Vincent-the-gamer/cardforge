<template>
    <footer class="position-fixed bottom-0 left-0 w-100% h-30px z-10 bg-rgba-156-156-156-0.5 
            font-family-GBJenLei flex justify-center">
        <h4 class="position-absolute top--16px font-light">
            @2023-present
            <a href="https://github.com/vincent-the-gamer" target="_blank"
               class="hover:color-pink transition-all-250">
               Vincent-the-gamer
            </a>
            | {{ props.isAlpha ? "Alpha " : "" }} Version: v{{ version }}
            | MIT Licensed
        </h4>
    </footer>
</template>

<script lang="ts" setup>
import { version } from "../../package.json"
const props = defineProps<{
    isAlpha?: boolean
}>()


</script>