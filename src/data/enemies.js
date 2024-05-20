import bat from "../assets/images/enemies/bat.png";
import devil from "../assets/images/enemies/devil.png";
import bear from "../assets/images/enemies/bear.png";
import wolf from "../assets/images/enemies/wolf.png";
import lion from "../assets/images/enemies/lion.png";
import snake from "../assets/images/enemies/snake.png";

const enemies = [
  // 森林
  {
    name: "惡熊",
    img: bear,
    weakness: "fire",
    isBoss: false,
    stats: {
      HP: 70,
      maxHP: 70,
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
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "physicalAttackSkill";
          skill = "衝撞";
        } else {
          action = "attack";
        }
      }

      return { action, skill };
    },
  },
  {
    name: "灰狼",
    img: wolf,
    weakness: "earth",
    isBoss: false,
    stats: {
      HP: 60,
      maxHP: 60,
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
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "physicalAttackSkill";
          skill = "撕咬";
        } else {
          action = "attack";
        }
      }

      return { action, skill };
    },
  },
  {
    name: "百獸之王",
    img: lion,
    weakness: "fire",
    isBoss: true,
    stage: 1,
    stats: {
      HP: 200,
      maxHP: 150,
      ATK: 13,
      DEF: 5,
      MATK: 10,
      MDEF: 5,
      SPD: 3,
    },
    exp: 50,
    money: 80,
    loot: [
      {
        name: "獅子的鬃毛",
        quantity: 1,
      },
    ],
    ai: (percentHP) => {
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "physicalAttackSkill";
          skill = "獅吼";
        } else {
          action = "attack";
        }
      }

      return { action, skill };
    },
  },
  // 洞穴
  {
    name: "蝙蝠",
    img: bat,
    weakness: "wind",
    isBoss: false,
    stats: {
      HP: 80,
      maxHP: 60,
      ATK: 15,
      DEF: 8,
      MATK: 15,
      MDEF: 8,
      SPD: 3,
    },
    exp: 15,
    money: 20,
    loot: [
      {
        name: "補藥",
        quantity: 1,
      },
    ],
    ai: (percentHP) => {
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "attackSkill";
          skill = "聲波";
        } else {
          action = "attack";
        }
      }

      return { action, skill };
    },
  },
  {
    name: "青蛇",
    img: snake,
    weakness: "fire",
    isBoss: false,
    stats: {
      HP: 90,
      maxHP: 50,
      ATK: 18,
      DEF: 5,
      MATK: 5,
      MDEF: 5,
      SPD: 4,
    },
    exp: 16,
    money: 22,
    loot: [
      {
        name: "魔法藥",
        quantity: 1,
      },
    ],
    ai: (percentHP) => {
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "physicalAttackSkill";
          skill = "撕咬";
        } else {
          action = "attack";
        }
      }

      return { action, skill };
    },
  },
  {
    name: "惡鬼",
    img: devil,
    weakness: "water",
    isBoss: true,
    stage: 2,
    stats: {
      HP: 350,
      maxHP: 250,
      ATK: 22,
      DEF: 12,
      MATK: 22,
      MDEF: 12,
      SPD: 5,
    },
    exp: 90,
    money: 100,
    loot: [
      {
        name: "魔法藥",
        quantity: 2,
      },
    ],
    ai: (percentHP) => {
      let action, skill;

      if (percentHP > 0.6) {
        action = "attack";
      } else if (percentHP > 0.3) {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          action = "attackSkill";
          skill = "火焰";
        } else {
          action = "attack";
        }
      } else {
        action = "attackSkill";
        skill = "熊熊烈火";
      }

      return { action, skill };
    },
  },
];

export default enemies;
