<template>
  <MobileHeader v-if="mobile"/>
  <Header v-else/>
  <CardPageLayout v-if="!mobile"/>
  <MobileCardPageLayout v-else/>
  <Footer />
  <Plum/>
</template>

<script setup lang="ts">
import CardPageLayout from "./layouts/CardPageLayout.vue";
import MobileCardPageLayout from "./layouts/MobileCardPageLayout.vue";
import { isMobile } from "./utils/isMobile";

const mobile: boolean = isMobile()

const { t } = useI18n()

const title = useTitle()

const isLeft = usePageLeave()
watch(() => isLeft.value, newVal => {
  newVal ? title.value = t("dontLeave") : title.value = t("headerTitle")
})

</script>