<template>
    <footer class="position-fixed bottom-0 left-0 w-100% h-30px z-1 bg-rgba-156-156-156-0.5 font-family-GBJenLei flex justify-center">
        <h4 class="position-absolute top--16px">
            @2023
            <a href="https://github.com/vincent-the-gamer" target="_blank"
               class="color-white hover:color-pink transition-all-250">
               Vincent-the-gamer
            </a>
            | {{ version.charAt(0) === "0" ? "Alpha " : "" }} Version: v{{ version }}
        </h4>
    </footer>
</template>

<script lang="ts" setup>
    import { version } from "~/package.json"
</script>