import bat from "../assets/images/enemies/bat.png";

const enemies = [
  {
    name: "蝙蝠",
    img: bat,
    stats: {
      HP: 20,
      maxHP: 20,
      ATK: 10,
      DEF: 10,
      MATK: 2,
      MDEF: 2,
      SPD: 3,
    },
    money: 10,
    loot: [
      {
        name: "補藥",
        quantity: 2,
      },
    ],
  },
];

export default enemies;
