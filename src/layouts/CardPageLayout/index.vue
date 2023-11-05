<template>
    <div class="flex justify-center items-center flex-row position-absolute h-100% w-100% min-h-700px">
        <FormLayout class="flex flex-col justify-center items-center bg-rgba-164-164-164-0.3 border-rd-6px font-family-BlizzardGlobal">
            <p>
                <span>卡牌类型：</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Minion"/><span>随从</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Spell"/><span>法术</span>
                <input type="radio" name="card-type" v-model="cardType" :value="CardType.Weapon"/><span>武器</span>
            </p>
            <p>
                <span>职业类型: </span>
                <input type="radio" name="class-type" v-model="classType" :value="ClassType.Single"/><span>单职业</span>
                <input type="radio" name="class-type" v-model="classType" :value="ClassType.Dual"/><span>双职业</span>
            </p>
            <!-- 单职业卡底 -->
            <p v-if="classType === ClassType.Single">
                <span>职业: </span>
                <select class="select" v-model="cardClass">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                        {{ value }}
                    </option>
                </select>
            </p>
            <!-- 双职业卡底 -->
            <template v-else>
                <p>
                    <span>左职业：</span>
                    <select class="select m-r-7px" v-model="dualCardClass.left">
                        <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                            {{ value }}
                        </option>
                    </select>
                    <span>右职业：</span>
                    <select class="select" v-model="dualCardClass.right">
                        <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                            {{ value }}
                        </option>
                    </select>
                </p>
            </template>
            
            <p>
                <span>稀有度: </span>
                <select class="select" v-model="rarity">
                    <option :value="Rarity.None">无</option>
                    <option :value="Rarity.Common">普通</option>
                    <option :value="Rarity.Rare">稀有</option>
                    <option :value="Rarity.Epic">史诗</option>
                    <option :value="Rarity.Legandary">传说</option>
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
import { CardType, Rarity } from "@/datatypes/cardType"
import { useStore } from "@/store/useStore"
import { reactive, ref, watch } from 'vue';
import { CardClass, ClassType } from '@/datatypes/cardClass'

// store
const store = useStore();

// card class map 卡牌类型和名称映射
const cardClassMap: { [cardClassEnumVal: string]: string } = {
    [CardClass.Neutral]: "中立",
    [CardClass.Warrior]: "战士",
    [CardClass.Druid]: "德鲁伊",
    [CardClass.Hunter]: "猎人",
    [CardClass.Mage]: "法师",
    [CardClass.Paladin]: "圣骑士",
    [CardClass.Priest]: "牧师",
    [CardClass.Rogue]: "潜行者",
    [CardClass.Shaman]: "萨满祭司",
    [CardClass.Warlock]: "术士",
    [CardClass.DemonHunter]: "恶魔猎手",
    [CardClass.DeathKnight]: "死亡骑士"
}



// card type 卡牌类型：随从(Minion)等
const cardType = ref<CardType>(store.cardType)
watch(() => cardType.value, newVal => {
    store.setCardType(newVal)
})

// single card class 单卡牌职业
const cardClass = ref<CardClass>(store.cardClass)
watch(() => cardClass.value, newVal => {
    store.setCardClass(newVal)
})

// dual card class 双卡牌职业
const dualCardClass = reactive({
    left: store.dualCardClass.left,
    right: store.dualCardClass.right
})
watch(() => dualCardClass, newVal => {
    store.setDualCardClass(newVal.left, newVal.right)
})

// class type 职业类型
const classType = ref<ClassType>(store.classType)
watch(() => classType.value, newVal => {
    store.setClassType(newVal)
})

// rarity 稀有度
const rarity = ref<Rarity>(store.rarity)
watch(() => rarity.value, newVal => {
    store.setRarity(newVal)
})

// minion kind 随从种族
const cardKind = ref<string>(store.cardKind)
watch(() => cardKind.value, newVal => {
    store.setCardKind(newVal)
})


</script>
