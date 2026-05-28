<template>
    <header
        class="position-fixed h-40px z-10 top-0 left-0 w-100% font-family-GBJenLei backdrop-blur-12px transition-all-300"
        :class="`${isDark ? 'bg-rgba-20-20-30-0.7' : 'bg-rgba-255-255-255-0.6'}`"
    >
        <img
            src="@/assets/logo/cardforge-logo.png"
            absolute
            left-0
            h-full
            m-0
            inline
        />
        <h2
            class="position-relative m-0 w-fit h-100% top-6px left-45px"
            :class="isDark ? 'color-white' : 'color-black'"
        >
            {{ $t("headerTitle") }}
        </h2>
        <div
            class="position-absolute top-0 right-0 h-100% flex items-center"
            :class="isDark ? 'color-white' : 'color-black'"
        >
            <span class="m-r-5px">{{ $t("lang") }}：</span>
            <!-- Switch Language 切换语言 -->
            <select
                v-model="locale"
                position-relative
                h-8
                top-0.4
                mr-8px
                select
                border-black
                color-black
                dark:border-white
                dark:color-white
            >
                <option value="zh">简体中文</option>
                <option value="en">English</option>
            </select>
            <span
                h-fit
                w-fit
                m-r-8px
                m-l-8px
                p-4px
                transition-all-200
                border="1px solid rd-8px"
                :hover="`cursor-pointer ${isDark ? 'bg-white color-black' : 'bg-black color-white'} scale-110`"
                @click="toggleDark"
            >
                <div i-grommet-icons-sun font-size-18px v-if="!isDark" />
                <div i-grommet-icons-moon font-size-18px v-else />
            </span>
            <span
                h-fit
                w-fit
                transition-all-200
                p-10px
                :hover="`cursor-pointer ${isDark ? 'color-pink' : 'color-pink'}`"
                @click="
                    () =>
                        openPage(
                            'https://github.com/vincent-the-gamer/cardforge',
                        )
                "
            >
                <div class="i-grommet-icons-github w-20px h-20px m-r-5px" />
                <span class="font-size-20px font-family-GBJenLei">GitHub</span>
            </span>
        </div>
    </header>
</template>

<script lang="ts" setup>
import toggleDark from "@/utils/toggleDark";

const { locale } = useI18n();
const isDark = useDark();

function openPage(url: string) {
    window.open(url);
}
</script>
