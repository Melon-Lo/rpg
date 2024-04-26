// 這裡的數值都是「增加的數值」
const classeslevelsStats = [
  {
    classTitle: "戰士",
    levelsStats: [
      ...Array.from({ length: 20 }, (_, index) => {
        const level = index + 1;
        const baseStats = {
          maxHP: 10 + Math.floor(index / 3) + Math.ceil(Math.random() * 2), // 每隔三級增加 1 到 2
          maxMP: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          ATK: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          DEF: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          MATK: 1 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          MDEF: 1 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          SPD: index % 3 === 0 ? 1 + Math.floor(index / 3) : 1, // 每隔三級提升 1
          expToNextLevel: 110 + index * 10, // 每級增加 10
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
          maxHP: 10 + Math.floor(index / 3) + Math.ceil(Math.random() * 2), // 每隔三級增加 1 到 2
          maxMP: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          ATK: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          DEF: 3 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          MATK: 1 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          MDEF: 1 + Math.floor(index / 3) + Math.ceil(Math.random() * 2),
          SPD: index % 3 === 0 ? 1 + Math.floor(index / 3) : 1, // 每隔三級提升 1
          expToNextLevel: 110 + index * 10, // 每級增加 10
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
