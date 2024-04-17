import { useSelector } from "react-redux";
import { RiCoinsLine } from "react-icons/ri";
import StatusBar from "./StatusBar";

export default function StatusSection() {
  const { name, classTitle, level, HP, maxHP, MP, maxMP, exp, expToNextLevel } = useSelector(state => {
    return {
      name: state.charStats.name,
      classTitle: state.charStats.classTitle,
      level: state.charStats.level,
      HP: state.charStats.HP,
      maxHP: state.charStats.maxHP,
      MP: state.charStats.MP,
      maxMP: state.charStats.maxMP,
      exp: state.charStats.exp,
      expToNextLevel: state.charStats.expToNextLevel,
    };
  });

  const { money } = useSelector(state => {
    return {
      money: state.items.money,
    };
  });

  return (
    <section className="w-11/12 flex flex-col items-end px-3 text-gray-800 border-2 border-gray-500 rounded">
      <div className="flex justify-between items-center w-full">
        <div className="w-4/12">
          <div>
            <span>{name}</span>
            <span className="text-sm text-gray-500 mx-2">{classTitle}</span>
          </div>
          <div>
            LV.{level}
          </div>
        </div>
        <div className="w-8/12 max-w-80">
          <StatusBar type="HP" color="red" currentValue={HP} maxValue={maxHP} />
          <StatusBar type="MP" color="blue" currentValue={MP} maxValue={maxMP} />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-8/12">
          <StatusBar type="EXP" color="green" currentValue={exp} maxValue={expToNextLevel} />
        </div>
        <div className="w-3/12 flex justify-end items-center text-xl my-1">
          <div className="bg-yellow-300 rounded-full p-1">
            <RiCoinsLine />
          </div>
          <div className="mx-4">
            {money}
          </div>
        </div>
      </div>
    </section>
  );
}