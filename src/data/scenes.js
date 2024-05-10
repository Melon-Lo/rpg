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
    stage: 1,
    img: village,
    isDiscoverable: false,
    characters: [
      {
        name: "村長",
        img: elder,
        dialogues: [
          {
            stage: 1,
            dialogue: [
              "嗨，歡迎來到我們村莊！",
              "村莊有許多設施可以運用，歡迎在這裡補充好狀態再去探險。",
              "若有任何問題，可以看看系統中的『冒險指南』，裡面有詳細講解。",
              "祝你有個愉快的冒險～",
            ],
          },
        ],
      },
      {
        name: "村民",
        img: villager,
        dialogues: [
          {
            stage: 1,
            dialogue: [
              "聽說附近森林最近有許多生物在作亂。",
              "唉⋯⋯不知道何時村莊才能安寧一點。",
            ],
          },
          {
            stage: 2,
            dialogue: [
              "聽說森林裡這幾天平靜了許多。",
              "不知道是發生什麼事？",
              "不過很好，這樣大家也能安心一點。",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "森林",
    img: forest,
    stage: 1,
    isDiscoverable: true,
    characters: [
      {
        name: "精靈",
        img: elf,
        dialogues: [
          {
            stage: 1,
            dialogue: [
              "啊？是冒險者嗎？",
              "太好了，你終於來了！",
              "森林的深處最近跑來一隻兇猛的野獸，全身長滿了毛，好可怕！",
              "如果可以的話，麻煩你去幫忙解決好嗎？",
              "哦，對了，森林中大多的生物都怕火哦。",
              "非常感謝你！",
            ],
          },
          {
            stage: 2,
            dialogue: [
              "哇！謝謝你打倒了那隻大怪物！",
              "我替其他精靈們跟你說聲感謝！",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "洞穴",
    img: cave,
    stage: 2,
    isDiscoverable: true,
    characters: [
      {
        name: "山頂洞人",
        img: caveman,
        dialogues: [
          {
            stage: 1,
            dialogue: ["啊啦估？"],
          },
        ],
      },
    ],
  },
];

export default scenes;
