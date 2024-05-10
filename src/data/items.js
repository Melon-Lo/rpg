const items = [
  // 補藥
  {
    name: "補藥",
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
    name: "厲害補藥",
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
