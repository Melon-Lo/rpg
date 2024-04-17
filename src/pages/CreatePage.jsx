import Button from "../components/Button";
import classImgData from "../data/class/classImgData";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeClassTitle } from "../store";
import { rollDiceToDetermineStats } from "../store";
import { RiDiceFill } from "react-icons/ri";
import { type } from "@testing-library/user-event/dist/type";
import { generateFighterStats, generateMagicianStats } from "../utils/generateRandomStats";
import Swal from 'sweetalert2';

export default function CreatePage() {
  const dispatch = useDispatch();
  const { name, classTitle } = useSelector(state => {
    return {
      name: state.form.name,
      classTitle: state.form.classTitle,
    };
  });
  const { maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD } = useSelector(state => {
    return {
      maxHP: state.charStats.maxHP,
      maxMP: state.charStats.maxMP,
      ATK: state.charStats.ATK,
      DEF: state.charStats.DEF,
      MATK: state.charStats.MATK,
      MDEF: state.charStats.MDEF,
      SPD: state.charStats.SPD,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, classTitle);
  };

  const handleChange = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handleSelectClass = (item) => {
    dispatch(changeClassTitle(item.classTitle))
  };

  const handleRollDice = () => {
    const rollDiceAction = (statsObject) => ({
      type: 'charStats/rollDiceToDetermineStats',
      payload: statsObject,
    });

    let payload;
    if (classTitle === '戰士') {
      payload = generateFighterStats();
    } else if (classTitle === '法師') {
      payload = generateMagicianStats();
    } else {
      Swal.fire("請先選擇職業！");
    }

    dispatch(rollDiceAction(payload));
  };

  // 職業列表
  const renderedClassList = classImgData.map(classItem => {
    const selectedStyle = classTitle === classItem.classTitle ? 'border-blue-800 border-4' : 'border-2 border-gray-400';

    return (
      <div key={classItem.classTitle} className={"w-40 m-1 p-8 rounded-md flex flex-col items-center " + selectedStyle} onClick={() => handleSelectClass(classItem)}>
        <classItem.icon className="text-xl" />
        <h5 className="font-medium mt-3">{classItem.classTitle}</h5>
      </div>
    )
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-xl">歡迎來到好玩的RPG！</h1>
        <h3 className="text-lg text-gray-600 mt-3">在此建立你的角色</h3>
      </div>
      <form className="mt-10 w-full flex flex-col items-center" onSubmit={handleSubmit}>
        {/* 輸入名字 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3">名字</h2>
          <input onChange={handleChange} value={name} className="p-3" type="text" placeholder="輸入角色名..." />
        </div>
        {/* 選擇職業 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3">職業</h2>
          <div className="flex flex-wrap justify-start items-center w-5/6">
            {renderedClassList}
          </div>
        </div>
        {/* 擲骰子 */}
        <div className="flex flex-col items-center w-5/6 text-lg py-5" onClick={handleRollDice}>
          <div className="border-2 border-blue-800 rounded-full w-24 h-24 flex justify-center items-center shadow-md shadow-blue-500/50">
            <RiDiceFill className="text-5xl text-blue-800" />
          </div>
          <div className="border-2 border-gray-300 p-3 rounded-lg leading-8 mt-8 w-full max-w-60 text-gray-800">
            <h5>HP：{maxHP ? maxHP : '-'}</h5>
            <h5>MP：{maxMP ? maxMP : '-'}</h5>
            <h5>攻擊力：{ATK ? ATK : '-'}</h5>
            <h5>防禦力：{DEF ? DEF : '-'}</h5>
            <h5>魔法攻擊力：{MATK ? MATK : '-'}</h5>
            <h5>魔法防禦力：{MDEF ? MDEF : '-'}</h5>
            <h5>速度：{SPD ? SPD : '-'}</h5>
          </div>
        </div>
        <Button primary rounded className="mt-5">創建角色</Button>
      </form>
    </div>
  );
}