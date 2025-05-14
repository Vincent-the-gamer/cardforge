<template>
    <div z-2 fixed top-0 left-0 h-40px w-full flex="~ row items-start justify-start" bg-rgba-156-156-156-0.2
        font-family-GBJenLei :class="`${isDark ? 'bg-rgba-156-156-156-0.2' : 'bg-rgba-50-50-50-0.4'}`">
        <div absolute left-0 top-0 h-40px w-full flex="~ row items-center">
            <img src="@/assets/logo/cardforge-logo.png" w-8 h-8 ml-3 />
            <h2 ml-2>
                {{ $t("headerTitle") }}
            </h2>
        </div>
        <div absolute right-5 top-1.1>
            <span>{{ $t("lang") }}：</span>
            <!-- Switch Language 切换语言 -->
            <select v-model="locale" select border-black color-black
            dark:border-white dark:color-white>
                <option value="zh">简体中文</option>
                <option value="en">English</option>
            </select>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const isDark = useDark()

const { locale } = useI18n()
</script>