<template>
    <div id="card">
       <Minion v-if="store.cardType === CardType.Minion"/>
       <Spell v-else-if="store.cardType === CardType.Spell"/>
       <Weapon v-else-if="store.cardType === CardType.Weapon"/>
       <BattlegroundsMinion v-else-if="store.cardType === CardType.BattlegroundMinion"/>
       <Hero v-else-if="store.cardType === CardType.Hero"/>
       <Location v-else-if="store.cardType === CardType.Location"/>
    </div>
</template>

<script lang="ts" setup>
const store = useStore()
</script>

<style lang="css" scoped>
#card {
    display: flex;
    justify-content: center;
    position: relative;
    width: 550px;
    height: 100vh;
    z-index: 2;
    transform: translateY(10px) scale(0.9);
}

</style>