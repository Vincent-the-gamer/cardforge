/**
 * Type of card 卡牌种类
 */
export enum CardType {
    Minion, // 随从
    Spell,  // 法术
    Weapon, // 武器
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