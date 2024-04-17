// fighter
export function generateFighterStats() {
  let ATK, DEF, MATK, MDEF, SPD, maxHP, maxMP, HP, MP, level;

  // ATK DEF 在 10~15之間
  ATK = Math.floor(Math.random() * 6) + 10;
  DEF = Math.floor(Math.random() * 6) + 10;

  // MATK MDEF SPD 在 2~3 之間
  MATK = Math.floor(Math.random() * 2) + 2;
  MDEF = Math.floor(Math.random() * 2) + 2;
  SPD = Math.floor(Math.random() * 2) + 2;

  // 固定數值
  maxHP = 100;
  HP = 100;
  maxMP = 5;
  MP = 5;
  level = 1;

  // 確保總和為 35
  let total = ATK + DEF + MATK + MDEF + SPD;
  if (total !== 35) {
    // 如果總和不為35，重新生成 ATK 和 DEF，直到總和為 35
    while (total !== 35) {
      ATK = Math.floor(Math.random() * 6) + 10;
      DEF = Math.floor(Math.random() * 6) + 10;
      MATK = Math.floor(Math.random() * 2) + 2;
      MDEF = Math.floor(Math.random() * 2) + 2;
      SPD = Math.floor(Math.random() * 2) + 2;
      total = ATK + DEF + MATK + MDEF + SPD;
    }
  }

  return {
    ATK,
    DEF,
    MATK,
    MDEF,
    SPD,
    maxHP,
    maxMP,
    HP,
    MP,
    level,
  };
}

// magician
export function generateMagicianStats() {
  let ATK, DEF, MATK, MDEF, SPD, maxHP, maxMP, HP, MP, level;

  // ATK DEF 在 3~8之間
  ATK = Math.floor(Math.random() * 6) + 3;
  DEF = Math.floor(Math.random() * 6) + 3;

  // MATK MDEF SPD 在 10~15 之間
  MATK = Math.floor(Math.random() * 6) + 10;
  MDEF = Math.floor(Math.random() * 6) + 10;

  // SPD 在 2~3 之間
  SPD = Math.floor(Math.random() * 2) + 2;

  // 固定數值
  maxHP = 70;
  HP = 70;
  maxMP = 35;
  MP = 35;
  level = 1;

  // 確保總和為 35
  let total = ATK + DEF + MATK + MDEF + SPD;
  if (total !== 35) {
    // 如果總和不為35，重新生成 ATK 和 DEF，直到總和為 35
    while (total !== 35) {
      ATK = Math.floor(Math.random() * 6) + 3;
      DEF = Math.floor(Math.random() * 6) + 3;
      MATK = Math.floor(Math.random() * 6) + 10;
      MDEF = Math.floor(Math.random() * 6) + 10;
      SPD = Math.floor(Math.random() * 2) + 2;
      total = ATK + DEF + MATK + MDEF + SPD;
    }
  }

  return {
    ATK,
    DEF,
    MATK,
    MDEF,
    SPD,
    maxHP,
    maxMP,
    HP,
    MP,
    level,
  };
}
