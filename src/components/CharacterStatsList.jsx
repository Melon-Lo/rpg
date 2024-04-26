import { useSelector } from "react-redux";
import skillsData from '../data/skills';

export default function CharacterStatsList() {
  const { name, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD, level, skills } = useSelector(state => state.characterStats);

  const renderedSkills = skills.map(skill => {
    const skillName = skillsData.find(skillItem => skillItem.name === skill).name;
    const skillCostMP = skillsData.find(skillItem => skillItem.name === skill).costMP;

    return (
      <div key={skill} className="flex">
        <h5>{skillName}</h5>
        <h5 className="ml-3">{skillCostMP}</h5>
      </div>
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
        <div>
          {renderedSkills}
        </div>
      </div>
    </div>
  );
};