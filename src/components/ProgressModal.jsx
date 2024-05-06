import { RxCross1 } from "react-icons/rx";
import { useState, useContext } from "react";
import ProgressItem from "./ProgressItem";
import { ModalContext } from "../contexts/modal";

export default function ProgressModal({ setCurrentStep }) {
  const [type, setType] = useState('save');
  const titleText = type === 'save' ? '儲存進度' : '讀取進度';
  const typeColor = type === 'save' ? 'rose' : 'sky'
  const typeStyle = `mx-3 px-3 py-2 text-${typeColor}-800 cursor-pointer `
  const selectedStyle = `bg-${typeColor}-800 text-slate-100 rounded-md`;

  const { setShowModal } = useContext(ModalContext);

  // 創建一個空陣列來存儲所有的進度數據
  let allProgressData = [];

  // 循環所有 key，從 localStorage 中取出數據
  for (let i = 0; i <= 3; i++) {
    const key = `progressData${i}`;
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data);
      allProgressData.push(parsedData);
    }
  };

  const handleCloseModal = () => {
    setShowModal('');
  };

  const renderedProgressItems = Array.from({ length: 3 }, (_, index) => {
    const data = allProgressData[index];

    if (data) {
      return (
        <ProgressItem
          key={index}
          index={index + 1}
          name={data.characterStats.name}
          classTitle={data.characterStats.classTitle}
          level={data.characterStats.level}
          currentTime={data.currentTime.currentTime}
          currentScene={data.systemStatus.currentScene}
          money={data.items.money}
          setShowModal={setShowModal}
          type={type}
          typeColor={typeColor}
          setCurrentStep={setCurrentStep}
        />
      );
    } else {
      // 如果 allProgressData 中缺少該項，則返回一個占位元素
      return <ProgressItem key={index} index={index + 1} setShowModal={setShowModal} type={type} typeColor={typeColor} />;
    }
  });

  return (
    <div className="fixed bg-gray-800/75 inset-0 z-10">
      <div className="relative w-full h-full">
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-${typeColor}-200 w-10/12 h-2/3 rounded-lg`}>
          <div className="relative flex flex-col justify-center items-center py-3">
            <h1 className="text-3xl text-gray-800">{titleText}</h1>
            <div onClick={handleCloseModal} className="absolute top-2 right-2">
              <RxCross1 className={`text-2xl text-${typeColor}-900`} />
            </div>
          </div>
          <div className="text-center my-3 text-lg">
            <span
              className={typeStyle + (type === 'save' && selectedStyle)}
              onClick={() => setType('save')}
            >
              存檔
            </span>
            <span
              className={typeStyle + (type === 'load' && selectedStyle)}
              onClick={() => setType('load')}
            >
              讀檔
            </span>
          </div>
          <div className="flex flex-col items-center">
            {renderedProgressItems}
          </div>
        </div>
      </div>
    </div>
  )
};