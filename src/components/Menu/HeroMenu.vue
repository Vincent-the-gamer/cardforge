<template>
    <!-- 英雄菜单 -->
    <div class="flex justify-center items-center flex-col">
        <p class="m-b-2px">
            <span>{{ $t("classType") }}: </span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Single"/><span>{{ $t("singleClass") }}</span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Dual"/><span>{{ $t("dualClasses")}}</span>
        </p>
        <!-- 单职业卡底 -->
        <p class="m-b-2px" v-if="store.classType === ClassType.Single">
            <span>{{ $t("class") }}: </span>
            <select class="select" v-model="store.cardClass">
                <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                    {{ value.value }}
                </option>
            </select>
        </p>
        <!-- 双职业卡底 -->
        <template v-else>
            <p class="m-b-2px">
                <span>{{ $t("leftClass") }}: </span>
                <select class="select m-r-7px" v-model="store.dualCardClass.left">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                        {{ value.value }}
                    </option>
                </select>
                <span>{{ $t("rightClass") }}: </span>
                <select class="select" v-model="store.dualCardClass.right">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                        {{ value.value }}
                    </option>
                </select>
            </p>
        </template>

        <!-- 旗帜 -->
        <p class="m-b-2px">
            <span>{{ $t("flag") }}: </span>
            <select class="select" v-model="store.flag">
                <option :value="Flag.None">{{ $t("none") }}</option>
                <option :value="Flag.Tradeable">{{  $t("tradeable") }}</option>
                <option :value="Flag.Forge">{{  $t("forge") }}</option>
            </select>
        </p>
        
        <!-- 稀有度 -->
        <p class="m-b-2px">
            <span>{{ $t("rarity") }}: </span>
            <select class="select" v-model="store.rarity">
                <option :value="Rarity.None">{{ $t("none") }}</option>
                <option :value="Rarity.Common">{{ $t("common") }}</option>
                <option :value="Rarity.Rare">{{ $t("rare") }}</option>
                <option :value="Rarity.Epic">{{ $t("epic") }}</option>
                <option :value="Rarity.Legandary">{{ $t("legendary") }}</option>
            </select>
        </p>
        <p class="m-b-2px">
            <span>{{ $t("name") }}: </span>
            <input type="text" class="input-text"
                    v-model="store.name"/>
        </p>
        
        <!-- 英雄描述 -->
        <p class="m-b-1px flex justify-center">
            <span>{{ $t("description") }}: </span>
            <textarea class="input-text w-300px h-100px resize-none m-l-5px"
                        v-model="description"></textarea>
        </p>
        
        <p class="w-fit h-fit m-b-1px font-size-13px color-yellow">
            {{ $t("descriptionHint") }}
        </p>

        <!-- 描述水印 -->
        <p class="m-b-2px">
            <span>{{ $t("watermark") }}: </span>
            <select class="select w-fit p-1px" v-model="store.watermark">
                <option v-for="[key, value] of Object.entries(waterMarkMap)" :value="key" :key="key">
                    {{ value.value }}
                </option>
            </select>
        </p>

        <p class="m-b-2px">
            <span>{{  $t("descriptionFontSize") }}: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.desFontSize"/>
            <span class="m-l-3px">px</span>
        </p>

        <p class="m-b-2px">
            <span>{{ $t("spellCost") }}: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.cost"/>
        </p>
        <p class="m-b-2px">
            <span>{{ $t("attack") }}: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.attack"/>
        </p>
        <p class="font-size-13px m-b-2px color-orange">{{ $t("heroAttackHint") }}</p>
        <p class="m-b-2px">
            <span>{{ $t("armor") }}: </span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.vitality"/>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/useStore"
import { ClassType, Rarity, Flag } from "@/datatypes/card";
import useWaterMarkMap from "@/hooks/useWaterMarkMap"
import useCardClassMap from "@/hooks/useCardClassMap";

// store
const store = useStore()

// card class map 卡牌类型和名称映射
const cardClassMap = useCardClassMap()

// watermark map 水印类型和名称映射
const waterMarkMap = useWaterMarkMap()

// 对描述特殊处理, 否则会将正则匹配替换的结果显示到菜单中
const description = ref<string>(store.description)
watch(() => description.value, newVal => {
    store.setDescription(newVal)
})
</script>