import scenes from '../data/scenes';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store';
import StatusBar from './StatusBar';

import Maze from './Maze';

export default function ScreenSection() {
  const dispatch = useDispatch();

  const { currentScene } = useSelector(state => state.systemStatus);
  const currentSceneImgSrc = scenes.find(scene => scene.name === currentScene)?.img;
  const currentNPCImgSrc = useSelector(state => state.systemStatus.currentDialogue?.img);
  const currentEnemyImgSrc = useSelector(state => state.enemies.img);
  const currentEnemyName = useSelector(state => state.enemies.name);
  const currentEnemyHP = useSelector(state => state.enemies.HP);
  const currentEnemyMaxHP = useSelector(state => state.enemies.maxHP);

  const { inMaze } = useSelector(state => state.maze);

  // 是否在戰鬥中的變數
  const { inBattle } = useSelector(state => state.battle);

  useEffect(() => {
    // 每當出現敵人時，顯示訊息
    const addEnemyMessage = () => {
      if (inBattle) {
        dispatch(addMessage({
          type: 'battle',
          content: `${currentEnemyName}出現了！`
        }));
      }
    }

    addEnemyMessage();
  }, [inBattle, currentEnemyName, dispatch]);

  return (
    <section className="relative w-full h-48 flex justify-center my-1">
      <div className="relative w-11/12 h-full rounded-md overflow-hidden">

        {/* 如果在迷宮中，不顯示當前地點 */}
        { !inMaze &&
          <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentScene}</h1>
        }

        <img src={currentSceneImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />

          {/* 如果在迷宮中，顯示迷宮 */}
          { inMaze && <Maze />}

          {/* 根據戰鬥狀態決定顯示內容 */}
          <div className="absolute inset-0">
            {/* 對話中，且非戰鬥狀態時，顯示NPC */}
            { currentNPCImgSrc && !inBattle &&
              <img className="w-full h-full object-contain" src={currentNPCImgSrc} alt="npc-img" />
            }

            {/* 戰鬥狀態時，顯示敵人 */}
            { inBattle &&
              <>
                <img className="w-full h-full object-contain" src={currentEnemyImgSrc} alt="npc-img" />
                <div className='absolute bottom-2 w-full px-3'>
                  <StatusBar type="HP" color="red" currentValue={currentEnemyHP} maxValue={currentEnemyMaxHP} />
                </div>
              </>
            }
          </div>
      </div>
    </section>
  );
}