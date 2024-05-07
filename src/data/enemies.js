import bat from "../assets/images/enemies/bat.png";
import devil from "../assets/images/enemies/devil.png";
import bear from "../assets/images/enemies/bear.png";
import wolf from "../assets/images/enemies/wolf.png";
import lion from "../assets/images/enemies/lion.png";

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
      DEF: 3,
      MATK: 8,
      MDEF: 3,
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
      ATK: 15,
      DEF: 5,
      MATK: 15,
      MDEF: 5,
      SPD: 3,
    },
    exp: 50,
    money: 80,
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
  {
    name: "惡熊",
    img: bear,
    weakness: "fire",
    isBoss: false,
    stats: {
      HP: 40,
      maxHP: 40,
      ATK: 10,
      DEF: 3,
      MATK: 2,
      MDEF: 1,
      SPD: 2,
    },
    exp: 9,
    money: 12,
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
    name: "狼",
    img: wolf,
    weakness: "water",
    isBoss: false,
    stats: {
      HP: 35,
      maxHP: 35,
      ATK: 9,
      DEF: 3,
      MATK: 5,
      MDEF: 3,
      SPD: 3,
    },
    exp: 10,
    money: 6,
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
    name: "森林之王",
    img: lion,
    weakness: "fire",
    isBoss: true,
    stats: {
      HP: 120,
      maxHP: 120,
      ATK: 15,
      DEF: 5,
      MATK: 10,
      MDEF: 5,
      SPD: 3,
    },
    exp: 50,
    money: 80,
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
];

export default enemies;
