import { useSelector } from "react-redux";
import skillsData from '../data/skills';
import Swal from "sweetalert2";

export default function CharacterStatsList() {
  const { name, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD, level, skills } = useSelector(state => state.characterStats);

  const renderedSkills = skills.map(skill => {
    const { name: skillName, costMP: skillCostMP, effectDescription: skillEffectDescription } = skillsData.find(skillItem => skillItem.name === skill);

    const handleClick = () => {
      Swal.fire({
        title: `${skillName}`,
        text: `${skillEffectDescription}`
      });
    };

    return (
      <div onClick={handleClick} key={skill} className="flex px-1">
        <h5>{skillName}</h5>
        <h5 className="ml-3">{skillCostMP}</h5>
      </div>
    );
  });

  return (
    <div className="text-gray-800 w-full flex justify-between rounded-md bg-slate-50/75">
      <ul className="w-1/2 p-3">
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
      <div className="w-1/2 p-3">
        <h5 className="font-bold mb-3">【技能】</h5>
        <div className="flex flex-wrap justify-between">
          {renderedSkills}
        </div>
      </div>
    </div>
  );
};