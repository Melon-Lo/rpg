const items = [
  {
    name: "補藥",
    type: "heal",
    effectDescription: "恢復 HP 50 點。",
    effect: (hp) => {
      return hp + 50;
    },
  },
];

export default items;
