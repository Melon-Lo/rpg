import { FaShoePrints } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BsFillBackpackFill } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import { LuSwords } from "react-icons/lu";
import { GiMagicPortal } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { GiMaze } from "react-icons/gi";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { BsEscape } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";

const commands = [
  {
    type: "main",
    commands: [
      {
        command: "移動",
        color: "green",
        img: FaShoePrints,
      },
      {
        command: "探索",
        color: "emerald",
        img: GiMaze,
      },
      {
        command: "交談",
        color: "blue",
        img: IoChatbubble,
      },
      {
        command: "技能",
        color: "cyan",
        img: GiMagicPortal,
      },
      {
        command: "物品",
        color: "yellow",
        img: BsFillBackpackFill,
      },
      {
        command: "裝備",
        color: "slate",
        img: FaTshirt,
      },
      {
        command: "狀態",
        color: "teal",
        img: FaPerson,
      },
      {
        command: "任務",
        color: "neutral",
        img: FaListAlt,
      },
      {
        command: "探險",
        color: "fuchsia",
        img: FaMagnifyingGlassLocation,
      },
      {
        command: "系統",
        color: "rose",
        img: FaGear,
      },
      {
        command: "脫逃",
        color: "purple",
        img: BsEscape,
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
        color: "cyan",
        img: GiMagicPortal,
      },
      {
        command: "物品",
        color: "yellow",
        img: BsFillBackpackFill,
      },
      {
        command: "逃跑",
        color: "gray",
        img: FaRunning,
      },
    ],
  },
  {
    type: "village",
    commands: [
      {
        command: "旅館",
        color: "lime",
        img: FaHotel,
      },
      {
        command: "商店",
        color: "amber",
        img: FaShop,
      },
    ],
  },
];
export default commands;
