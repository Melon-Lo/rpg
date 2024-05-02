import bat from "../assets/images/enemies/bat.png";
import devil from "../assets/images/enemies/devil.png";

const enemies = [
  {
    name: "蝙蝠",
    img: bat,
    weakness: "fire",
    isBoss: false,
    stats: {
      HP: 50,
      maxHP: 50,
      ATK: 20,
      DEF: 5,
      MATK: 30,
      MDEF: 2,
      SPD: 1,
    },
    exp: 60,
    money: 10,
    loot: [
      {
        name: "補藥",
        quantity: 2,
      },
      {
        name: "毒藥",
        quantity: 3,
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
  {
    name: "魔王",
    img: devil,
    weakness: "water",
    isBoss: true,
    stats: {
      HP: 300,
      maxHP: 300,
      ATK: 40,
      DEF: 20,
      MATK: 30,
      MDEF: 2,
      SPD: 4,
    },
    exp: 200,
    money: 100,
    loot: [
      {
        name: "補藥",
        quantity: 3,
      },
      {
        name: "魔法藥",
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
          action = "地獄鬼火";
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
