<template>
    <header class="position-fixed h-40px z-10 top-0 left-0 w-100% font-family-GBJenLei"
        :class="`${isDark ? 'bg-rgba-156-156-156-0.2' : 'bg-rgba-156-156-156-0.8'}`">
        <img src="@/assets/logo/cardforge-logo.png" class="position-absolute left-0 h-100% m-0 inline" />
        <h2 class="position-relative m-0 w-fit h-100% top-6px left-45px">
            {{ $t("headerTitle") }}
        </h2>
        <div class="position-absolute top-0 right-0 h-100% flex items-center">
            <span class="m-r-5px">{{ $t("lang") }}：</span>
            <!-- Switch Language 切换语言 -->
            <select v-model="locale" class="position-relative h-90% m-r-8px select"
                :class="`${isDark ? 'color-white border-white' : 'color-black border-black'}`">
                <option value="zh">简体中文</option>
                <option value="en">English</option>
            </select>
            <button class="button h-35px w-fit m-r-7px" :class="`${isDark ? 'color-white border-white' : 'color-black border-black'}`"
                @click="toggleDark()">
                切换主题
            </button>
            <button class="h-35px w-fit button"
                :class="`${isDark ? 'color-white border-white' : 'color-black border-black'}`"
                @click="() => openPage('https://github.com/vincent-the-gamer/cardforge')">
                <div class="i-grommet-icons-github w-20px h-20px m-r-5px" />
                <span class="font-size-20px font-family-GBJenLei">GitHub</span>
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()

const isDark = useDark()
const toggleDark = useToggle(isDark)

function openPage(url: string) {
    window.open(url)
}
</script>