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
    Single, // 单职业
    Dual    // 双职业
}