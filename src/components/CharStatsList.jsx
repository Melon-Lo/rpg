import { useSelector } from "react-redux";

export default function CharStatsList() {
  const { name, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD, level } = useSelector(state => state.charStats);

  return (
    <div className="bg-slate-50/75 p-3 text-gray-800 rounded-md">
      <ul>
        <li>名字：{name}</li>
        <li>職業：{classTitle}</li>
        <li>等級：{level}</li>
        <li>最大HP：{maxHP}</li>
        <li>最大MP：{maxMP}</li>
        <li>攻擊力：{ATK}</li>
        <li>防禦力：{DEF}</li>
        <li>魔法攻擊力：{MATK}</li>
        <li>魔法防禦力：{MDEF}</li>
        <li>速度：{SPD}</li>
      </ul>
    </div>
  );
};