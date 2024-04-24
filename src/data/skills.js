const skills = [
  {
    name: "火焰",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
  {
    name: "聲波",
    effect: (attackerMATK, defenderMDEF) => {
      let damage;
      damage = attackerMATK - defenderMDEF;
      return damage;
    },
  },
];

export default skills;
