const items = [
  {
    name: "補藥",
    type: "healHP",
    description: "大家常備的藥品，冒險的好幫手。",
    effectDescription: "恢復 HP 50 點",
    effectMessage: "HP 恢復了 50 點",
    effect: (hp) => {
      return hp + 50;
    },
  },
  {
    name: "厲害補藥",
    type: "healHP",
    description: "比一般的補藥效果更好。",
    effectDescription: "恢復 HP 150 點",
    effectMessage: "HP 恢復了 150 點",
    effect: (hp) => {
      return hp + 100;
    },
  },
  {
    name: "強效補藥",
    type: "healHP",
    description: "重傷時趕快使用就對了。",
    effectDescription: "恢復 HP 300 點",
    effectMessage: "HP 恢復了 300 點",
    effect: (hp) => {
      return hp + 300;
    },
  },
  {
    name: "究極補藥",
    type: "healHP",
    description: "有起死回生之效果",
    effectDescription: "恢復 HP 999 點",
    effectMessage: "HP 恢復了 999 點",
    effect: (hp) => {
      return hp + 999;
    },
  },
  {
    name: "魔法藥",
    type: "healMP",
    description: "魔法師常用藥品，沒了它寸步難行。",
    effectDescription: "恢復 MP 30 點",
    effectMessage: "MP 恢復了 30 點",
    effect: (mp) => {
      return mp + 30;
    },
  },
  {
    name: "高等魔法藥",
    type: "healMP",
    description: "高等魔法師愛用",
    effectDescription: "恢復 MP 100 點",
    effectMessage: "MP 恢復了 100 點",
    effect: (mp) => {
      return mp + 100;
    },
  },
  {
    name: "究極魔法藥",
    type: "healMP",
    description: "使用後全身充滿魔力。",
    effectDescription: "恢復 MP 300 點",
    effectMessage: "MP 恢復了 300 點",
    effect: (mp) => {
      return mp + 300;
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
