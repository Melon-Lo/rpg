import StatusSection from "../components/StatusSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ScreenSection from "../components/ScreenSection";
import MessageSection from "../components/MessageSection";
import CommandSection from "../components/CommandSection";
import Button from "../components/Button";

// DEV ONLY
import { useDispatch } from "react-redux";
import { changeItem, changeEnemy, addMessage, changeInBattle, changeTurn, changeExecutingCommand, changeEnemyDefeated, changeEXP, changeHP } from "../store";
import enemies from "../data/enemies";
import decideTurnOrder from "../utils/battle/decideTurnOrder";
import decideDamage from "../utils/battle/decideDamage";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleCreated } = useSelector(state => state.systemStatus);

  // 戰鬥相關數據
  const selfName = useSelector(state => state.characterStats.name);
  const selfSPD = useSelector(state => state.characterStats.SPD);
  const selfHP = useSelector(state => state.characterStats.HP);
  const selfDEF = useSelector(state => state.characterStats.DEF);
  const selfEXP = useSelector(state => state.characterStats.exp);
  const enemyName = useSelector(state => state.enemies.name);
  const enemyMaxHP = useSelector(state => state.enemies.maxHP);
  const enemyHP = useSelector(state => state.enemies.HP);
  const enemyATK = useSelector(state => state.enemies.ATK);
  const enemySPD = useSelector(state => state.enemies.SPD);
  const enemyEXP = useSelector(state => state.enemies.exp);
  const { enemyDefeated } = useSelector(state => state.battle);
  const { turn } = useSelector(state => state.battle);

  // 當敵人被擊敗時
  useEffect(() => {
    const handleEnemyDeath = () => {
      if (enemyDefeated) {
        dispatch(addMessage({
          type: 'battle',
          content: `${enemyName}被擊敗了！`
        }))

        // 等待 1.5s
        setTimeout(() => {
          // 增加經驗值
          dispatch(changeEXP(selfEXP + enemyEXP));
          dispatch(addMessage({
            type: 'battle',
            content: `戰鬥勝利！獲得 ${enemyEXP} 點經驗值`
          }));

          // 回到初始狀態：沒在執行動作、沒在戰鬥中、敵人沒被擊敗
          dispatch(changeExecutingCommand(false));
          dispatch(changeInBattle(false));
          dispatch(changeEnemyDefeated(false));
        }, 1500)
      }
    }

    handleEnemyDeath();
  }, [dispatch, selfHP, enemyDefeated, enemyEXP, enemyName, selfEXP])


  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/create');
      }
    };

    handleNavigate();
  }, [navigate, roleCreated])

  // 敵方戰鬥回合
  useEffect(() => {
    // 若對方未被擊敗，則輪到對方回合
    if (turn === 'enemy') {
      // 先拿到對方的行為 AI
      const currentEnemyAi = enemies.find(enemy => enemy.name === '蝙蝠').ai;
      const nextEnemyAction = currentEnemyAi(enemyHP / enemyMaxHP);
      console.log(nextEnemyAction);

      // 對方攻擊
      if (nextEnemyAction.actionType === 'attack') {
        setTimeout(() => {
          dispatch(addMessage({
            type: 'battle',
            content: `${enemyName}發動了攻擊！`
          }))
        }, 1500)

        // 等待 1.5s
        setTimeout(() => {
          const damage = decideDamage(enemyATK, selfDEF);
          dispatch(changeHP(selfHP - damage));
          dispatch(addMessage({
            type: 'battle',
            content: `${selfName}受到了 ${damage} 點傷害！`
          }))
          dispatch(changeTurn('self'));
        }, 3000)
      }
    }
  }, [dispatch, enemyHP, enemyMaxHP, turn, enemyATK, selfDEF, selfName, enemyName, selfHP]);

  return (
    <div className="flex flex-col items-center">
      <StatusSection />
      <ScreenSection />
      <MessageSection />
      <CommandSection />

      {/* DEV ONLY */}
      <Button blue onClick={() => navigate('create')}>to create</Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => dispatch(changeItem({
        name: '補藥',
        quantity: 1,
      }))}>
        加1個補藥
      </Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => {
        const currentEnemy = enemies.find(enemy => enemy.name === '蝙蝠');
        const { name, img, loot, exp, money, ai } = currentEnemy;
        const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;
        dispatch(changeEnemy({ name, img, exp, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD }));
        dispatch(addMessage({
          type: 'system',
          content: `${name}出現了！`
        }));
        dispatch(changeInBattle(true));

        // 由雙方的 SPD 決定先攻
        const firstTurn = decideTurnOrder(selfSPD, enemySPD);
        dispatch(changeTurn(firstTurn));
      }}>
        出現蝙蝠
      </Button>

    </div>
  );
};