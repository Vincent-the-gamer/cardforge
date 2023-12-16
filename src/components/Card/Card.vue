<template>
    <div id="card" class="position-relative flex justify-center w-100% h-100% z-2">
       <Minion v-if="store.cardType === CardType.Minion"/>
       <Spell v-else-if="store.cardType === CardType.Spell"/>
       <Weapon v-else-if="store.cardType === CardType.Weapon"/>
       <BattlegroundsMinion v-else-if="store.cardType === CardType.BattlegroundMinion"/>
       <Hero v-else-if="store.cardType === CardType.Hero"/>
       <Location v-else-if="store.cardType === CardType.Location"/>
    </div>
</template>

<script lang="ts" setup>
import { CardType } from '@/datatypes/card';
import { useStore } from '@/store/useStore';
import Minion from '@/components/Card/Minion.vue';
import Spell from '@/components/Card/Spell.vue';
import Weapon from '@/components/Card/Weapon.vue';
import BattlegroundsMinion from '@/components/Card/BattlegroundsMinion.vue';
import Hero from '@/components/Card/Hero.vue';
import Location from '@/components/Card/Location.vue';

const store = useStore()
</script>