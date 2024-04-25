const skills = [
  {
    name: "火焰",
    type: "attack",
    description: "發出火焰",
    effectDescription: "對一名敵人發出魔法攻擊",
    effectMessage: "使出了火焰！",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
  {
    name: "聲波",
    type: "attack",
    effectDescription: "對一名敵人發出魔法攻擊",
    effectMessage: "使出了聲波！",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
  {
    name: "治療",
    type: "healHP",
    effectDescription: "恢復 HP 20 點",
    effectMessage: "HP 恢復了 20 點",
    effect: (targetHP) => {
      return targetHP + 50;
    },
  },
];

export default skills;
