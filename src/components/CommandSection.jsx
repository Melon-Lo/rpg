import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import commandImg from "../data/command/commandImg";
import sceneList from "../data/scene/sceneList";
import CommandItem from "./CommandItem";
import ItemsList from "./ItemsList";
import CharStatsList from "./CharStatsList";
import Button from "./Button";
import { addMessage, changeCurrentScene } from "../store";

export default function CommandSection() {
  const [currentStep, setCurrentStep] = useState('主頁');
  const [textContent, setTextContent] = useState('想做什麼呢？');
  const characterName = useSelector(state => state.charStats.name);

  const dispatch = useDispatch();

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

  const { currentScene } = useSelector(state => state.systemStatus);

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

    const handleClick = () => {
      dispatch(changeCurrentScene(sceneItem));
      dispatch(addMessage({
        type: 'move',
        content: `${characterName}移動到${sceneItem}了。`,
      }));

      // 移動完回主頁
      setCurrentStep('主頁');
    };

    return (
      <Button key={sceneItem} green className="mx-1" onClick={handleClick}>{sceneItem}</Button>
    )
  })

  return (
    <section className="w-11/12 bg-orange-100 rounded-md my-1">
      {/* 上方 */}
      <div className="flex justify-between p-2">
        {/* 文字敘述 */}
        <p className="text-xl text-orange-800">{textContent}</p>

        {/* 返回按鈕（不是主頁時才會顯示） */}
        { currentStep !== '主頁' &&
          <div className="flex justify-center items-center cursor-pointer" onClick={handleReturn}>
            <TiArrowBack className="text-2xl text-orange-800" />
          </div>
        }
      </div>

      {/* 下方 */}
      <div className="p-2 flex justify-start items-center">
        {/* 主頁 */}
        { currentStep === '主頁' && renderedCommandItems }

        {/* 移動 */}
        { currentStep === '移動' && renderedScenes }

        {/* 物品 */}
        { currentStep === '物品' && <ItemsList /> }

        {/* 狀態 */}
        { currentStep === '狀態' && <CharStatsList /> }
      </div>
    </section>
  )
};