<template>
    <div class="flex justify-center items-center flex-row position-absolute h-100% w-100% min-h-700px">
        <FormLayout class="flex flex-col justify-center items-center bg-rgba-164-164-164-0.3 border-rd-6px">
            <p>
                <span>类型：</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Minion"/><span>随从</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Spell"/><span>法术</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Weapon"/><span>武器</span>
            </p>
            <p>
                <span>职业：</span>
                <select class="select" v-model="cardClass">
                    <option :value="CardClass.Neutral">中立</option>
                    <option :value="CardClass.Warrior">战士</option>
                </select>
            </p>
        </FormLayout>
    
        <CardLayout class="flex justify-center items-center">
            <Card/>
        </CardLayout>
    </div>
</template>


<script lang="ts" setup>
import FormLayout from './FormLayout.vue'
import CardLayout from "./CardLayout.vue"
import Card from "@/components/Card.vue"
import { CardType } from "@/datatypes/cardType"
import { useStore } from "@/store/useStore"
import { ref, watch } from 'vue';
import { CardClass } from '@/datatypes/cardClass'

// store
const store = useStore();

// card type
const cardType = ref<CardType>(CardType.Minion)
watch(() => cardType.value, newVal => {
    store.setCardType(newVal)
})

// card class
const cardClass = ref<CardClass>(CardClass.Neutral)
watch(() => cardClass.value, newVal => {
    store.setCardClass(newVal)
})

</script>
