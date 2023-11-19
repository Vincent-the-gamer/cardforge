<template>
    <div id="card" class="position-relative flex justify-center w-100% h-100% z-2 translate-y--20px">
       <Minion v-if="store.cardType === CardType.Minion"/>
       <Spell v-else-if="store.cardType === CardType.Spell"/>
       <BattlegroundsMinion v-else-if="store.cardType === CardType.BattlegroundMinion"/>
    </div>
</template>

<script lang="ts" setup>
import { CardType } from '@/datatypes/cardType';
import { useStore } from '@/store/useStore';
import Minion from '@/components/Card/Minion.vue';
import Spell from '@/components/Card/Spell.vue';
import BattlegroundsMinion from '@/components/Card/BattlegroundsMinion.vue';

const store = useStore()
</script>