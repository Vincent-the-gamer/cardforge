/**
 * Type of card 卡牌种类
 */
export enum CardType {
    Minion = "minion", // 随从
    Spell = "spell",  // 法术
    Weapon = "weapon", // 武器
    BattlegroundMinion = "battleground-minion" // 酒馆战旗随从
}

/**
 * Rarity of card 卡牌稀有度
 */
export enum Rarity {
    None = "none",   // 无
    Common = "common", // 普通
    Rare = "rare",   // 稀有
    Epic = "epic",   // 史诗
    Legandary = "legendary", // 传说
}