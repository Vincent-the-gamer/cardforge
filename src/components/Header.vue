<template>
    <header class="position-fixed h-40px z-10 top-0 left-0 w-100% bg-rgba-156-156-156-0.2 font-family-GBJenLei">
        <img src="@/assets/logo/cardforge-logo.png" class="position-absolute left-0 h-100% m-0 inline"/>
        <h2 class="position-relative m-0 w-fit h-100% top-6px left-45px">CardForge 炉石卡牌制作器</h2>
        <div class="position-absolute top-0 right-0 h-100% flex items-center">
            <button class="h-35px w-fit button" @click="() => openPage('https://github.com/vincent-the-gamer/cardforge')">
                <div class="i-grommet-icons-github w-20px h-20px m-r-5px"/>
                <span class="font-size-20px font-family-GBJenLei">GitHub</span>
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
function openPage(url: string){
    window.open(url)
}
</script>