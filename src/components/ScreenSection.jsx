import scenesImg from '../data/scene/scenesImg';
import { useSelector } from 'react-redux';

export default function ScreenSection() {
  const { currentLocation } = useSelector(state => {
    return {
      currentLocation: state.systemStatus.currentLocation,
    }
  });
  const currentLocationImgSrc = scenesImg.find(img => img.scene === currentLocation)?.img;

  return (
    <section className="relative w-full h-72 my-5 flex justify-center">
      <div className="relative w-11/12 h-full border-4 border-gray-800 rounded-md">
        <h1 className="absolute top-3 right-3 z-10 bg-slate-100/70 py-1 px-2 rounded text-gray-800">當前地點：{currentLocation}</h1>
        <img src={currentLocationImgSrc} alt="scene-img" className="absolute w-full h-full object-cover" />
      </div>
    </section>
  );
}