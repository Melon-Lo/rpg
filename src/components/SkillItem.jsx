import { useSelector, useDispatch } from "react-redux";
import { addMessage, changeHP, changeMP, changeTurn, changeExecutingCommand, changeEnemyHP, changeEnemyDefeated } from "../store";
import { useContext } from "react";
import { StepContext } from "../contexts/step";
import Swal from "sweetalert2";
import skillsData from "../data/skills";

// icons
import { FaFire } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { GiHealthNormal } from "react-icons/gi";

export default function SkillItem({ name, costMP, type, attributes }) {
  const dispatch = useDispatch();
  const { setCurrentStep } = useContext(StepContext);

  // 各項數據
  const { HP: selfHP, MP: selfMP, ATK: selfATK, MATK: selfMATK, name: selfName } = useSelector(state => state.characterStats);
  const { DEF: enemyDEF, MDEF: enemyMDEF, HP: enemyHP, name: enemyName, weakness: enemyWeakness } = useSelector(state => state.enemies);
  const { inBattle } = useSelector(state => state.battle);

  // 先抓到 skills 列表中的該物件，取得該 skill 的資料
  const skill = skillsData.find(skill => skill.name === name);

  // 判別該技能當前可否使用
  const canUse = selfMP >= costMP && (inBattle || skill.canUseOutsideBattle);
  const canUseStyle = canUse ? 'font-bold' : 'text-gray-500';

  // 根據不同類別和屬性顯示 icon
  const Icon = () => {
    let iconComponent;
    if (type === 'attack') {
      if (attributes === 'fire') {
        iconComponent = <FaFire />;
      } else if (attributes === 'water') {
        iconComponent = <IoWaterSharp />;
      } else if (attributes === 'none') {
        iconComponent = <FaRegCircle />;
      }
    } else if (type === 'physicalAttack') {
      iconComponent = <LuSword />;
    } else if (type === 'healHP') {
      iconComponent = <GiHealthNormal />;
    }

    return (
      <div className="flex justify-center items-center mr-1">
        {iconComponent}
      </div>
    )
  }


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
        // 治療技能
        if (skill.type === 'healHP') {
          const valueAfterEffect = skill.effect(selfHP);
          dispatch(changeHP(valueAfterEffect));
          dispatch(addMessage({
            type: 'get',
            content: `${selfName}施展了${skill.name}！${skill.effectMessage}`,
          }));

          // 如果是在戰鬥中，施展完換成對方回合，且切換回主頁
          if (inBattle) {
            dispatch(changeTurn('enemy'));
            setCurrentStep('主頁');
          }
        // 攻擊魔法（只有在攻擊時需要changeExecutingCommand）
        } else if (skill.type === 'attack') {
          dispatch(changeExecutingCommand(true));
          setCurrentStep('主頁');

          const damage = skill.effect(selfMATK, enemyMDEF, skill.basicValue, skill.attributes, enemyWeakness);
          // 如果打到弱點，則出現「擊中弱點！」
          const effectiveText = skill.attributes === enemyWeakness ? '擊中弱點！' : '';

          dispatch(addMessage({
            type: 'basic',
            content: `${selfName}施展了${skill.name}！`,
          }));

          setTimeout(() => {
            dispatch(addMessage({
              type: 'attack',
              content: `${effectiveText}${enemyName} 受到了 ${damage} 點傷害！`,
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
          }, 1500)
        // 物理攻擊技能（只有在攻擊時需要changeExecutingCommand）
        } else if (skill.type === 'physicalAttack') {
          dispatch(changeExecutingCommand(true));
          setCurrentStep('主頁');

          const damage = skill.effect(selfATK, enemyDEF, skill.basicValue);

          dispatch(addMessage({
            type: 'basic',
            content: `${selfName}發動了${skill.name}！`,
          }));

          setTimeout(() => {
            dispatch(addMessage({
              type: 'attack',
              content: `${enemyName} 受到了 ${damage} 點傷害！`,
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
          }, 1500)
        }

        // 無論如何都要減少 costHP
        dispatch(changeMP(selfMP - skill.costMP));
      };
    })
  };

  return (
    <div className="w-3/6 flex justify-between" onClick={handleClick}>
      <h5 className={`px-2 py-1 flex ${canUseStyle}`}><Icon />{name}</h5>
      <h5 className={`px-2 py-1 ${canUseStyle}`}>{costMP}</h5>
    </div>
  );
};