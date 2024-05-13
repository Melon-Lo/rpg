import { useSelector } from "react-redux";
import { RiCoinsLine } from "react-icons/ri";
import StatusBar from "./StatusBar";
import { useEffect, useState } from "react";

export default function StatusSection() {
  const { name, classTitle, level, HP, maxHP, MP, maxMP, exp, expToNextLevel } = useSelector(state => state.characterStats);
  const { money } = useSelector(state => state.items);

  // 動畫相關變數
  const [prevHP, setPrevHP] = useState(HP);
  const [hurtStyle, setHurtStyle] = useState('');

  // 受傷動畫
  useEffect(() => {
    if (HP < prevHP) {
      setHurtStyle('animate-shake');

      setTimeout(() => {
        setHurtStyle('');
      }, 500)
    }

    setPrevHP(HP);
  }, [HP, prevHP])

  return (
    <section id="status-section" className={`w-11/12 flex flex-col items-end px-3 text-gray-800 border-2 border-gray-500 rounded my-1 ` + hurtStyle}>
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
          <StatusBar selfStatus type="HP" color="red" currentValue={HP} maxValue={maxHP} />
          <StatusBar selfStatus type="MP" color="blue" currentValue={MP} maxValue={maxMP} />
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-8/12">
          <StatusBar selfStatus type="EXP" color="green" currentValue={exp} maxValue={expToNextLevel} />
        </div>
        <div className="w-3/12 flex justify-end items-center text-xl my-1">
          <div className="bg-yellow-300 rounded-full p-1">
            <RiCoinsLine />
          </div>
          <div className="mx-2 text-lg">
            {money}
          </div>
        </div>
      </div>
    </section>
  );
}