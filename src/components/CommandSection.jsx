import { TiArrowBack } from "react-icons/ti";
import commandImg from "../data/command/commandImg";
import CommandItem from "./CommandItem";

export default function CommandSection() {
  const renderedCommandItems = commandImg.map(commandItem => {
    return (
      <CommandItem key={commandItem.command} command={commandItem.command} color={commandItem.color} Icon={commandItem.img} />
    )
  });

  return (
    <section className="w-11/12 bg-orange-100 rounded-md">
      <div className="flex justify-between p-3">
        <p className="text-xl text-orange-800">想做什麼呢？</p>
        <div className="flex justify-center items-center">
          <TiArrowBack className="text-2xl text-orange-800" />
        </div>
      </div>
      <div className="p-3 flex justify-start items-center">
        {renderedCommandItems}
      </div>
    </section>
  )
};