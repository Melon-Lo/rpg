// import scenesImg from '../data/scene/scenesImg';
import scenes from '../data/scenes';
import { useSelector } from 'react-redux';

export default function ScreenSection() {
  const { currentScene } = useSelector(state => state.systemStatus);
  const currentSceneImgSrc = scenes.find(scene => scene.name === currentScene)?.img;
  const currentNPCImgSrc = useSelector(state => state.systemStatus.currentDialogue?.img);
  const currentEnemyImgSrc = useSelector(state => state.enemies.img);

  return (
    <section className="relative w-full h-48 flex justify-center my-1">
      <div className="relative w-11/12 h-full rounded-md overflow-hidden">
        <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentScene}</h1>
        <img src={currentSceneImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />

        { currentNPCImgSrc &&
          <div className="absolute inset-0">
            <img className="w-full h-full object-contain" src={currentNPCImgSrc} alt="npc-img" />
          </div>
        }
      </div>
    </section>
  );
}