import { useSelector } from "react-redux";

export default function CharacterStatsList() {
  const { name, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD, level, skills } = useSelector(state => state.characterStats);

  const renderedSkills = skills.map(skill => {
    return (
      <li key={skill}>{skill}</li>
    );
  });

  return (
    <div className="text-gray-800 w-full flex justify-between rounded-md bg-slate-50/75">
      <ul className="w-2/4 p-3">
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
      <div className="w-2/4 p-3">
        <h5>【技能】</h5>
        <ul>
          {renderedSkills}
        </ul>
      </div>
    </div>
  );
};