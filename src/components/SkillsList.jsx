import { useSelector, useDispatch } from "react-redux";
import { changeHP, changeMP, addMessage, changeItem, changeTurn } from "../store";
import skillsData from "../data/skills";
import Swal from "sweetalert2";

export default function SkillsList({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { skills } = useSelector(state => state.characterStats);
  const { HP, MP } = useSelector(state => state.characterStats);
  const { inBattle } = useSelector(state => state.battle);
  const characterName = useSelector(state => state.characterStats.name);

  // 查看、使用技能
  const Skill = ({ name }) => {
    // 先抓到 skills 列表中的該物件，取得該 skill 的屬性
    const skill = skillsData.find(skill => skill.name === name);
    const handleClick = () => {
      console.log(skill);

      Swal.fire({
        title: `要施展「${skill.name}」嗎？`,
        html: `
          <div>
            <h5>${skill.effectDescription}</h5>
            <h5>花費MP：${skill.cost}</h5>
            <h5>${skill.description}</h5>
          <div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          let valueAfterEffect;

          if (skill.type === 'healHP') {
            valueAfterEffect = skill.effect(HP);
            dispatch(changeHP(valueAfterEffect));
            dispatch(changeMP(MP - skill.costMP));
          };

          dispatch(addMessage({
            type: 'useSkill',
            content: `${characterName}使用了${skill.name}！${skill.effectMessage}`,
          }));
        };
      })
    }

    return (
      <div className="w-3/6 flex justify-between" onClick={handleClick}>
        <h5 className="px-2 py-1 font-bold">{name}</h5>
      </div>
    );
  };

  const renderedSkills = skills.map(skill => <Skill key={skill} name={skill} />)

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderedSkills}
    </div>
  );
};