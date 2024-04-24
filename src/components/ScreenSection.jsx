import scenes from '../data/scenes';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store';

export default function ScreenSection() {
  const dispatch = useDispatch();

  const { currentScene } = useSelector(state => state.systemStatus);
  const currentSceneImgSrc = scenes.find(scene => scene.name === currentScene)?.img;
  const currentNPCImgSrc = useSelector(state => state.systemStatus.currentDialogue?.img);
  const currentEnemyImgSrc = useSelector(state => state.enemies.img);
  const currentEnemyName = useSelector(state => state.enemies.name);

  // boolean 值：如果敵人的名字不為空字串，代表為戰鬥狀態
  const battleTime = useSelector(state => state.enemies.name).length !== 0;

  useEffect(() => {
    if (battleTime) {
      dispatch(addMessage({
        type: 'battle',
        content: `${currentEnemyName}出現了！`
      }));
      console.log('test')
    }
  }, [battleTime, currentEnemyName, dispatch]);

  return (
    <section className="relative w-full h-48 flex justify-center my-1">
      <div className="relative w-11/12 h-full rounded-md overflow-hidden">
        <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentScene}</h1>
        <img src={currentSceneImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />

          <div className="absolute inset-0">
            {/* 對話中，且非戰鬥狀態時，顯示NPC */}
            { currentNPCImgSrc && !battleTime &&
              <img className="w-full h-full object-contain" src={currentNPCImgSrc} alt="npc-img" />
            }

            {/* 戰鬥狀態時，顯示敵人 */}
            { battleTime &&
              <img className="w-full h-full object-contain" src={currentEnemyImgSrc} alt="npc-img" />
            }
          </div>
      </div>
    </section>
  );
}