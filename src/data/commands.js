import { FaShoePrints } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BsFillBackpackFill } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { GiMagicPortal } from "react-icons/gi";

const commands = [
  {
    type: "main",
    commands: [
      {
        command: "交談",
        color: "yellow",
        img: IoChatbubble,
      },
      {
        command: "移動",
        color: "green",
        img: FaShoePrints,
      },
      {
        command: "技能",
        color: "blue",
        img: GiMagicPortal,
      },
      {
        command: "物品",
        color: "brown",
        img: BsFillBackpackFill,
      },
      {
        command: "狀態",
        color: "teal",
        img: FaPerson,
      },
    ],
  },
  {
    type: "battle",
    commands: [
      {
        command: "攻擊",
        color: "red",
        img: LuSwords,
      },
      {
        command: "技能",
        color: "blue",
        img: GiMagicPortal,
      },
      {
        command: "物品",
        color: "yellow",
        img: BsFillBackpackFill,
      },
    ],
  },
];
export default commands;
