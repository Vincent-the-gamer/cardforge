<template>
  <Header v-if="currentPlatform !== 'mobile'"/>
  <MobileHeader v-else/>
  <CardPageLayout/>
  <Footer v-if="currentPlatform !== 'mobile'" :is-alpha="true"/>
  <Plum/>
</template>

<script setup lang="ts">
import CardPageLayout from "@/layouts/CardPageLayout/index.vue"
import { getCurrentPlatform } from "@vincent-the-gamer/utils";

const currentPlatform = getCurrentPlatform()

const { t } = useI18n()

const title = useTitle()

const isLeft = usePageLeave()
watch(() => isLeft.value, newVal => {
  newVal ? title.value = t("dontLeave") : title.value = t("headerTitle")
})

</script>