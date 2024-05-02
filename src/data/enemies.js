import bat from "../assets/images/enemies/bat.png";
import devil from "../assets/images/enemies/devil.png";

const enemies = [
  {
    name: "蝙蝠",
    img: bat,
    weakness: "fire",
    isBoss: false,
    stats: {
      HP: 30,
      maxHP: 30,
      ATK: 8,
      DEF: 1,
      MATK: 8,
      MDEF: 1,
      SPD: 2,
    },
    exp: 8,
    money: 10,
    loot: [
      {
        name: "補藥",
        quantity: 1,
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
          action = "聲波";
        } else {
          actionType = "attack";
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
      HP: 150,
      maxHP: 150,
      ATK: 20,
      DEF: 5,
      MATK: 20,
      MDEF: 5,
      SPD: 3,
    },
    exp: 80,
    money: 100,
    loot: [
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
          actionType = "attack";
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
