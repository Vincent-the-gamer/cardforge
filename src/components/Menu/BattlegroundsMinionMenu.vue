<template>
    <!-- 酒馆战棋随从菜单 -->
    <div class="flex justify-center items-center flex-col">
        <p class="m-b-2px">
            <span>{{ $t("classType") }}</span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Single"/><span>{{ $t("singleClass") }}</span>
            <input type="radio" name="class-type" v-model="store.classType" :value="ClassType.Dual"/><span>{{ $t("dualClasses")}}</span>
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
        
        <!-- 稀有度 -->
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

        <!-- 稀有度无时，是否展示龙框？ -->
        <p class="m-b-2px" v-if="store.rarity === Rarity.None">
            <span>{{ $t("showDragon") }}</span>
            <input type="radio" name="show-dragon" v-model="store.showDragon" :value="false"/><span>{{ $t("no") }}</span>
            <input type="radio" name="show-dragon" v-model="store.showDragon" :value="true"/><span>{{ $t("yes") }}</span>
        </p>

        <!-- 名称 -->
        <p class="m-b-2px">
            <span>{{ $t("name") }}</span>
            <input type="text" class="input-text"
                    v-model="store.name"/>
        </p>
        <!-- 随从种族 -->
        <p class="m-b-2px">
            <span>{{ $t("kindType") }}</span>
            <input type="radio" name="kind-type" v-model="store.kindType" :value="KindType.Single"/><span>{{ $t("singleKind") }}</span>
            <input type="radio" name="kind-type" v-model="store.kindType" :value="KindType.Dual"/><span>{{ $t("dualKinds") }}</span>
        </p>
        <template v-if="store.kindType === KindType.Single">
            <p class="m-b-2px">
                <span>{{ $t("kind") }}</span>
                <input type="text" class="input-text"
                    v-model="store.cardKind"/>
            </p>
        </template>
        <template v-else-if="store.kindType === KindType.Dual">
            <p class="m-b-2px">
                <span>{{ $t("kind1") }}</span>
                <input type="text" class="input-text"
                    v-model="store.dualCardKind.up"/>
            </p>
            <p class="m-b-2px">
                <span>{{ $t("kind2") }}</span>
                <input type="text" class="input-text"
                    v-model="store.dualCardKind.down"/>
            </p>
        </template>
        
        <!-- 随从描述 -->
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

        <p class="m-b-2px">
            <span>{{ $t("battlegroundLevel") }}</span>
            <input type="number" min="1" max="6" class="input-text w-120px"
                    v-model="battlegroundLevel"/>
        </p>
        <p class="m-b-2px">
            <span>{{ $t("attack") }}</span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.attack"/>
        </p>
        <p class="m-b-2px">
            <span>{{ $t("vitality") }}</span>
            <input type="number" min="0" class="input-text w-120px"
                    v-model="store.vitality"/>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store/useStore"
import { CardClass, ClassType, KindType } from "@/datatypes/cardClass"
import { Rarity } from "@/datatypes/cardType"
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

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

// battleground level 酒馆战棋等级
const battlegroundLevel = ref<number>(store.battlegroundLevel)
watch(() => battlegroundLevel.value, newVal => {
    if(newVal > 6){
        store.setBattlegroundLevel(6)
    } else if (newVal < 1) {
        store.setBattlegroundLevel(1)
    } else {
        store.setBattlegroundLevel(newVal)
    }
})

</script>