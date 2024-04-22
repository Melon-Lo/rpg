import village from "../assets/images/scenes/village.jpg";
import forest from "../assets/images/scenes/forest.jpg";
import cave from "../assets/images/scenes/cave.jpg";

const scenes = [
  {
    name: "村莊",
    img: village,
    characters: [
      {
        name: "村長",
        dialogue: [
          "嗨，歡迎來到我們村莊～",
          "第一次來這裡一定很緊張吧！",
          "別擔心，有任何問題都可以問我哦～",
        ],
      },
    ],
  },
  {
    name: "森林",
    img: forest,
    characters: [
      {
        name: "精靈",
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
        dialogue: ["啊啦估？"],
      },
    ],
  },
];

export default scenes;