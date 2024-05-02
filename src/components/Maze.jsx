import { nanoid } from "nanoid";
import { SiNodemon } from "react-icons/si";
import { FaPerson } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeEnemy, changeInBattle, addMessage, changeEnemies } from "../store";

import enemiesData from '../data/enemies'

// useEffect 放在 Maze 是因為會出現 Maze 代表一定有這些資料
// 如果放在 MainPage 會報錯（還沒進入迷宮）
export default function Maze() {
  const dispatch = useDispatch();
  const { playerPosition, boss, enemies } = useSelector(state => state.maze);

  // 遭遇敵人
  useEffect(() => {
    const handleEncounter = () => {
      // 如果我方的位置等同於任何一個敵人位置
      const touchingEnemy = JSON.stringify(enemies.find(enemy => enemy.position.x === playerPosition.x && enemy.position.y === playerPosition.y));

      if (touchingEnemy) {
        const enemyName = JSON.parse(touchingEnemy).enemy;
        const currentEnemy = enemiesData.find(enemy => enemy.name === enemyName);
        const { name, img, loot, exp, money, weakness } = currentEnemy;
        const { HP, maxHP, isBoss, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;

        dispatch(changeEnemy({ name, img, exp, isBoss, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD, weakness }));
        dispatch(addMessage({
          type: 'battle',
          content: `${name}出現了！`
        }));
        dispatch(changeInBattle(true));

        // 同一個地點不會再出現敵人
        const filteredEnemies = enemies.filter(enemy => enemy.position.x !== playerPosition.x && enemy.position.y !== playerPosition.y);
        dispatch(changeEnemies(filteredEnemies));
      }
    };

    handleEncounter();
  }, [dispatch, enemies, playerPosition])

  // 打王
  useEffect(() => {
    const handleBossEncounter = () => {
      // 如果我方的位置等同於魔王位置
      const touchingBoss = boss.position.x === playerPosition.x && boss.position.y === playerPosition.y

      if (touchingBoss) {
        const bossName = boss.name;
        const currentEnemy = enemiesData.find(enemy => enemy.name === bossName);
        const { name, img, isBoss, loot, exp, money, weakness } = currentEnemy;
        const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;

        dispatch(changeEnemy({ name, img, isBoss, exp, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD, weakness }));
        dispatch(addMessage({
          type: 'battle',
          content: `此區大BOSS ${name} 出現了！`
        }));
        dispatch(changeInBattle(true));
      }
    };

    handleBossEncounter();
  }, [dispatch, playerPosition, boss])

  // 各種圖示：玩家、魔王、一般格
  const PlayerPosition = () => <FaPerson className="text-blue-500 text-2xl" />;
  const BossPosition = () => <SiNodemon className="text-red-500 text-2xl" />;
  const DotPosition = () => <GoDotFill className="text-gray-500 m-2" />

  const Box = ({ x, y }) => {
    const isBossPosition = boss.position.x === x && boss.position.y === y;
    const isPlayerPosition = playerPosition.x === x && playerPosition.y === y;

    return (
      <div className="bg-gray-400/50 m-0.5 rounded flex justify-center items-center">
        {isBossPosition && <BossPosition />}
        {isPlayerPosition && <PlayerPosition />}
        {!isBossPosition && !isPlayerPosition && <DotPosition />}
      </div>
    );
  };

  // 固定順序：左下開始，往右、往上排列
  let renderedBoxes = [];
  for (let y = 5; y >= 1; y--) {
    for (let x = 1; x < 6; x++) {
      renderedBoxes.push(<Box x={x} y={y} key={nanoid()} />);
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      {/* 蓋上一層透明的白 */}
      <div className="absolute inset-0 bg-slate-200 z-1 opacity-50"></div>

      {/* 5*5 網格 */}
      <div className="grid gap-0 grid-cols-5 w-10/12 max-w-sm z-10">
        {renderedBoxes}
      </div>
    </div>
  );
};