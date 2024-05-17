// 處理升級時的各項素質提升
function levelUp(currentLevel, stats, classTitle, classeslevelsStats) {
  // 取得 stats 的副本
  const updatedStats = { ...stats };

  // 抓到該等級該提升的各項素質
  const levelStatsCollection = classeslevelsStats.find(
    (item) => item.classTitle === classTitle
  ).levelsStats;

  // 「+1」是因為「目前等級 + 1」才會等於「要提升到的等級」
  const levelStats = levelStatsCollection.find(
    (item) => item.level === currentLevel + 1
  ).stats;

  // 升級後的屬性值 = 原屬性值 + 升級後的屬性提升
  updatedStats.maxHP += levelStats.maxHP;
  updatedStats.maxMP += levelStats.maxMP;
  updatedStats.ATK += levelStats.ATK;
  updatedStats.DEF += levelStats.DEF;
  updatedStats.MATK += levelStats.MATK;
  updatedStats.MDEF += levelStats.MDEF;
  updatedStats.SPD += levelStats.SPD;

  // 補滿 HP 和 MP
  updatedStats.HP = 9999;
  updatedStats.MP = 9999;

  // 等級固定 +1
  updatedStats.level += 1;

  // 更新當前經驗值，扣除當前等級所需經驗值
  updatedStats.exp -= stats.expToNextLevel;

  // 更新當前等級所需經驗值
  updatedStats.expToNextLevel = levelStats.expToNextLevel;

  return updatedStats;
}

export default levelUp;
