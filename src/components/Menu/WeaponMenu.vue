<template>
    <!-- 武器菜单 -->
    <div class="flex flex-col gap-3 w-340px px-2">
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("classType")
            }}</span>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="class-type"
                    v-model="store.classType"
                    :value="ClassType.Single"
                />
                <span>{{ $t("singleClass") }}</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="class-type"
                    v-model="store.classType"
                    :value="ClassType.Dual"
                />
                <span>{{ $t("dualClasses") }}</span>
            </label>
        </p>
        <p
            class="flex items-center gap-2 m-0 text-sm"
            v-if="store.classType === ClassType.Single"
        >
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("class")
            }}</span>
            <select class="select" v-model="store.cardClass">
                <option
                    v-for="[key, value] of Object.entries(cardClassMap)"
                    :value="key"
                    :key="key"
                >
                    {{ value.value }}
                </option>
            </select>
        </p>
        <p v-else class="flex items-center gap-2 m-0 text-sm flex-wrap">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("leftClass")
            }}</span>
            <select class="select w-90px" v-model="store.dualCardClass.left">
                <option
                    v-for="[key, value] of Object.entries(cardClassMap)"
                    :value="key"
                    :key="key"
                >
                    {{ value.value }}
                </option>
            </select>
            <span class="opacity-70">{{ $t("rightClass") }}</span>
            <select class="select w-90px" v-model="store.dualCardClass.right">
                <option
                    v-for="[key, value] of Object.entries(cardClassMap)"
                    :value="key"
                    :key="key"
                >
                    {{ value.value }}
                </option>
            </select>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("flag")
            }}</span>
            <select class="select" v-model="store.flag">
                <option :value="Flag.None">{{ $t("none") }}</option>
                <option :value="Flag.Tradeable">{{ $t("tradeable") }}</option>
                <option :value="Flag.Forge">{{ $t("forge") }}</option>
            </select>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("rarity")
            }}</span>
            <select class="select" v-model="store.rarity">
                <option :value="Rarity.None">{{ $t("none") }}</option>
                <option :value="Rarity.Common">{{ $t("common") }}</option>
                <option :value="Rarity.Rare">{{ $t("rare") }}</option>
                <option :value="Rarity.Epic">{{ $t("epic") }}</option>
                <option :value="Rarity.Legandary">{{ $t("legendary") }}</option>
            </select>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("name")
            }}</span>
            <input type="text" class="input-text flex-1" v-model="store.name" />
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("weaponKind")
            }}</span>
            <input
                type="text"
                class="input-text flex-1"
                v-model="store.cardKind"
            />
        </p>
        <div class="flex gap-2 m-0">
            <span class="w-70px text-right shrink-0 opacity-70 text-sm pt-2">{{
                $t("description")
            }}</span>
            <textarea
                class="input-text flex-1 h-100px text-sm"
                v-model="description"
            ></textarea>
        </div>
        <p class="m-0 font-size-12px color-yellow/70 text-center">
            {{ $t("descriptionHint") }}
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("watermark")
            }}</span>
            <select class="select w-130px" v-model="store.watermark">
                <option
                    v-for="[key, value] of Object.entries(waterMarkMap)"
                    :value="key"
                    :key="key"
                >
                    {{ value.value }}
                </option>
            </select>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("descriptionFontSize")
            }}</span>
            <input
                type="number"
                min="0"
                class="input-text w-80px"
                v-model="store.desFontSize"
            />
            <span class="opacity-50">px</span>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("spellCost")
            }}</span>
            <input
                type="number"
                min="0"
                class="input-text w-80px"
                v-model="store.cost"
            />
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("attack")
            }}</span>
            <input
                type="number"
                min="0"
                class="input-text w-80px"
                v-model="store.attack"
            />
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("durability")
            }}</span>
            <input
                type="number"
                min="0"
                class="input-text w-80px"
                v-model="store.vitality"
            />
        </p>
    </div>
</template>

<script lang="ts" setup>
// store
const store = useStore();

// card class map 卡牌类型和名称映射
const cardClassMap = useCardClassMap();

// watermark map 水印类型和名称映射
const waterMarkMap = useWaterMarkMap();

// 对描述特殊处理, 否则会将正则匹配替换的结果显示到菜单中
const description = ref<string>(store.description);
watch(
    () => description.value,
    (newVal) => {
        store.setDescription(newVal);
    },
);
</script>
