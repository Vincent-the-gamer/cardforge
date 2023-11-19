<template>
    <div class="flex justify-center items-center flex-col">
        <p class="m-b-2px">
            <span>{{ $t("classType") }}</span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Single"/><span>{{ $t("singleClass") }}</span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Dual"/><span>{{ $t("dualClasses") }}</span>
        </p>
        <!-- 单职业卡底 -->
        <p class="m-b-2px" v-if="store.classType === ClassType.Single">
            <span>{{ $t("class") }}</span>
            <select class="select" v-model="store.cardClass">
                <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                    {{ value.value }}
                </option>
            </select>
        </p>
        <!-- 双职业卡底 -->
        <template v-else>
            <p class="m-b-2px">
                <span>{{ $t("leftClass") }}</span>
                <select class="select m-r-7px" v-model="store.dualCardClass.left">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                        {{ value.value }}
                    </option>
                </select>
                <span>{{ $t("rightClass") }}</span>
                <select class="select" v-model="store.dualCardClass.right">
                    <option v-for="[key, value] of Object.entries(cardClassMap)" :value="key" :key="key">
                        {{ value.value }}
                    </option>
                </select>
            </p>
        </template>

        <!-- 法术名称 -->
        <p class="m-b-2px">
            <span>{{ $t("name") }}</span>
            <input type="text" class="input-text"
                    v-model="store.name"/>
        </p>

        <!-- 法术派系 -->
        <p class="m-b-2px">
            <span>{{ $t("spellKindType") }}</span>
            <input type="radio" name="kind-type" v-model="store.kindType" :value="KindType.Single"/><span>{{ $t("singleSpellKind") }}</span>
            <input type="radio" name="kind-type" v-model="store.kindType" :value="KindType.Dual"/><span>{{ $t("dualSpellKinds") }}</span>
        </p>
        <template v-if="store.kindType === KindType.Single">
            <p class="m-b-2px">
                <span>{{ $t("spellKind") }}</span>
                <input type="text" class="input-text"
                    v-model="store.cardKind"/>
            </p>
        </template>
        <template v-else-if="store.kindType === KindType.Dual">
            <p class="m-b-2px">
                <span>{{ $t("spellKind1") }}</span>
                <input type="text" class="input-text"
                    v-model="store.dualCardKind.up"/>
            </p>
            <p class="m-b-2px">
                <span>{{ $t("spellKind2") }}</span>
                <input type="text" class="input-text"
                    v-model="store.dualCardKind.down"/>
            </p>
        </template>

        <!-- 法术描述 -->
        <p class="m-b-1px flex justify-center">
            <span>{{ $t("description") }}</span>
            <textarea class="input-text w-300px h-100px resize-none m-l-5px"
                        v-model="store.description"></textarea>
        </p>
        
        <p class="w-fit h-fit m-b-1px font-size-13px color-yellow">
            {{ $t("descriptionHint") }}
        </p>

        <p class="m-b-2px">
            <span>{{  $t("descriptionFontSize") }}</span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.desFontSize"/>
            <span class="m-l-3px">px</span>
        </p>

        <!-- 法术稀有度 -->
        <p class="m-b-2px">
            <span>{{ $t("rarity") }}</span>
            <select class="select" v-model="store.rarity">
                <option :value="Rarity.None">{{ $t("none") }}</option>
                <option :value="Rarity.Common">{{ $t("common") }}</option>
                <option :value="Rarity.Rare">{{ $t("rare") }}</option>
                <option :value="Rarity.Epic">{{ $t("epic") }}</option>
                <option :value="Rarity.Legandary">{{ $t("legendary") }}</option>
            </select>
        </p>


        <!-- 法术法力值 -->
        <p class="m-b-2px">
            <span>{{ $t("spellCost") }}</span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.cost"/>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { CardClass, ClassType, KindType } from '@/datatypes/cardClass';
import { Rarity } from '@/datatypes/cardType';
import { useStore } from '@/store/useStore';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// store
const store = useStore()

// i18n
const { t } = useI18n()

// card class map 卡牌类型和名称映射
const cardClassMap = {
    [CardClass.Neutral]: computed(() => t("neutral")),
    [CardClass.Warrior]: computed(() => t("warrior")),
    [CardClass.Druid]: computed(() => t("druid")),
    [CardClass.Hunter]: computed(() => t("hunter")),
    [CardClass.Mage]: computed(() => t("mage")),
    [CardClass.Paladin]: computed(() => t("paladin")),
    [CardClass.Priest]: computed(() => t("priest")),
    [CardClass.Rogue]: computed(() => t("rogue")),
    [CardClass.Shaman]: computed(() => t("shaman")),
    [CardClass.Warlock]: computed(() => t("warlock")),
    [CardClass.DemonHunter]: computed(() => t("demonhunter")),
    [CardClass.DeathKnight]: computed(() => t("deathknight"))
}
</script>