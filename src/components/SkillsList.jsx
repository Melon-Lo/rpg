import { useSelector } from "react-redux";
import skillsData from "../data/skills";
import SkillItem from "./SkillItem";

export default function SkillsList() {
  const { skills: selfSkills } = useSelector(state => state.characterStats);

  const renderedSkills = selfSkills.map(skillItem => {
    const { name: skillName, costMP: skillCostMP, type: skillType, attributes: skillAttributes } = skillsData.find(skill => skill.name === skillItem) || {};

    return (
      <SkillItem
        key={skillName}
        name={skillName}
        costMP={skillCostMP}
        type={skillType}
        attributes={skillAttributes}
      />
    );
  });

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderedSkills.length > 0 ? renderedSkills : '目前沒有任何技能'}
    </div>
  );
};