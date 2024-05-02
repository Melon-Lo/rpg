// 這裡的數值都是「增加的數值」
const classeslevelsStats = [
  {
    classTitle: "戰士",
    levelsStats: [
      // 1~20級
      ...Array.from({ length: 20 }, (_, index) => {
        const level = index + 1;
        const baseStats = {
          maxHP: 22,
          maxMP: 6,
          ATK: 3,
          DEF: 3,
          MATK: 1,
          MDEF: 1,
          SPD: index % 3 === 0 ? 1 : 0,
          expToNextLevel: 20 + index * 10,
        };
        return {
          level,
          stats: baseStats,
        };
      }),
    ],
  },
  {
    classTitle: "法師",
    levelsStats: [
      ...Array.from({ length: 20 }, (_, index) => {
        const level = index + 1;
        const baseStats = {
          maxHP: 12,
          maxMP: 12,
          ATK: 1,
          DEF: 1,
          MATK: 3,
          MDEF: 3,
          SPD: index % 3 === 0 ? 1 : 0,
          expToNextLevel: 20 + index * 10,
        };
        return {
          level,
          stats: baseStats,
        };
      }),
    ],
  },
];

export default classeslevelsStats;
