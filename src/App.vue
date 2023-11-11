<template>
  <Header/>
  <CardPageLayout/>
  <Footer :is-alpha="true"/>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import CardPageLayout from "@/layouts/CardPageLayout/index.vue"
import Footer from "@/components/Footer.vue";
</script>