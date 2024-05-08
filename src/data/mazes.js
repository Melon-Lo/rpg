const mazes = [
  {
    mazeName: "洞穴",
    initialPlayerPosition: { x: 1, y: 1 },
    boss: { name: "魔王", position: { x: 5, y: 5 } },
    enemies: [
      { enemy: "蝙蝠", position: { x: 2, y: 2 } },
      { enemy: "蝙蝠", position: { x: 3, y: 3 } },
      { enemy: "蝙蝠", position: { x: 4, y: 4 } },
      { enemy: "蝙蝠", position: { x: 1, y: 5 } },
      { enemy: "蝙蝠", position: { x: 1, y: 2 } },
    ],
    chests: [
      { chest: "補藥", quantity: 1, position: { x: 2, y: 1 } },
      { chest: "補藥", quantity: 1, position: { x: 1, y: 3 } },
      { chest: "補藥", quantity: 2, position: { x: 4, y: 5 } },
      { chest: "魔法藥", quantity: 2, position: { x: 5, y: 4 } },
    ],
  },
  {
    mazeName: "森林",
    initialPlayerPosition: { x: 1, y: 3 },
    boss: { name: "森林之王", position: { x: 5, y: 5 } },
    enemies: [
      { enemy: "灰狼", position: { x: 2, y: 2 } },
      { enemy: "惡熊", position: { x: 3, y: 3 } },
      { enemy: "灰狼", position: { x: 4, y: 4 } },
      { enemy: "惡熊", position: { x: 1, y: 5 } },
    ],
    chests: [
      { chest: "補藥", quantity: 1, position: { x: 2, y: 1 } },
      { chest: "補藥", quantity: 1, position: { x: 1, y: 2 } },
      { chest: "補藥", quantity: 2, position: { x: 4, y: 5 } },
      { chest: "魔法藥", quantity: 1, position: { x: 5, y: 4 } },
    ],
  },
];

export default mazes;
