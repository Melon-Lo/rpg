import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { changePlayerPosition, addMessage, changeEnemy, changeInBattle, changeEnemies, changeChests, changeItem } from "../store";

// data
import enemiesData from "../data/enemies";

const moves = [
  {
    direction: 'up',
    img: FaArrowUp,
  },
  {
    direction: 'down',
    img: FaArrowDown,
  },
  {
    direction: 'left',
    img: FaArrowLeft,
  },
  {
    direction: 'right',
    img: FaArrowRight,
  },
]

export default function MazeMoveCommand() {
  const dispatch = useDispatch();
  const { playerPosition, boss, enemies, chests } = useSelector(state => state.maze);

  // 遭遇敵人
  // 之後可能要移到別的 MainPage 裡
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
  // 之後可能要移到別的 MainPage 裡
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

  // 得到寶箱
  useEffect(() => {
    const handleGetChest = () => {
      // 我方位置等於任何一個寶箱位置
      const touchingChest = JSON.stringify(chests.find(chest => chest.position.x === playerPosition.x && chest.position.y === playerPosition.y));

      if (touchingChest) {
        const chestName = JSON.parse(touchingChest).chest;
        const chestQuantity = JSON.parse(touchingChest).quantity;

        dispatch(changeItem({
          name: chestName,
          quantity: chestQuantity,
        }));
        dispatch(addMessage({
          type: 'maze',
          content: `找到寶箱！獲得 ${chestName} * ${chestQuantity}！`
        }));

        // 同一個地點不會再出現寶箱
        const filteredChests = chests.filter(chest => chest.position.x !== playerPosition.x && chest.position.y !== playerPosition.y);
        dispatch(changeChests(filteredChests));
      }
    };

    handleGetChest();
  }, [dispatch, chests, playerPosition])

  // 移動
  const handleMove = (direction) => {
    const isMoveOutOfBounds = (newPosition) => {
      return newPosition.x < 1 || newPosition.x > 5 || newPosition.y < 1 || newPosition.y > 5;
    };

    let newPosition = { ...playerPosition };

    if (direction === 'up') {
      newPosition.y += 1;
    } else if (direction === 'down') {
      newPosition.y -= 1;
    } else if (direction === 'left') {
      newPosition.x -= 1;
    } else if (direction === 'right') {
      newPosition.x += 1;
    }

    if (isMoveOutOfBounds(newPosition)) {
      dispatch(addMessage({
        type: 'maze',
        content: '到底了！無法再往這個方向移動'
      }));
      return;
    }

    dispatch(changePlayerPosition(newPosition));
  };

  const renderedMoves = moves.map(move => {
    return (
      <div key={move.direction} className="w-8 h-8 bg-slate-100 rounded-full mx-1 flex justify-center items-center" onClick={() => handleMove(move.direction)}>
        <move.img />
      </div>
    );
  });

  return (
    <div className="flex">
      {renderedMoves}
    </div>
  );
};