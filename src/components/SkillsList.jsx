import { useSelector, useDispatch } from "react-redux";
import { changeHP, changeMP, addMessage, changeTurn, changeEnemyHP, changeEnemyDefeated, changeExecutingCommand } from "../store";
import skillsData from "../data/skills";
import Swal from "sweetalert2";

export default function SkillsList({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { HP: selfHP, MP: selfMP, skills: selfSkills, MATK: selfMATK, name: selfName } = useSelector(state => state.characterStats);
  const { MDEF: enemyMDEF, HP: enemyHP, name: enemyName, weakness: enemyWeakness } = useSelector(state => state.enemies);
  const { inBattle } = useSelector(state => state.battle);

  // 查看、使用技能
  const Skill = ({ name, costMP }) => {
    // 先抓到 skills 列表中的該物件，取得該 skill 的屬性
    const skill = skillsData.find(skill => skill.name === name);

    // 判別該技能當前可否使用
    const canUse = selfMP >= costMP && (inBattle || skill.canUseOutsideBattle);
    const canUseStyle = canUse ? 'font-bold' : 'text-gray-500';

    const handleClick = () => {
      // 如果 MP 不足，則提早 return
      if (!canUse) {
        // 無法使用的原因
        const reason = selfMP >= costMP && !skill.canUseOutsideBattle ? '此技能只能在戰鬥中使用' : selfMP < costMP ? 'MP不足' : '目前無法使用';

        Swal.fire({
          title: `${reason}`,
          icon: 'info',
        })

        return;
      }

      Swal.fire({
        title: `要施展「${skill.name}」嗎？`,
        html: `
          <div>
            <h5>${skill.effectDescription}</h5>
            <h5>花費MP：${skill.costMP} 點</h5>
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
          dispatch(changeExecutingCommand(true));

          // 治療技能
          if (skill.type === 'healHP') {
            const valueAfterEffect = skill.effect(selfHP);
            dispatch(changeHP(valueAfterEffect));
            dispatch(addMessage({
              type: 'useSkill',
              content: `${selfName}使用了${skill.name}！${skill.effectMessage}`,
            }));
          // 攻擊技能
          } else if (skill.type === 'attack') {
            const damage = skill.effect(selfMATK, enemyMDEF, skill.basicValue, skill.attributes, enemyWeakness);
            // 如果打到弱點，則出現「擊中弱點！」
            const effectiveText = skill.attributes === enemyWeakness ? '擊中弱點！' : '';

            dispatch(addMessage({
              type: 'useSkill',
              content: `${selfName}施展了${skill.name}！${effectiveText}${enemyName} 受到了 ${damage} 點傷害！`,
            }));
            dispatch(changeEnemyHP(enemyHP - damage));

            // 如果擊敗敵人，剩下的交給 MainPage 處理
            if (damage >= enemyHP) {
              dispatch(changeEnemyDefeated(true));
            // 如果還沒擊敗敵人，則換成對方的回合
            } else {
              dispatch(changeExecutingCommand(false));
              dispatch(changeTurn('enemy'));
            }
          };

          // 無論如何都回到主頁和減少 costHP
          setCurrentStep('主頁');
          dispatch(changeMP(selfMP - skill.costMP));
        };
      })
    }

    return (
      <div className="w-3/6 flex justify-between" onClick={handleClick}>
        <h5 className={`px-2 py-1 ${canUseStyle}`}>{name}</h5>
        <h5 className={`px-2 py-1 ${canUseStyle}`}>{costMP}</h5>
      </div>
    );
  };

  const renderedSkills = selfSkills.map(skillItem => {
    const skillName = skillsData.find(skill => skill.name === skillItem).name;
    const skillCostMP = skillsData.find(skill => skill.name === skillItem).costMP;

    return (
      <Skill key={skillName} name={skillName} costMP={skillCostMP} />
    );
  });

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderedSkills}
    </div>
  );
};