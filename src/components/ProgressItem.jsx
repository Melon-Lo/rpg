import { useSelector } from "react-redux";

export default function ProgressItem({
  index,
  currentTime,
  name,
  classTitle,
  level,
  currentScene,
  money,
}) {

  // 取得現在所有的資料
  const { name: currentName, classTitle: currentClassTitle, level: currentLevel, HP, maxHP, MP, maxMP, ATK, DEF, MATK, MDEF, SPD, exp, expToNextLevel, skills } = useSelector(state => state.characterStats);
  const { money: currentMoney, data } = useSelector(state => state.items);
  const { currentScene: scene } = useSelector(state => state.systemStatus);

  const handleSave = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = `${year}/${month}/${date} ${hours}:${minutes}`
    const progressData = {
      characterStats: { name: currentName, classTitle: currentClassTitle, level: currentLevel, HP, maxHP, MP, maxMP, ATK, DEF, MATK, MDEF, SPD, exp, expToNextLevel, skills },
      items: { money: currentMoney, data },
      systemStatus: { currentScene: scene },
      currentTime: { currentTime },
    };
    localStorage.setItem(`progressData${index}`, JSON.stringify(progressData));
  };

  return (
    <div onClick={handleSave} className="flex items-center w-11/12 rounded-lg overflow-hidden h-20 my-3 shadow-md cursor-pointer">
      <h5 className="w-4/12 bg-rose-700 text-slate-100 h-full flex justify-center items-center">進度 {index}</h5>
      <div className="w-8/12 bg-slate-100/80 h-full flex flex-col justify-center items-start pl-2 text-gray-800">
        { currentTime ?
          <>
            <p>{currentTime}</p>
            <p>{name}｜{classTitle}｜LV{level}</p>
            <p>{currentScene}｜${money}</p>
          </>
          :
          <p>尚無資料</p>
        }
      </div>
    </div>
  );
};