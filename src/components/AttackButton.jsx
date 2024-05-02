import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeExecutingCommand, changeEnemyHP, changeEnemyDefeated, changeTurn } from "../store";
import decideDamage from "../utils/battle/decideDamage";
import Button from "./Button";

export default function AttackButton({ setCurrentStep }) {
  const dispatch = useDispatch();
  const selfName = useSelector(state => state.characterStats.name);
  const selfATK = useSelector(state => state.characterStats.ATK);
  const enemyHP = useSelector(state => state.enemies.HP);
  const enemyName = useSelector(state => state.enemies.name);
  const enemyDEF = useSelector(state => state.enemies.DEF);


  const handleAttack = () => {
    dispatch(addMessage({
      type: 'battle',
      content: `${selfName}向${enemyName}發動了攻擊！`
    }));
    dispatch(changeExecutingCommand(true));

    // 等待 1.5s
    setTimeout(() => {
      // 對敵人造成傷害
      const damage = decideDamage(selfATK, enemyDEF);
      dispatch(changeEnemyHP(enemyHP - damage));
      dispatch(addMessage({
        type: 'battle',
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