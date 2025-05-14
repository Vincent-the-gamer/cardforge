<template>
    <div id="card" relative flex="~ justify-center" w-80vw h-100vh z-2>
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
    transform: translateY(28px);
}

</style>