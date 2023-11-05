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
                    <option :value="CardClass.Druid">德鲁伊</option>
                    <option :value="CardClass.Hunter">猎人</option>
                    <option :value="CardClass.Mage">法师</option>
                    <option :value="CardClass.Paladin">圣骑士</option>
                    <option :value="CardClass.Priest">牧师</option>
                    <option :value="CardClass.Rogue">潜行者</option>
                    <option :value="CardClass.Shaman">萨满祭司</option>
                    <option :value="CardClass.Warlock">术士</option>
                    <option :value="CardClass.DemonHunter">恶魔猎手</option>
                    <option :value="CardClass.DeathKnight">死亡骑士</option>
                </select>
            </p>
            <p>
                <span>种族: </span>
                <input type="text" class="input-text"
                v-model="cardKind"/>
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

// card type 卡牌类型：随从(Minion)等
const cardType = ref<CardType>(store.cardType)
watch(() => cardType.value, newVal => {
    store.setCardType(newVal)
})

// card class 卡牌职业
const cardClass = ref<CardClass>(store.cardClass)
watch(() => cardClass.value, newVal => {
    store.setCardClass(newVal)
})

// minion kind 随从种族
const cardKind = ref<string>(store.cardKind)
watch(() => cardKind.value, newVal => {
    store.setCardKind(newVal)
})


</script>
