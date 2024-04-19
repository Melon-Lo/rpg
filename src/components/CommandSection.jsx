import { TiArrowBack } from "react-icons/ti";
import commandImg from "../data/command/commandImg";
import sceneList from "../data/scene/sceneList";
import CommandItem from "./CommandItem";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function CommandSection() {
  const [currentStep, setCurrentStep] = useState('主頁');
  const [textContent, setTextContent] = useState('想做什麼呢？');

  useEffect(() => {
    // 上方文字內容，根據 currentStep 不同而變換
    const changeTextContent = () => {
      if (currentStep === '主頁') {
        setTextContent('想做什麼呢？');
      } else if (currentStep === '交談') {
        setTextContent('要跟誰交談呢？')
      } else if (currentStep === '移動') {
        setTextContent('要去哪裡呢？')
      } else if (currentStep === '物品') {
        setTextContent('物品一覽');
      } else if (currentStep === '狀態') {
        setTextContent('狀態一覽');
      }
    }

    changeTextContent();
  }, [currentStep])

  const { currentScene } = useSelector(state => {
    return {
      currentScene: state.systemStatus.currentScene,
    };
  });

  const handleReturn = () => {
    setCurrentStep('主頁');
  }

  // 主頁
  const renderedCommandItems = commandImg.map(commandItem => {
    return (
      <CommandItem
        key={commandItem.command}
        command={commandItem.command}
        color={commandItem.color}
        Icon={commandItem.img}
        setCurrentStep={setCurrentStep}
      />
    )
  });

  // 移動（場景們）
  const renderedScenes = sceneList.map(sceneItem => {
    // 不能前往當前地點
    if (currentScene === sceneItem) return;

    return (
      <Button key={sceneItem} success className="mx-1">{sceneItem}</Button>
    )
  })

  return (
    <section className="w-11/12 bg-orange-100 rounded-md">
      <div className="flex justify-between p-2">
        <p className="text-xl text-orange-800">{textContent}</p>

        {/* 不是主頁時才會顯示返回按鈕 */}
        { currentStep !== '主頁' &&
          <div className="flex justify-center items-center" onClick={handleReturn}>
            <TiArrowBack className="text-2xl text-orange-800" />
          </div>
        }
      </div>

      {/* 主頁 */}
      { currentStep === '主頁' &&
        <div className="p-2 flex justify-start items-center">
          {renderedCommandItems}
        </div>
      }

      {/* 移動 */}
      { currentStep === '移動' &&
        <div className="p-2 flex text-lg">
          {renderedScenes}
        </div>
      }
    </section>
  )
};