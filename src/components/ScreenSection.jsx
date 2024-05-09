import { GiLockedChest } from "react-icons/gi";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store';
import StatusBar from './StatusBar';
import Maze from './Maze';
import scenes from '../data/scenes';
import mazes from '../data/mazes';

export default function ScreenSection() {
  const dispatch = useDispatch();

  const { currentScene } = useSelector(state => state.systemStatus);
  const currentSceneImgSrc = scenes.find(scene => scene.name === currentScene)?.img;
  const currentNPCImgSrc = useSelector(state => state.systemStatus.currentDialogue?.img);
  const { img: currentEnemyImgSrc, name: currentEnemyName, HP: currentEnemyHP, maxHP: currentEnemyMaxHP } = useSelector(state => state.enemies);
  const { inMaze } = useSelector(state => state.maze);

  // 寶箱統計
  const totalChestsQuantity = mazes.find(maze => maze.mazeName === currentScene)?.chests.length;
  const { visitedMazesChests } = useSelector(state => state.maze);
  const foundChestsQuantity = totalChestsQuantity - visitedMazesChests.find(maze => maze.mazeName === currentScene)?.chests.length;
  const foundAllChests = foundChestsQuantity === totalChestsQuantity;
  let chestStyle = foundAllChests ? 'blue' : 'gray';

  // 戰鬥變數
  const { inBattle } = useSelector(state => state.battle);
  const { isBoss } = useSelector(state => state.enemies);

  // 每當出現敵人時，顯示訊息
  useEffect(() => {
    const addEnemyMessage = () => {
      if (inBattle) {
        const bossText = isBoss ? '此區域大BOSS' : '';
        dispatch(addMessage({
          type: 'basic',
          content: `${bossText}${currentEnemyName}出現了！`
        }));
      }
    }

    addEnemyMessage();
  }, [inBattle, currentEnemyName, dispatch]);

  return (
    <section id="screen-section" className="relative w-full h-48 flex flex-col items-center justify-center my-1">
      <div className="relative w-11/12 h-full rounded-md overflow-hidden">

        {/* 如果在迷宮中，不顯示當前地點 */}
        { !inMaze &&
          <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentScene}</h1>
        }

        {/* 如果在迷宮中，顯示寶箱數 */}
        { inMaze && !inBattle &&
          <h1 className={`absolute top-3 left-3 z-10 bg-slate-100/50 py-1 px-2 rounded flex items-center z-20`}>
            <div className="mr-2">
              <GiLockedChest className={`text-${chestStyle}-600/80`} />
            </div>
            <div className={`text-${chestStyle}-800/50 font-medium`}>
              {foundChestsQuantity} / {totalChestsQuantity}
            </div>
          </h1>
        }

        <img src={currentSceneImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />

          {/* 如果在迷宮中，且非戰鬥中，顯示迷宮 */}
          { inMaze && !inBattle && <Maze />}

          {/* 根據戰鬥狀態決定顯示內容 */}
          <div className="absolute inset-0">
            {/* 對話中，且非戰鬥狀態時，顯示NPC */}
            { currentNPCImgSrc && !inBattle && !inMaze &&
              <img className="w-full h-full object-contain" src={currentNPCImgSrc} alt="npc-img" />
            }

            {/* 戰鬥狀態時，顯示敵人 */}
            { inBattle &&
              <>
                <img className="w-full h-full object-contain" src={currentEnemyImgSrc} alt="npc-img" />
                <div className="absolute bottom-2 w-full px-3">
                  <StatusBar type="HP" color="red" currentValue={currentEnemyHP} maxValue={currentEnemyMaxHP} />
                </div>
              </>
            }
          </div>
      </div>
    </section>
  );
}