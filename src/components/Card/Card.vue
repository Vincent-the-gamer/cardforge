<template>
    <div id="card">
        <Minion v-if="store.cardType === CardType.Minion" />
        <Spell v-else-if="store.cardType === CardType.Spell" />
        <Weapon v-else-if="store.cardType === CardType.Weapon" />
        <BattlegroundsMinion
            v-else-if="store.cardType === CardType.BattlegroundMinion"
        />
        <Hero v-else-if="store.cardType === CardType.Hero" />
        <Location v-else-if="store.cardType === CardType.Location" />
    </div>
</template>

<script lang="ts" setup>
const store = useStore();
</script>

<style lang="css" scoped>
#card {
    display: flex;
    justify-content: center;
    position: relative;
    /* 卡牌实际尺寸：宽按Mask的500px，高按680px + 顶部溢出20px */
    width: 500px;
    height: 700px;
    overflow: hidden;
    z-index: 2;
    transform: translateY(10px) scale(0.9);
    transform-origin: center center;
}
</style>
