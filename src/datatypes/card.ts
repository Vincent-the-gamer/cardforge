/**
 * 卡牌职业 Class of cards
 */
export enum CardClass {
    Neutral = "neutral", // 中立
    Druid = "druid", // 德鲁伊
    Hunter = "hunter", // 猎人
    Mage = "mage", // 法师
    Paladin = "paladin", // 圣骑士
    Warlock = "warlock", // 术士
    Priest = "priest", // 牧师
    Warrior = "warrior", // 战士
    Shaman = "shaman", // 萨满
    Rogue = "rogue", // 潜行者（贼）
    DeathKnight = "deathknight", // 死亡骑士
    DemonHunter = "demonhunter", // 恶魔猎手
}

/**
 * 职业类型 Class Type
 */
export enum ClassType {
    Single = "single", // 单职业
    Dual = "dual"   // 双职业
}

/**
 * 种族类型 Kind Type
 */
export enum KindType {
    Single = "single",
    Dual = "dual"
}

/**
 * Type of card 卡牌种类
 */
export enum CardType {
    Minion = "minion", // 随从
    Spell = "spell",  // 法术
    Weapon = "weapon", // 武器
    Hero = "hero",    // 英雄
    BattlegroundMinion = "battleground-minion", // 酒馆战旗随从
    Location = "location"  // 地标卡
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

// 旗帜种类 flag
export enum Flag {
    None = "none", // 无
    Tradeable = "tradeable", // 可交易
    Forge = "forge" // 锻造
}

// watermark 水印类型
export enum WaterMark {
    None = "none",
    YearOfTheWolf = "year-of-the-wolf", // 独狼年
    FestivalOfLegends = "festival-of-legends",  // 传奇音乐节
    Audiopocalypse = "audiopocalypse", // 音乐之劫
    Titans = "titans" // 泰坦诸神
}