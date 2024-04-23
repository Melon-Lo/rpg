const items = [
  {
    name: "補藥",
    type: "healHP",
    description: "大家常備的藥品，冒險的好幫手。",
    effectDescription: "恢復 HP 50 點",
    effectMessage: "HP 恢復了 50 點！",
    effect: (hp) => {
      return hp + 50;
    },
  },
  {
    name: "魔法藥",
    type: "healMP",
    description: "魔法師常用藥品，沒了它寸步難行。",
    effectDescription: "恢復 MP 20 點",
    effectMessage: "MP 恢復了 20 點！",
    effect: (mp) => {
      return mp + 20;
    },
  },
  {
    name: "毒藥",
    type: "damageHP",
    description: "殺人利器，一滴即致命。",
    effectDescription: "損失 HP 50 點",
    effectMessage: "HP 減少了 50 點！",
    effect: (hp) => {
      return hp - 50;
    },
  },
];

export default items;
