// 這裡的數值都是「增加的數值」
// ~50級
const classeslevelsStats = [
  {
    classTitle: "戰士",
    levelsStats: [
      ...Array.from({ length: 50 }, (_, index) => {
        const level = index + 1;
        const baseStats = {
          maxHP: 21,
          maxMP: 5,
          ATK: 3,
          DEF: 3,
          MATK: 1,
          MDEF: 1,
          SPD: index % 3 === 0 ? 1 : 0,
          expToNextLevel: 20 + index * 15,
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
      ...Array.from({ length: 50 }, (_, index) => {
        const level = index + 1;
        const baseStats = {
          maxHP: 12,
          maxMP: 10,
          ATK: 1,
          DEF: 1,
          MATK: 3,
          MDEF: 3,
          SPD: index % 3 === 0 ? 1 : 0,
          expToNextLevel: 20 + index * 15,
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
