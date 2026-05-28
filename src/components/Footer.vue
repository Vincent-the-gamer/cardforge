<template>
    <footer
        fixed
        bottom-0
        left-0
        w-full
        h-30px
        z-10
        font-family-GBJenLei
        flex="~ justify-center"
        backdrop-blur-8px
        transition-all-300
        :class="isDark ? 'bg-rgba-20-20-30-0.6' : 'bg-rgba-255-255-255-0.5'"
    >
        <h4
            class="position-absolute top--16px font-light"
            :class="isDark ? 'color-white/70' : 'color-black/70'"
        >
            @2023-present
            <a
                href="https://github.com/vincent-the-gamer"
                target="_blank"
                class="hover:color-pink transition-all-200"
            >
                Vincent-the-gamer
            </a>
            | {{ props.isAlpha ? "Alpha " : "" }} Version: v{{ version }}
            | MIT Licensed
        </h4>
    </footer>
</template>

<script lang="ts" setup>
import { version } from "../../package.json";

const isDark = useDark();

const props = defineProps<{
    isAlpha?: boolean;
}>();
</script>
