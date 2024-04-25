import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeItem, changeEnemy, addMessage, changeInBattle, changeTurn, changeExecutingCommand, changeSelfDefeated, changeEnemyDefeated, changeEXP, changeHP, changeCurrentScene, changeMoney } from "../store";
import Swal from "sweetalert2";

// components
import StatusSection from "../components/StatusSection";
import ScreenSection from "../components/ScreenSection";
import MessageSection from "../components/MessageSection";
import CommandSection from "../components/CommandSection";
import Button from "../components/Button";

// data
import enemies from "../data/enemies";
import skills from "../data/skills";

// utils
import decideTurnOrder from "../utils/battle/decideTurnOrder";
import decideDamage from "../utils/battle/decideDamage";
import getRandomLoot from "../utils/battle/getRandomLoot";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleCreated } = useSelector(state => state.systemStatus);

  // 戰鬥相關數據
  const { name: selfName, SPD: selfSPD, HP: selfHP, DEF: selfDEF, MDEF: selfMDEF, exp: selfEXP } = useSelector(state => state.characterStats);
  const { name: enemyName, maxHP: enemyMaxHP, HP: enemyHP, ATK: enemyATK, MATK: enemyMATK, SPD: enemySPD, exp: enemyEXP, money: enemyMoney, loot: enemyLoot } = useSelector(state => state.enemies);
  const { selfDefeated, enemyDefeated, inBattle } = useSelector(state => state.battle);
  const { turn } = useSelector(state => state.battle);
  const { money } = useSelector(state => state.items);

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/create');
      }
    };

    handleNavigate();
  }, [navigate, roleCreated])

  // --------------------------------------------
  // 戰鬥狀態
  // --------------------------------------------

  // 敵人出現後，將該敵人的數值傳給 enemiesSlice
  const handleShowEnemy = () => {
    const currentEnemy = enemies.find(enemy => enemy.name === '蝙蝠');
    const { name, img, loot, exp, money } = currentEnemy;
    const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;
    dispatch(changeEnemy({ name, img, exp, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD }));
    dispatch(addMessage({
      type: 'system',
      content: `${name}出現了！`
    }));
    dispatch(changeInBattle(true));
  };

  // 敵人出現後，由敵我雙方的 SPD 決定先攻
  useEffect(() => {
    if (inBattle && turn === '') {
      const firstTurn = decideTurnOrder(selfSPD, enemySPD);
      setTimeout(() => {
        dispatch(changeTurn(firstTurn));
        dispatch(addMessage({
          type: 'battle',
          content: '敵人速度較快，敵人先攻！'
        }))
      }, 1500)
    }
  }, [dispatch, selfSPD, enemySPD, inBattle, turn])

  // 敵方戰鬥回合
  useEffect(() => {
    const handleEnemyTurn = () => {
      // 若對方未被擊敗，則輪到對方回合
      if (inBattle && turn === 'enemy') {
        // 先拿到對方的行為 AI
        const currentEnemyAi = enemies.find(enemy => enemy.name === '蝙蝠').ai;
        const nextEnemyAction = currentEnemyAi(enemyHP / enemyMaxHP);
        const damage = decideDamage(enemyATK, selfDEF);

        // 對方發動一般攻擊
        if (nextEnemyAction.actionType === 'attack') {
          setTimeout(() => {
            dispatch(addMessage({
              type: 'battle',
              content: `${enemyName}發動了攻擊！`
            }))
          }, 1500)

          // 等待 3s
          setTimeout(() => {
            dispatch(changeHP(selfHP - damage));
            dispatch(addMessage({
              type: 'battle',
              content: `${selfName}受到了 ${damage} 點傷害！`
            }));
          }, 3000)

          // 對方發動技能
        } else if (nextEnemyAction.actionType === 'skill') {
          const skillName = nextEnemyAction.action;
          const skillEffect = skills.find(skill => skill.name === skillName).effect;
          const damage = skillEffect(enemyMATK, selfMDEF);

          setTimeout(() => {
            dispatch(addMessage({
              type: 'battle',
              content: `${enemyName}發動了${skillName}！`
            }))
          }, 1500)

          // 等待 3s
          setTimeout(() => {
            dispatch(changeHP(selfHP - damage));
            dispatch(addMessage({
              type: 'battle',
              content: `${selfName}受到了 ${damage} 點傷害！`
            }))
          }, 3000)
        }

        setTimeout(() => {
          // 角色被打死
          if (damage >= selfHP) {
            dispatch(changeSelfDefeated(true));
          // 如果角色未死亡，換到自己的回合
          } else {
            dispatch(changeTurn('self'));
          }
        }, 4500)

        dispatch(changeTurn('enemyExecuting'));
      }
    }

    handleEnemyTurn();
  }, [dispatch, enemyHP, enemyMaxHP, turn, enemyATK, selfDEF, selfName, enemyName, selfHP, enemyMATK, selfMDEF, inBattle]);

  // 戰鬥勝利：當敵人被擊敗時
  useEffect(() => {
    const handleEnemyDefeated = () => {
      if (enemyDefeated) {
        // 等待 1.5s
        setTimeout(() => {
          dispatch(addMessage({
            type: 'battle',
            content: `${enemyName}被擊敗了！`
          }))
        }, 1500)

        // 等待 3s
        setTimeout(() => {
          let lootText = '';

          // 增加經驗值和金錢
          dispatch(changeEXP(selfEXP + enemyEXP));
          dispatch(changeMoney(money + enemyMoney));

          // 隨機獲得戰利品
          const loot = getRandomLoot(enemyLoot);
          // 如果有獲得戰利品（一半機率）
          if (loot) {
            lootText = `${loot.name} * ${loot.quantity}`;
            dispatch(changeItem(loot));
          }

          dispatch(addMessage({
            type: 'battle',
            content: `戰鬥勝利！獲得 ${enemyEXP} 點經驗值、金錢 ${enemyMoney} 元！${lootText}`
          }));

          // 回到初始狀態：沒在執行動作、沒在戰鬥中、敵人沒被擊敗
          dispatch(changeExecutingCommand(false));
          dispatch(changeInBattle(false));
          dispatch(changeEnemyDefeated(false));
          dispatch(changeTurn(''));
        }, 3000)
      }
    }

    handleEnemyDefeated();
  }, [dispatch, selfHP, enemyDefeated, enemyEXP, enemyName, selfEXP, enemyLoot, enemyMoney, money])

  // 戰鬥失敗：當角色被擊敗時
  useEffect(() => {
    const handlePlayerDefeated = () => {
      if (selfDefeated) {
        dispatch(addMessage({
          type: 'battle',
          content: '被敵人打倒了⋯⋯'
        }))

        // 等待 1.5s
        setTimeout(() => {
          // HP 留下 1
          dispatch(changeHP(1));
          // 經驗值減少一半
          dispatch(changeEXP(selfEXP / 2));
          // 回到村莊
          dispatch(changeCurrentScene('村莊'));
          // 狀態重置至非戰鬥狀態
          dispatch(changeInBattle(false));
          dispatch(changeSelfDefeated(false));
          dispatch(changeTurn(''));

          Swal.fire({
            title: '戰鬥失敗！',
            text: '損失50%經驗值，已被送往村莊',
            icon: 'info',
          });
        }, 1500)
      }
    }

    handlePlayerDefeated();
  }, [dispatch, selfDefeated, selfHP, selfEXP])

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
      <Button blue onClick={handleShowEnemy}>
        出現蝙蝠
      </Button>

    </div>
  );
};