import { FaShoePrints } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { BsFillBackpackFill } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";

const commands = [
  {
    command: "交談",
    color: "blue",
    img: IoChatbubble,
  },
  {
    command: "移動",
    color: "green",
    img: FaShoePrints,
  },
  {
    command: "物品",
    color: "yellow",
    img: BsFillBackpackFill,
  },
  {
    command: "狀態",
    color: "teal",
    img: FaPerson,
  },
];

export default commands;
