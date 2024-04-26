function levelUp(currentLevel, stats, classTitle) {
  let updatedStats = {
    level: 0,
    maxHP: 0,
    maxMP: 0,
    ATK: 0,
    DEF: 0,
    MATK: 0,
    MDEF: 0,
    SPD: 0,
    exp: 0,
    expToNextLevel: 0,
  };

  if (classTitle === "戰士") {
    if (currentLevel <= 3) {
      updatedStats.HP = stats.maxHP + 20;
      updatedStats.maxHP = stats.maxHP + 20;
      updatedStats.MP = stats.maxMP + 20;
      updatedStats.maxMP = stats.maxMP + 20;
      updatedStats.ATK = stats.ATK + 3;
      updatedStats.DEF = stats.DEF + 3;
      updatedStats.MATK = stats.MATK + 1;
      updatedStats.MDEF = stats.MDEF + 1;
      updatedStats.SPD = stats.SPD + 1;
      updatedStats.expToNextLevel = 120;
    }
  }

  if (classTitle === "法師") {
    if (currentLevel <= 3) {
      updatedStats.HP = stats.maxHP + 10;
      updatedStats.maxHP = stats.maxHP + 10;
      updatedStats.MP = stats.maxMP + 10;
      updatedStats.maxMP = stats.maxMP + 10;
      updatedStats.ATK = stats.ATK + 1;
      updatedStats.DEF = stats.DEF + 1;
      updatedStats.MATK = stats.MATK + 3;
      updatedStats.MDEF = stats.MDEF + 3;
      updatedStats.SPD = stats.SPD + 1;
      updatedStats.expToNextLevel = 120;
    }
  }

  updatedStats.level = stats.level + 1;
  updatedStats.exp = stats.exp - stats.expToNextLevel;

  return updatedStats;
}

export default levelUp;
