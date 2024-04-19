import scenesImg from '../data/scene/scenesImg';
import { useSelector } from 'react-redux';

export default function ScreenSection() {
  const { currentScene } = useSelector(state => {
    return {
      currentScene: state.systemStatus.currentScene,
    }
  });
  const currentSceneImgSrc = scenesImg.find(img => img.scene === currentScene)?.img;

  return (
    <section className="relative w-full h-48 my-5 flex justify-center">
      <div className="relative w-11/12 h-full border-2 border-gray-600 rounded-md overflow-hidden">
        <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentScene}</h1>
        <img src={currentSceneImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />
      </div>
    </section>
  );
}