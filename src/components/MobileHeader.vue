<template>
    <div class="position-fixed top-0 h-40px flex items-center justify-center bg-rgba-156-156-156-0.2 font-family-GBJenLei">
        <img src="@/assets/logo/cardforge-logo.png" class="position-relative left-25% h-100% m-0"/>
        <h2 class="position-relative m-0 w-fit h-100% top-6px left-28%">
            {{ $t("headerTitle") }}
        </h2>
    </div>
    <div class="position-fixed top-40px left-40% h-fit w-fit font-family-GBJenLei">
        <span>{{ $t("lang") }}：</span>
        <!-- Switch Language 切换语言 -->
        <select v-model="locale"
                class="position-relative h-90% m-r-8px select"
        >
            <option value="zh">简体中文</option>
            <option value="en">English</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()
</script>