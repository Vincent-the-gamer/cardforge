export default function useCardClassMap() {
    const { t } = useI18n()
    // card class map 卡牌类型和名称映射
    const cardClassMap: Record<CardClass, ComputedRef<string>> = {
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
    return cardClassMap
}