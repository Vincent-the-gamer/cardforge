<template>
    <!-- 酒馆战棋随从菜单 -->
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
        <p
            class="flex items-center gap-2 m-0 text-sm"
            v-if="store.rarity === Rarity.None"
        >
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("showDragon")
            }}</span>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="show-dragon"
                    v-model="store.showDragon"
                    :value="false"
                />
                <span>{{ $t("no") }}</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="show-dragon"
                    v-model="store.showDragon"
                    :value="true"
                />
                <span>{{ $t("yes") }}</span>
            </label>
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("name")
            }}</span>
            <input type="text" class="input-text flex-1" v-model="store.name" />
        </p>
        <p class="flex items-center gap-2 m-0 text-sm">
            <span class="w-70px text-right shrink-0 opacity-70">{{
                $t("kindType")
            }}</span>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="kind-type"
                    v-model="store.kindType"
                    :value="KindType.Single"
                />
                <span>{{ $t("singleKind") }}</span>
            </label>
            <label class="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="kind-type"
                    v-model="store.kindType"
                    :value="KindType.Dual"
                />
                <span>{{ $t("dualKinds") }}</span>
            </label>
        </p>
        <template v-if="store.kindType === KindType.Single">
            <p class="flex items-center gap-2 m-0 text-sm">
                <span class="w-70px text-right shrink-0 opacity-70">{{
                    $t("kind")
                }}</span>
                <input
                    type="text"
                    class="input-text flex-1"
                    v-model="store.cardKind"
                />
            </p>
        </template>
        <template v-else-if="store.kindType === KindType.Dual">
            <p class="flex items-center gap-2 m-0 text-sm">
                <span class="w-70px text-right shrink-0 opacity-70">{{
                    $t("kind1")
                }}</span>
                <input
                    type="text"
                    class="input-text flex-1"
                    v-model="store.dualCardKind.up"
                />
            </p>
            <p class="flex items-center gap-2 m-0 text-sm">
                <span class="w-70px text-right shrink-0 opacity-70">{{
                    $t("kind2")
                }}</span>
                <input
                    type="text"
                    class="input-text flex-1"
                    v-model="store.dualCardKind.down"
                />
            </p>
        </template>
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
                $t("battlegroundLevel")
            }}</span>
            <input
                type="number"
                min="1"
                max="6"
                class="input-text w-80px"
                v-model="battlegroundLevel"
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
                $t("vitality")
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

// battleground level 酒馆战棋等级
const battlegroundLevel = ref<number>(store.battlegroundLevel);
watch(
    () => battlegroundLevel.value,
    (newVal) => {
        if (newVal > 6) {
            store.setBattlegroundLevel(6);
        } else if (newVal < 1) {
            store.setBattlegroundLevel(1);
        } else {
            store.setBattlegroundLevel(newVal);
        }
    },
);

// 对描述特殊处理, 否则会将正则匹配替换的结果显示到菜单中
const description = ref<string>(store.description);
watch(
    () => description.value,
    (newVal) => {
        store.setDescription(newVal);
    },
);
</script>
