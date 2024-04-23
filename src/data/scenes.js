// scene imgs
import village from "../assets/images/scenes/village.jpg";
import forest from "../assets/images/scenes/forest.jpg";
import cave from "../assets/images/scenes/cave.jpg";

// npc imgs
import elder from "../assets/images/npcs/elder.png";
import elf from "../assets/images/npcs/elf.png";
import caveman from "../assets/images/npcs/caveman.png";
import villager from "../assets/images/npcs/villager.png";

const scenes = [
  {
    name: "村莊",
    img: village,
    characters: [
      {
        name: "村長",
        img: elder,
        dialogue: [
          "嗨，歡迎來到我們村莊～",
          "第一次來這裡一定很緊張吧！",
          "別擔心，有任何問題都可以問我哦～",
        ],
      },
      {
        name: "村民",
        img: villager,
        dialogue: ["嘿！"],
      },
    ],
  },
  {
    name: "森林",
    img: forest,
    characters: [
      {
        name: "精靈",
        img: elf,
        dialogue: ["哈囉！"],
      },
    ],
  },
  {
    name: "山洞",
    img: cave,
    characters: [
      {
        name: "山頂洞人",
        img: caveman,
        dialogue: ["啊啦估？"],
      },
    ],
  },
];

export default scenes;
