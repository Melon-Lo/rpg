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
    const changeTextContent = () => {
      if (currentStep === '主頁') {
        setTextContent('想做什麼呢？');
      } else if (currentStep === '交談') {
        setTextContent('要去哪裡呢？')
      } else if (currentStep === '物品') {
        setTextContent('物品一覽');
      } else if (currentStep === '狀態') {
        setTextContent('狀態一覽');
      }
    }

    changeTextContent();
    console.log(currentStep);
  }, [currentStep])

  const { currentScene } = useSelector(state => {
    return {
      currentScene: state.systemStatus.currentScene,
    };
  });

  const renderedCommandItems = commandImg.map(commandItem => {
    return (
      <CommandItem
        key={commandItem.command}
        command={commandItem.command}
        color={commandItem.color}
        Icon={commandItem.img}
        onClick={() => {
          setCurrentStep(commandItem.command);
          console.log('hi');
        }}
      />
    )
  });

  const renderedScenes = sceneList.map(sceneItem => {
    // 不能前往當前地點
    if (currentScene === sceneItem) return;

    return (
      <Button key={sceneItem} success className="mx-1">{sceneItem}</Button>
    )
  })

  return (
    <section className="w-11/12 bg-orange-100 rounded-md">
      <div className="flex justify-between p-3">
        <p className="text-xl text-orange-800">{textContent}</p>
        <div className="flex justify-center items-center">
          <TiArrowBack className="text-2xl text-orange-800" />
        </div>
      </div>
      <div className="p-3 flex justify-start items-center">
        {renderedCommandItems}
      </div>
      <div className="p-3 flex text-lg">
        {renderedScenes}
      </div>
    </section>
  )
};