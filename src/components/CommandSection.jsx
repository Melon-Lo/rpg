import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import commands from "../data/commands";
import scenes from "../data/scenes";
import CommandItem from "./CommandItem";
import ItemsList from "./ItemsList";
import CharStatsList from "./CharStatsList";
import Button from "./Button";
import { addMessage, changeCurrentScene, changeCurrentDialogue } from "../store";

export default function CommandSection() {
  const [currentStep, setCurrentStep] = useState('主頁');
  const [textContent, setTextContent] = useState('想做什麼呢？');
  const playerName = useSelector(state => state.charStats.name);
  const { currentScene } = useSelector(state => state.systemStatus);
  const dispatch = useDispatch();

  // 對話相關變數
  const [sentence, setSentence] = useState(0);
  const talker = useSelector(state => state.systemStatus.currentDialogue.talker);
  const content = useSelector(state => state.systemStatus.currentDialogue.content);
  const contentLength = useSelector(state => state.systemStatus.currentDialogue.content.length);

  // 戰鬥相關變數
  // boolean 值：如果敵人的名字不為空字串，代表為戰鬥狀態
  const battleTime = useSelector(state => state.enemies.name).length !== 0;
  const enemyName = useSelector(state => state.enemies.name);

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
      } else if (currentStep === 'talking') {
        setTextContent('對談中⋯⋯');
      }
    }

    changeTextContent();
  }, [currentStep])

  // 按下返回鍵，回到主頁
  const handleReturn = () => {
    setCurrentStep('主頁');
  }

  // --------------------------------------------
  // 非戰鬥狀態
  // --------------------------------------------

  // 主頁（指令們）
  const mainCommands = commands.find(command => command.type === 'main').commands;
  const renderedMainCommandItems = mainCommands.map(commandItem => {
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

  // 交談（可交談對象們）
  const currentCharacters = scenes.find(sceneItem => currentScene === sceneItem.name).characters;
  const renderedCharacters = currentCharacters.map(charItem => {

    // 與人交談
    const handleClick = () => {
      // 將交談對象設定為點擊對象
      dispatch(changeCurrentDialogue({
        talker: charItem.name,
        img: charItem.img,
        content: charItem.dialogue
      }));

      // 點擊人物後顯示第一句話，剩下的交給 NextButton 處理
      dispatch(addMessage({
        type: 'talk',
        content: `${charItem.name}：「${charItem.dialogue[0]}」`,
      }));

      // 如果只有一句對話，則點擊後馬上跳回主頁，不會顯示下一頁
      if (charItem.dialogue.length === 1) {
        setCurrentStep('主頁');
      // 如果對話不只一句，則句子往下走
      } else {
        setSentence(sentence + 1);
        setCurrentStep('talking');
      }
    };

    return <Button
      key={charItem.name}
      blue
      className="mx-1"
      onClick={handleClick}
    >
      {charItem.name}
    </Button>;
  })

  // taking 下一句
  const NextButton = () => {
    const handleClick = () => {
      dispatch(addMessage({
        type: 'talk',
        content: `${talker}：「${content[sentence]}」`,
      }))

      // 每講一句，就推進一句
      setSentence(sentence + 1);

      // 講到最後一句時，自動退回主頁
      if (sentence < contentLength - 1) {
        setSentence(sentence + 1);
      } else {
        setCurrentStep('主頁');
        setSentence(0);
      }
    }

    return (
      <div className="w-full flex justify-end">
        <Button
          yellow
          onClick={handleClick}
        >
          下一句
        </Button>
      </div>
    );
  };

  // 移動（場景們）
  const renderedScenes = scenes.map(sceneItem => {
    const sceneName = sceneItem.name;

    // 不能前往當前地點
    if (currentScene === sceneName) return;

    const handleClick = () => {
      // 將場景改為點擊地點
      dispatch(changeCurrentScene(sceneName));
      // 系統提示
      dispatch(addMessage({
        type: 'move',
        content: `${playerName}移動到${sceneName}了。`,
      }));

      // 移動完回主頁
      setCurrentStep('主頁');
    };

    return (
      <Button
        key={sceneName}
        green
        className="mx-1"
        onClick={handleClick}
      >
        {sceneName}
      </Button>
    )
  })

  // --------------------------------------------
  // 戰鬥狀態（battleTime 為真時）
  // --------------------------------------------

  // 戰鬥指令們
  const battleCommands = commands.find(command => command.type === 'battle').commands;
  const renderedBattleCommandItems = battleCommands.map(commandItem => {
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

  // 攻擊對象
  const AttackButton = () => {
    const handleClick = () => {
      dispatch(addMessage({
        type: 'battle',
        content: `${playerName}向${enemyName}發動了攻擊！`
      }));
      setCurrentStep('主頁');
    };

    return (
      <Button onClick={handleClick} red>向{enemyName}發動攻擊！</Button>
    );
  };

  return (
    <section className="w-11/12 bg-orange-100 rounded-md my-1">
      {/* 上方 */}
      <div className="flex justify-between p-2">
        {/* 文字敘述 */}
        <p className="text-xl text-orange-800">{textContent}</p>

        {/* 返回按鈕（主頁或對談中不會顯示） */}
        { currentStep !== '主頁' && currentStep !== 'talking' &&
          <div className="flex justify-center items-center cursor-pointer" onClick={handleReturn}>
            <TiArrowBack className="text-2xl text-orange-800" />
          </div>
        }
      </div>

      {/* 下方 */}
      <div className="p-2 flex justify-start items-center">

        {/* 主頁：非戰鬥狀態 */}
        { currentStep === '主頁' && !battleTime && renderedMainCommandItems }

        {/* 交談 */}
        { currentStep === '交談' && renderedCharacters }

        {/* 移動 */}
        { currentStep === '移動' && renderedScenes }

        {/* 物品 */}
        { currentStep === '物品' && <ItemsList /> }

        {/* 狀態 */}
        { currentStep === '狀態' && <CharStatsList /> }

        {/* talking */}
        { currentStep === 'talking' && <NextButton /> }

        {/* 主頁：戰鬥狀態 */}
        { currentStep === '主頁' && battleTime && renderedBattleCommandItems }

        {/* 選擇「攻擊」對象 */}
        { currentStep === '攻擊' && <AttackButton /> }
      </div>
    </section>
  )
};