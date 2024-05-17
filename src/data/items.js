const items = [
  // 補藥
  {
    name: "補藥",
    price: 20,
    canUse: true,
    type: "healHP",
    description: "大家常備的藥品，冒險的好幫手。",
    effectDescription: "恢復 HP 100 點",
    effectMessage: "HP 恢復了 100 點",
    effect: (hp) => {
      return hp + 100;
    },
  },
  {
    name: "高級補藥",
    price: 50,
    canUse: true,
    type: "healHP",
    description: "比一般的補藥效果更好。",
    effectDescription: "恢復 HP 200 點",
    effectMessage: "HP 恢復了 200 點",
    effect: (hp) => {
      return hp + 200;
    },
  },
  {
    name: "強效補藥",
    price: 100,
    canUse: true,
    type: "healHP",
    description: "重傷時趕快使用就對了。",
    effectDescription: "恢復 HP 400 點",
    effectMessage: "HP 恢復了 300 點",
    effect: (hp) => {
      return hp + 400;
    },
  },
  {
    name: "究極補藥",
    price: 300,
    canUse: true,
    type: "healHP",
    description: "有起死回生之效果，極難取得。",
    effectDescription: "恢復 HP 999 點",
    effectMessage: "HP 恢復了 999 點",
    effect: (hp) => {
      return hp + 999;
    },
  },
  {
    name: "魔法藥",
    price: 50,
    canUse: true,
    type: "healMP",
    description: "魔法師常用藥品，沒了它寸步難行。",
    effectDescription: "恢復 MP 50 點",
    effectMessage: "MP 恢復了 50 點",
    effect: (mp) => {
      return mp + 50;
    },
  },
  {
    name: "高等魔法藥",
    price: 80,
    canUse: true,
    type: "healMP",
    description: "高等魔法師愛用，沒個幾罐都不敢講自己會魔法。",
    effectDescription: "恢復 MP 100 點",
    effectMessage: "MP 恢復了 100 點",
    effect: (mp) => {
      return mp + 100;
    },
  },
  {
    name: "大師魔法藥",
    price: 200,
    canUse: true,
    type: "healMP",
    description: "使用後全身充滿魔力，可謂神藥。",
    effectDescription: "恢復 MP 200 點",
    effectMessage: "MP 恢復了 200 點",
    effect: (mp) => {
      return mp + 200;
    },
  },
  {
    name: "大師魔法藥",
    price: 300,
    canUse: true,
    type: "healMP",
    description: "使用後全身充滿魔力，可謂神藥。",
    effectDescription: "恢復 MP 200 點",
    effectMessage: "MP 恢復了 200 點",
    effect: (mp) => {
      return mp + 200;
    },
  },
  {
    name: "女神之吻",
    price: 1000,
    canUse: true,
    type: "healAll",
    description: "使用後如重獲新生，達到最完美的狀態。",
    effectDescription: "恢復 HP & MP 100%",
    effectMessage: "HP 和 MP 全部恢復了！",
    effect: (maxValue) => {
      return maxValue;
    },
  },
  // 任務道具
  {
    name: "皮球",
    canUse: false,
    type: "quest",
    description: "彈力十足的皮球，上面的花紋鮮豔活潑。",
  },
  {
    name: "獅子的鬃毛",
    canUse: false,
    type: "quest",
    description: "強者的象徵。",
  },
  // equipment
  {
    name: "長劍",
    price: 50,
    canUse: false,
    type: "equipment",
    description: "一般戰士常見武器。限制職業：戰士",
    effectDescription: "攻擊力 + 10、魔攻 + 8",
    equipmentType: "weapon",
    availableClasses: ["戰士"],
    stats: {
      ATK: 5,
      MATK: 1,
    },
  },
  {
    name: "斬鐵劍",
    price: 150,
    canUse: false,
    type: "equipment",
    description: "劍鋒極利，削鐵如泥。限制職業：戰士",
    effectDescription: "攻擊力 + 15、魔攻 + 3",
    equipmentType: "weapon",
    availableClasses: ["戰士"],
    stats: {
      ATK: 15,
      MATK: 3,
    },
  },
  {
    name: "木製法杖",
    price: 50,
    canUse: false,
    type: "equipment",
    description: "基礎魔法師常用，能應付日常情況。限制職業：法師",
    effectDescription: "攻擊力 + 1、魔攻 + 10、魔防 + 5",
    equipmentType: "weapon",
    availableClasses: ["法師"],
    stats: {
      ATK: 1,
      MATK: 10,
      MDEF: 5,
    },
  },
  {
    name: "精神法杖",
    // DEV ONLY
    price: 150,
    canUse: false,
    type: "equipment",
    description: "高級魔法師器具。",
    effectDescription: "攻擊力 + 3、魔攻 + 25、魔防 + 8。限制職業：法師",
    equipmentType: "weapon",
    availableClasses: ["法師"],
    stats: {
      // DEV ONLY
      ATK: 3,
      MATK: 25,
      MDEF: 8,
    },
  },
  {
    name: "鐵盔甲",
    price: 40,
    canUse: false,
    type: "equipment",
    description: "很硬的盔甲。",
    effectDescription: "防禦力 + 3、魔防 + 3",
    equipmentType: "armor",
    availableClasses: ["戰士", "法師"],
    stats: {
      DEF: 3,
      MDEF: 3,
    },
  },
  {
    name: "金縷衣",
    price: 150,
    canUse: false,
    type: "equipment",
    description: "厲害的裝甲，對於抵禦攻擊很有幫助。",
    effectDescription: "防禦力 + 9、魔防 + 5",
    equipmentType: "armor",
    availableClasses: ["戰士", "法師"],
    stats: {
      DEF: 9,
      MDEF: 5,
    },
  },
  {
    name: "祝福項鍊",
    // DEV ONLY
    price: 300,
    canUse: false,
    type: "equipment",
    description: "受女神祝福的項鍊，戴著便充滿活力。",
    effectDescription: "HP上限 + 30",
    equipmentType: "accessory",
    availableClasses: ["戰士", "法師"],
    stats: {
      maxHP: 30,
    },
  },
  {
    name: "精神法戒",
    // DEV ONLY
    price: 300,
    canUse: false,
    type: "equipment",
    description: "受大法師祝福的戒指，戴著便充滿魔力。",
    effectDescription: "MP上限 + 20",
    equipmentType: "accessory",
    availableClasses: ["戰士", "法師"],
    stats: {
      maxMP: 20,
    },
  },

  // DEV ONLY 方便自己損血
  // {
  //   name: "毒藥",
  //   type: "damageHP",
  //   description: "殺人利器，一滴致命。",
  //   effectDescription: "損失 HP 50 點",
  //   effectMessage: "HP 減少了 50 點",
  //   effect: (hp) => {
  //     return hp - 50;
  //   },
  // },
];

export default items;
