<template>
    <div class="flex justify-center items-center flex-col">
        <p class="m-b-2px">
            <span>职业类型: </span>
            <input type="radio" name="class-type" v-model="classType" :value="ClassType.Single"/><span>单职业</span>
            <input type="radio" name="class-type" v-model="classType" :value="ClassType.Dual"/><span>双职业</span>
        </p>
        <!-- 单职业卡底 -->
        <p class="m-b-2px" v-if="classType === ClassType.Single">
            <span>职业: </span>
            <select class="select" v-model="cardClass">
                <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key" class="bg-black">
                    {{ value }}
                </option>
            </select>
        </p>
        <!-- 双职业卡底 -->
        <template v-else>
            <p class="m-b-2px">
                <span>左职业：</span>
                <select class="select m-r-7px" v-model="dualCardClass.left">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key" class="bg-black">
                        {{ value }}
                    </option>
                </select>
                <span>右职业：</span>
                <select class="select" v-model="dualCardClass.right">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key" class="bg-black">
                        {{ value }}
                    </option>
                </select>
            </p>
        </template>

        <!-- 法术名称 -->
        <p class="m-b-2px">
            <span>名称: </span>
            <input type="text" class="input-text"
                    v-model="name"/>
        </p>

        <!-- 法术派系 -->
        <p class="m-b-2px">
            <span>派系类型：</span>
            <input type="radio" name="kind-type" v-model="cardKindType" :value="KindType.Single"/><span>单派系</span>
            <input type="radio" name="kind-type" v-model="cardKindType" :value="KindType.Dual"/><span>双派系</span>
        </p>
        <template v-if="cardKindType === KindType.Single">
            <p class="m-b-2px">
                <span>派系: </span>
                <input type="text" class="input-text"
                    v-model="cardKind"/>
            </p>
        </template>
        <template v-else-if="cardKindType === KindType.Dual">
            <p class="m-b-2px">
                <span>派系1: </span>
                <input type="text" class="input-text"
                    v-model="dualCardKind.up"/>
            </p>
            <p class="m-b-2px">
                <span>派系2: </span>
                <input type="text" class="input-text"
                    v-model="dualCardKind.down"/>
            </p>
        </template>

        <!-- 法术描述 -->
        <p class="m-b-1px flex justify-center">
            <span>描述: </span>
            <textarea class="input-text w-300px h-100px resize-none m-l-5px"
                        v-model="description"></textarea>
        </p>
        
        <p class="w-fit h-fit m-b-1px font-size-13px color-yellow">
            提示：**内容**则加粗， *内容*则斜体
        </p>

        <p class="m-b-2px">
            <span>描述字体大小: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="desFontSize"/>
            <span class="m-l-3px">px</span>
        </p>

        <!-- 法术稀有度 -->
        <p class="m-b-2px">
            <span>稀有度: </span>
            <select class="select" v-model="rarity">
                <option :value="Rarity.None" class="bg-black">无</option>
                <option :value="Rarity.Common" class="bg-black">普通</option>
                <option :value="Rarity.Rare" class="bg-black">稀有</option>
                <option :value="Rarity.Epic" class="bg-black">史诗</option>
                <option :value="Rarity.Legandary" class="bg-black">传说</option>
            </select>
        </p>


        <!-- 法术法力值 -->
        <p class="m-b-2px">
            <span>法力值: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="cost"/>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { CardClass, ClassType, KindType } from '@/datatypes/cardClass';
import { Rarity } from '@/datatypes/cardType';
import { useStore } from '@/store/useStore';
import { ref, watch, reactive } from 'vue';

// store
const store = useStore()

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
watch(dualCardClass, newVal => {
    store.setDualCardClass(newVal.left, newVal.right)
})

// class type 职业类型
const classType = ref<ClassType>(store.classType)
watch(() => classType.value, newVal => {
    store.setClassType(newVal)
})

// card kind type 卡牌派系类型
const cardKindType = ref<KindType>(store.kindType)
watch(() => cardKindType.value, newVal => {
    store.setKindType(newVal)
})

// single card kind 单卡牌派系（类型）
const cardKind = ref<string>(store.cardKind)
watch(() => cardKind.value, newVal => {
    store.setCardKind(newVal)
})

// dual card kinds 双卡牌派系（类型）
const dualCardKind = reactive(store.dualCardKind)
watch(dualCardKind, newVal => {
    store.setDualCardKind(newVal.up, newVal.down)
})

// card name 卡牌名称
const name = ref<string>(store.name)
watch(() => name.value, newVal => {
    store.setName(newVal)
})


// rarity 稀有度
const rarity = ref<Rarity>(store.rarity)
watch(() => rarity.value, newVal => {
    store.setRarity(newVal)
})

// cost 法力值消耗
const cost = ref<number>(store.cost)
watch(() => cost.value, newVal => {
    store.setCost(newVal)
})

// card description 卡牌描述
const description = ref<string>(store.description)
watch(() => description.value, newVal => {
    store.setDescription(newVal)
})

// description font size描述字体大小
const desFontSize = ref<number>(store.desFontSize)
watch(() => desFontSize.value, newVal => {
    store.setDesFontSize(newVal)
})
</script>