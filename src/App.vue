<template>
  <Header v-if="currentPlatform !== 'mobile'"/>
  <MobileHeader v-else/>
  <CardPageLayout/>
  <Footer v-if="currentPlatform !== 'mobile'" :is-alpha="true"/>
  <Plum/>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import CardPageLayout from "@/layouts/CardPageLayout/index.vue"
import Footer from "@/components/Footer.vue";
import useCurrentPlatform from "./hooks/useCurrentPlatform";
import MobileHeader from "./components/MobileHeader.vue";
import Plum from "./components/Plum.vue";
import { usePageLeave, useTitle } from "@vueuse/core";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const currentPlatform = useCurrentPlatform()
const { t } = useI18n()

const title = useTitle()

const isLeft = usePageLeave()
watch(() => isLeft.value, newVal => {
  newVal ? title.value = t("dontLeave") : title.value = t("headerTitle")
})

</script>