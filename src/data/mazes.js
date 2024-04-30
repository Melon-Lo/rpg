const mazes = [
  {
    mazeName: "洞穴",
    initialPlayerPosition: { x: 1, y: 1 },
    bossPosition: { x: 5, y: 5 },
    enemiesPosition: [
      { enemy: "蝙蝠", position: { x: 2, y: 2 } },
      { enemy: "蝙蝠", position: { x: 3, y: 3 } },
    ],
    chestsPosition: [
      { chest: "補藥", quantity: 1, position: { x: 2, y: 1 } },
      { chest: "補藥", quantity: 1, position: { x: 1, y: 2 } },
    ],
  },
];

export default mazes;
