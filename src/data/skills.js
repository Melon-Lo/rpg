const skills = [
  {
    name: "火焰",
    costMP: 10,
    canUseOutsideBattle: false,
    type: "attack",
    description: "發出火焰",
    effectDescription: "對一名敵人發出魔法攻擊",
    effectMessage: "大火燃燒吧！",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
  {
    name: "聲波",
    costMP: 15,
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "對一名敵人發出魔法攻擊",
    effectMessage: "震耳欲聾！",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
  {
    name: "治療",
    costMP: 10,
    canUseOutsideBattle: true,
    type: "healHP",
    effectDescription: "恢復 HP 20 點",
    effectMessage: "HP 恢復了 20 點",
    effect: (targetHP) => {
      return targetHP + 50;
    },
  },
];

export default skills;
