<template>
    <div class="flex justify-center items-center flex-row position-absolute h-100% w-100%">
        <FormLayout class="flex justify-center items-center">
            <div class="position-relative w-80% h-80% bg-rgba-164-164-164-0.3 border-rd-6px">
                <span>类型：</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Minion"/><span>随从</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Spell"/><span>法术</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Weapon"/><span>武器</span>
            </div>
        </FormLayout>
    
        <CardLayout class="flex justify-center items-center">
            <div class="position-relative w-80% h-80% bg-rgba-164-164-164-0.3 border-rd-6px">
                <Card/>
            </div>
        </CardLayout>
    </div>
</template>


<script lang="ts" setup>
import FormLayout from './FormLayout.vue'
import CardLayout from "./CardLayout.vue"
import Card from "@/components/Card.vue"
import { CardType } from "@/datatypes/cardType.ts"
import { useStore } from "@/store/useStore.ts"
import { ref, watch } from 'vue';

// store
const store = useStore();

// card type switcher
const cardType = ref<CardType>(CardType.Minion)
watch(() => cardType.value, newVal => {
    store.setCardType(newVal)
    console.log(store.cardType)
})



</script>
