import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeExecutingCommand, changeEnemyHP, changeEnemyDefeated, changeTurn } from "../store";
import decideDamage from "../utils/battle/decideDamage";
import Button from "./Button";

import { useContext } from "react";
import { StepContext } from "../contexts/step";

export default function AttackButton() {
  const dispatch = useDispatch();
  const selfName = useSelector(state => state.characterStats.name);
  const selfATK = useSelector(state => state.characterStats.ATK);
  const enemyHP = useSelector(state => state.enemies.HP);
  const enemyName = useSelector(state => state.enemies.name);
  const enemyDEF = useSelector(state => state.enemies.DEF);

  const { setCurrentStep } = useContext(StepContext);

  const handleAttack = () => {
    dispatch(addMessage({
      type: 'basic',
      content: `${selfName}向${enemyName}發動了攻擊！`
    }));
    dispatch(changeExecutingCommand(true));

    // 等待 1.5s
    setTimeout(() => {
      // 對敵人造成傷害
      const damage = decideDamage(selfATK, enemyDEF);
      dispatch(changeEnemyHP(enemyHP - damage));
      dispatch(addMessage({
        type: 'attack',
        content: `${enemyName}受到了 ${damage} 點的傷害！`
      }));

      // 如果擊敗敵人，剩下的交給 MainPage 處理
      if (damage >= enemyHP) {
        dispatch(changeEnemyDefeated(true));
      } else {
        // 如果還沒擊敗敵人，則換成對方的回合
        dispatch(changeExecutingCommand(false));
        dispatch(changeTurn('enemy'));
      }

      // 無論如何都回到主頁
      setCurrentStep('主頁');
    }, 1500);
  };

  return (
    <Button onClick={handleAttack} red>向{enemyName}發動攻擊！</Button>
  );
};