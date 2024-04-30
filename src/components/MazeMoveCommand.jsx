import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { changePlayerPosition, addMessage, changeEnemy, changeInBattle, changeEnemiesPosition } from "../store";

// data
import mazes from "../data/mazes";
import enemies from "../data/enemies";

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
  const { mazeName, playerPosition, enemiesPosition } = useSelector(state => state.maze);

  useEffect(() => {
    const handleEncounter = () => {
      // 如果我方的位置等同於任何一個敵人所在
      const touchingEnemy = JSON.stringify(enemiesPosition.find(enemy => enemy.position.x === playerPosition.x && enemy.position.y === playerPosition.y));

      if (touchingEnemy) {
        const enemyName = JSON.parse(touchingEnemy).enemy;
        const currentEnemy = enemies.find(enemy => enemy.name === enemyName);
        const { name, img, loot, exp, money, weakness } = currentEnemy;
        const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;
        dispatch(changeEnemy({ name, img, exp, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD, weakness }));
        dispatch(addMessage({
          type: 'system',
          content: `${name}出現了！`
        }));
        dispatch(changeInBattle(true));

        // 同一個地點不會再出現敵人
        const filteredEnemies = enemiesPosition.filter(enemy => enemy.position.x !== playerPosition.x && enemy.position.y !== playerPosition.y);
        dispatch(changeEnemiesPosition(filteredEnemies));
      }
    }

    handleEncounter();
  }, [dispatch, enemiesPosition, playerPosition])

  const isMoveOutOfBounds = (newPosition) => {
    return newPosition.x < 1 || newPosition.x > 5 || newPosition.y < 1 || newPosition.y > 5;
  };

  const handleMove = (direction) => {
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
        content: '無法再往這個方向移動了！'
      }));
      return;
    }

    dispatch(changePlayerPosition(newPosition));
  };

  // 得到寶箱

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