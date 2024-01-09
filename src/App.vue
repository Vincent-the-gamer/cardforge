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

const currentPlatform = useCurrentPlatform()

</script>