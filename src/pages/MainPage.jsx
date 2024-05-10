import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { changeItem, addMessage, changeInBattle, changeTurn, changeExecutingCommand, changeSelfDefeated, changeEnemyDefeated, changeEXP, changeHP, changeCurrentScene, changeMoney, changeCharacterStats, changeInMaze, addSkill, changeStage } from "../store";
import Swal from "sweetalert2";

// components
import StatusSection from "../components/StatusSection";
import ScreenSection from "../components/ScreenSection";
import MessageSection from "../components/MessageSection";
import CommandSection from "../components/CommandSection";
import ShopModal from "../components/ShopModal";
import ProgressModal from "../components/ProgressModal";
import ManualModal from "../components/ManualModal";

// data
import enemiesData from "../data/enemies";
import skills from "../data/skills";
import classeslevelsStats from "../data/classeslevelsStats";
import classeslevelsSkills from "../data/classeslevelsSkills";

// utils
import decideTurnOrder from "../utils/battle/decideTurnOrder";
import decideDamage from "../utils/battle/decideDamage";
import getRandomLoot from "../utils/battle/getRandomLoot";
import levelUp from "../utils/characterStats/levelUp";

// contexts
import { ModalContext } from "../contexts/modal";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 系統數據
  const { roleCreated } = useSelector(state => state.systemStatus);

  // contexts
  const { showModal } = useContext(ModalContext);

  // 戰鬥相關數據
  const { name: selfName, classTitle: selfClassTitle, level: selfLevel, ATK: selfATK, MATK: selfMATK, SPD: selfSPD, HP: selfHP, maxHP: selfMaxHP, maxMP: selfMaxMP, DEF: selfDEF, MDEF: selfMDEF, exp: selfEXP, expToNextLevel: selfEXPtoNextLevel } = useSelector(state => state.characterStats);
  const selfStats = useSelector(state => state.characterStats);
  const { name: enemyName, maxHP: enemyMaxHP, HP: enemyHP, ATK: enemyATK, MATK: enemyMATK, SPD: enemySPD, exp: enemyEXP, money: enemyMoney, loot: enemyLoot, isBoss: enemyIsBoss, stage: enemyStage } = useSelector(state => state.enemies);
  const { selfDefeated, enemyDefeated, inBattle } = useSelector(state => state.battle);
  const { turn } = useSelector(state => state.battle);
  const { money } = useSelector(state => state.items);

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/landing');
      }
    };

    handleNavigate();
  }, [])

  // --------------------------------------------
  // 戰鬥狀態
  // --------------------------------------------

  // 敵人出現後，由敵我雙方的 SPD 決定先攻
  useEffect(() => {
    if (inBattle && turn === '') {
      const firstTurn = decideTurnOrder(selfSPD, enemySPD);
      setTimeout(() => {
        if (firstTurn === 'self') {
          dispatch(addMessage({
            type: 'basic',
            content: `${selfName}速度較快，我方先攻！`
          }))
        } else if (firstTurn === 'enemy') {
          dispatch(addMessage({
            type: 'basic',
            content: '敵人速度較快，敵人先攻！'
          }));
        };
        dispatch(changeTurn(firstTurn));
      }, 1500)
    };
  }, [dispatch, selfSPD, enemySPD, inBattle, turn, selfName])

  // 敵方戰鬥回合
  useEffect(() => {
    // 若對方未被擊敗，則輪到對方回合
    const handleEnemyTurn = () => {
      if (inBattle && turn === 'enemy') {
        // 先拿到對方的行為 AI
        const currentEnemyAi = enemiesData.find(enemy => enemy.name === enemyName).ai;
        const nextEnemyAction = currentEnemyAi(enemyHP / enemyMaxHP);

        // 對方發動一般攻擊
        if (nextEnemyAction.action === 'attack') {
          const damage = decideDamage(enemyATK, selfDEF);
          setTimeout(() => {
            dispatch(addMessage({
              type: 'basic',
              content: `${enemyName}發動了攻擊！`
            }))
          }, 1500)

          // 等待 3s
          setTimeout(() => {
            dispatch(changeHP(selfHP - damage));
            dispatch(addMessage({
              type: 'hurt',
              content: `${selfName}受到了 ${damage} 點傷害！`
            }));
          }, 3000)

          setTimeout(() => {
            // 角色被打死
            if (damage >= selfHP) {
              dispatch(changeSelfDefeated(true));
            // 如果角色未死亡，換到自己的回合
            } else {
              dispatch(changeTurn('self'));
            }
          }, 4500)
        // 對方攻擊魔法（看MATK）
        } else if (nextEnemyAction.action === 'attackSkill') {
          const skillName = nextEnemyAction.skill;
          const skillEffect = skills.find(skill => skill.name === skillName).effect;
          const skillBasicValue = skills.find(skill => skill.name === skillName).basicValue;
          const damage = skillEffect(enemyMATK, selfMDEF, skillBasicValue);

          setTimeout(() => {
            dispatch(addMessage({
              type: 'basic',
              content: `${enemyName}施展了${skillName}！`
            }))
          }, 1500)

          // 等待 3s
          setTimeout(() => {
            dispatch(changeHP(selfHP - damage));
            dispatch(addMessage({
              type: 'hurt',
              content: `${selfName}受到了 ${damage} 點傷害！`
            }))
          }, 3000)

          setTimeout(() => {
            // 角色被打死
            if (damage >= selfHP) {
              dispatch(changeSelfDefeated(true));
            // 如果角色未死亡，換到自己的回合
            } else {
              dispatch(changeTurn('self'));
            }
          }, 4500)
        // 對方攻擊技能（看ATK）
        } else if (nextEnemyAction.action === 'physicalAttackSkill') {
          const skillName = nextEnemyAction.skill;
          const skillEffect = skills.find(skill => skill.name === skillName).effect;
          const skillBasicValue = skills.find(skill => skill.name === skillName).basicValue;
          const damage = skillEffect(enemyATK, selfDEF, skillBasicValue);

          setTimeout(() => {
            dispatch(addMessage({
              type: 'basic',
              content: `${enemyName}發動了${skillName}！`
            }))
          }, 1500)

          // 等待 3s
          setTimeout(() => {
            dispatch(changeHP(selfHP - damage));
            dispatch(addMessage({
              type: 'hurt',
              content: `${selfName}受到了 ${damage} 點傷害！`
            }))
          }, 3000)

          setTimeout(() => {
            // 角色被打死
            if (damage >= selfHP) {
              dispatch(changeSelfDefeated(true));
            // 如果角色未死亡，換到自己的回合
            } else {
              dispatch(changeTurn('self'));
            }
          }, 4500)
        }
      }
    }

    handleEnemyTurn();
  }, [turn]);

  // 戰鬥勝利：當敵人被擊敗時
  useEffect(() => {
    const handleEnemyDefeated = () => {
      if (enemyDefeated) {
        // 等待 1.5s
        setTimeout(() => {
          dispatch(addMessage({
            type: 'basic',
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
          // 如果有獲得戰利品（50% 機率）
          if (loot) {
            lootText = `、${loot.name} * ${loot.quantity}`;
            dispatch(changeItem(loot));
          }

          dispatch(addMessage({
            type: 'get',
            content: `戰鬥勝利！獲得 ${enemyEXP} 點經驗值、金錢 $ ${enemyMoney}${lootText}`
          }));

          Swal.fire({
            title: '戰鬥勝利！',
            text: `獲得 ${enemyEXP} 點經驗值、金錢 $${enemyMoney}${lootText}`,
          });

          // 回到初始狀態：沒在執行動作、沒在戰鬥中、敵人沒被擊敗
          dispatch(changeExecutingCommand(false));
          dispatch(changeInBattle(false));
          dispatch(changeEnemyDefeated(false));
          dispatch(changeTurn(''));

          // 如果打倒魔王，則退出迷宮、回到村莊
          if (enemyIsBoss) {
            Swal.fire({
              icon: 'success',
              title: '迷宮被破解了！',
              text: '已返回村莊！商店已開放新商品、可以去的地方增加了！'
            })

            dispatch(addMessage({
              type: 'basic',
              content: '已破解迷宮、返回村莊。商店已開放新商品、可以去的地方增加了！'
            }))
            dispatch(changeCurrentScene('村莊'));
            dispatch(changeInMaze(false));

            dispatch(changeStage(enemyStage + 1));
          };
        }, 3000)
      }
    }

    handleEnemyDefeated();
  }, [dispatch, selfHP, enemyDefeated, enemyEXP, enemyName, selfEXP, enemyLoot, enemyMoney, money, enemyIsBoss])

  // 戰鬥失敗：當角色被擊敗時
  useEffect(() => {
    const handlePlayerDefeated = () => {
      if (selfDefeated) {
        dispatch(addMessage({
          type: 'basic',
          content: '被敵人打倒了⋯⋯'
        }))

        // 等待 1.5s
        setTimeout(() => {
          // HP 留下 1
          dispatch(changeHP(1));
          // 經驗值減少 50% 
          dispatch(changeEXP(selfEXP / 2));
          // 回到村莊
          dispatch(changeCurrentScene('村莊'));
          // 狀態重置至非戰鬥狀態
          dispatch(changeInBattle(false));
          dispatch(changeSelfDefeated(false));
          dispatch(changeInMaze(false));
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

  // 升級
  useEffect(() => {
    const handleLevelUp = () => {
      if (selfEXP >= selfEXPtoNextLevel) {
        // 為了不跟其他彈出視窗衝突，升級提示會稍微晚一點點出現
        setTimeout(() => {
          const updatedLevelStats = levelUp(selfLevel, selfStats, selfClassTitle, classeslevelsStats);
          const levelsSkills = classeslevelsSkills.find(item => item.classTitle === selfClassTitle).levelsSkills;

          // 提升到特定等級可以學會特定技能
          const newSkill = levelsSkills.find(item => item.level === updatedLevelStats.level)?.skill;
          let getNewSkillText = '';
          if (newSkill) {
            dispatch(addSkill(newSkill));
            getNewSkillText = `習得技能：${newSkill}`
          }

          // 變更狀態
          dispatch(changeCharacterStats(updatedLevelStats));
          dispatch(addMessage({
            type: 'success',
            content: `等級提升！HP 和 MP 恢復至全滿！${getNewSkillText}`
          }));

          Swal.fire({
            title: `等級提升至${updatedLevelStats.level}級！`,
            html: `
              <div>
                <h5>最大HP：${selfMaxHP} -> ${updatedLevelStats.maxHP}</h5>
                <h5>最大MP：${selfMaxMP} -> ${updatedLevelStats.maxMP}</h5>
                <h5>攻擊力：${selfATK} -> ${updatedLevelStats.ATK}</h5>
                <h5>防禦力：${selfDEF} -> ${updatedLevelStats.DEF}</h5>
                <h5>魔法攻擊力：${selfMATK} -> ${updatedLevelStats.MATK}</h5>
                <h5>魔法防禦力：${selfMDEF} -> ${updatedLevelStats.MDEF}</h5>
                <h5>速度：${selfSPD} -> ${updatedLevelStats.SPD}</h5>
                <h5>${getNewSkillText}</h5>
              <div>
            `,
            icon: 'success',
          })
        }, 500);
      };
    };

    handleLevelUp();
  }, [dispatch, selfEXP, selfEXPtoNextLevel, selfStats, selfClassTitle, selfLevel, selfATK, selfDEF, selfMATK, selfMDEF, selfSPD, selfMaxHP, selfMaxMP])

  return (
    <div id="main-page" className="flex flex-col items-center w-full">
      <ScreenSection />
      <MessageSection />
      <StatusSection />
      <CommandSection />
      {showModal === 'shop' && <ShopModal />}
      {showModal === 'progress' && <ProgressModal />}
      {showModal === 'manual' && <ManualModal />}

      {/* DEV ONLY */}
      {/* <Button blue onClick={() => dispatch(changeItem({
        name: '補藥',
        quantity: 1,
      }))}>
        加1個補藥
      </Button> */}
    </div>
  );
};