import bat from "../assets/images/enemies/bat.png";

const enemies = [
  {
    name: "蝙蝠",
    img: bat,
    stats: {
      HP: 500,
      maxHP: 500,
      ATK: 25,
      DEF: 5,
      MATK: 2,
      MDEF: 2,
      SPD: 3,
    },
    exp: 10,
    money: 10,
    loot: [
      {
        name: "補藥",
        quantity: 2,
      },
    ],
    // actions: [
    //   { name: "attack" },
    //   { name: "useSkill", skill: ["火焰", "聲波"] },
    //   { name: "flee" },
    // ],
    ai: (percentHP) => {
      let actionType;
      let action;

      if (percentHP > 0.6) {
        actionType = "attack";
      } else if (percentHP <= 0.6 && percentHP > 0.1) {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          actionType = "skill";
          action = "火焰";
        } else {
          actionType = "skill";
          action = "聲波";
        }
      } else {
        actionType = "flee";
      }

      return {
        actionType,
        action,
      };
    },
  },
];

export default enemies;
