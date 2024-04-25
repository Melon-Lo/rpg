import bat from "../assets/images/enemies/bat.png";

const enemies = [
  {
    name: "蝙蝠",
    img: bat,
    stats: {
      HP: 100,
      maxHP: 100,
      ATK: 520,
      DEF: 5,
      MATK: 30,
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
    ai: (percentHP) => {
      let actionType;
      let action;

      if (percentHP > 0.6) {
        actionType = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          actionType = "skill";
          action = "火焰";
        } else {
          actionType = "skill";
          action = "聲波";
        }
      }

      return {
        actionType,
        action,
      };
    },
  },
];

export default enemies;
