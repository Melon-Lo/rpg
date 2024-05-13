import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage, changeCurrentScene, changeCurrentDialogue, changeCurrentQuests } from "../store";

// components
import CommandItem from "./CommandItem";
import ItemsList from "./ItemsList";
import SkillsList from "./SkillsList";
import Button from "./Button";
import CharacterStatsList from "./CharacterStatsList";
import MazeMoveCommand from "./MazeMoveCommand";
import NextButton from "./NextButton";
import DiscoverButton from "./DiscoverButton";
import HotelButton from "./HotelButton";
import AttackButton from "./AttackButton";
import EscapeButton from "./EscapeButton";
import MazeEscapeButton from "./MazeEscapeButton";

// data
import commands from "../data/commands";
import scenes from "../data/scenes";
import systemButtons from "../data/systemButtons";
import quests from "../data/quests";

// contexts
import { ModalContext } from "../contexts/modal";
import { StepContext } from "../contexts/step";
import Swal from "sweetalert2";

export default function CommandSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [textContent, setTextContent] = useState('想做什麼呢？');
  const selfName = useSelector(state => state.characterStats.name);
  const { setShowModal } = useContext(ModalContext);
  const { currentStep, setCurrentStep } = useContext(StepContext);

  // 對話相關變數
  const [sentence, setSentence] = useState(0);
  const { stage, currentDialogue } = useSelector(state => state.systemStatus);

  // 任務相關變數
  const { currentQuests, finishedQuests } = useSelector(state => state.systemStatus.quests);

  // 場景相關變數
  const { currentScene } = useSelector(state => state.systemStatus);
  const isDiscoverable = scenes.find(scene => scene.name === currentScene).isDiscoverable;
  const hasNPC = scenes.find(scene => scene.name === currentScene).characters.length > 0;

  // 戰鬥相關變數
  const { inBattle, turn, executingCommand } = useSelector(state => state.battle);
  const { isBoss } = useSelector(state => state.enemies);

  // 迷宮相關變數
  const { inMaze } = useSelector(state => state.maze);

  // 上方文字內容，根據 currentStep 不同而變換
  useEffect(() => {
    const changeTextContent = () => {
      // 戰鬥狀態相關
      if (currentStep === '主頁' && inBattle && turn === 'self' && executingCommand) {
        setTextContent('執行行動中⋯⋯')
      } else if (currentStep === '主頁' && inBattle && turn === 'self') {
        setTextContent('我方回合，對敵人採取行動');
        return
      } else if (currentStep === '攻擊' && inBattle && !executingCommand) {
        setTextContent('一般攻擊');
        return
      } else if (currentStep === '逃跑' && inBattle && !executingCommand) {
        setTextContent('走為上策！');
        return
      } else if (currentStep === '攻擊' && inBattle && executingCommand) {
        setTextContent('執行行動中⋯⋯');
        return
      } else if (currentStep === '主頁' && inBattle && turn === 'enemyExecuting') {
        setTextContent('敵方行動中⋯⋯');
        return

      // 非戰鬥狀態相關
      } else if (currentStep === '主頁' && !inBattle) {
        setTextContent('想做什麼呢？');
        return
      } else if (currentStep === '交談') {
        setTextContent('要跟誰交談呢？')
        return
      } else if (currentStep === '移動') {
        setTextContent('要去哪裡呢？')
        return
      } else if (currentStep === '技能') {
        setTextContent('施展技能');
        return
      } else if (currentStep === '物品') {
        setTextContent('使用物品');
        return
      } else if (currentStep === '狀態') {
        setTextContent('狀態一覽');
        return
      } else if (currentStep === '探索') {
        setTextContent('選擇探索方向');
        return
      } else if (currentStep === '系統') {
        setTextContent('隨時存檔保心安');
        return
      } else if (currentStep === '旅館') {
        setTextContent('休息是為了走更長的路');
        return
      } else if (currentStep === '商店') {
        setTextContent('努力賺錢是為了快樂花錢');
        return
      } else if (currentStep === 'talking') {
        setTextContent('對談中⋯⋯');
        return

        // 旅館休息
      } else if (currentStep === '旅館' && executingCommand) {
        setTextContent('休息中⋯⋯');
        return
      }
    }

    changeTextContent();
  }, [currentStep, inBattle, turn, executingCommand])

  // 只要進入戰鬥則跳到主頁
  useEffect(() => {
    if (inBattle) {
      setCurrentStep('主頁');
    }
  }, [inBattle])

  // 按下返回鍵，回到主頁
  const handleReturn = () => {
    setCurrentStep('主頁');
  }

  // --------------------------------------------
  // 非戰鬥狀態
  // --------------------------------------------

  // 主頁指令們
  const mainCommands = commands.find(command => command.type === 'main').commands;
  const renderedMainCommandItems = mainCommands.map(commandItem => {
    // 如果該場景無法探險，則不會出現「探險」
    if (!isDiscoverable && commandItem.command === '探險') return null;

    // 如果此處沒有可交談對象，則不會出現「交談」
    if (!hasNPC && commandItem.command === '交談') return null;

    // 在迷宮內才會出現「探險」
    if (inMaze && commandItem.command === '探險') return null;

    // 在迷宮內才會出現「系統」
    if (inMaze && commandItem.command === '系統') return null;

    // 在迷宮中才會出現「探索」
    if (!inMaze && commandItem.command === '探索') return null;

    // 在迷宮中才會出現「探索」
    if (!inMaze && commandItem.command === '脫逃') return null;

    // 如果在迷宮中，則不會出現「交談」和「移動」
    if ((inMaze && commandItem.command === '交談') || (inMaze && commandItem.command === '移動')) return null;

    return (
      <CommandItem
        key={commandItem.command}
        command={commandItem.command}
        color={commandItem.color}
        Icon={commandItem.img}
      />
    )
  });

  // 村莊指令們
  const villageCommands = commands.find(command => command.type === 'village').commands;
  const renderedVillageCommandItems = villageCommands.map(commandItem => {
    return (
      <CommandItem
        key={commandItem.command}
        command={commandItem.command}
        color={commandItem.color}
        Icon={commandItem.img}
      />
    )
  })

  // 交談（可交談對象們）
  const currentCharacters = scenes.find(sceneItem => currentScene === sceneItem.name).characters;
  const renderedCharacters = currentCharacters.map(charItem => {
    let targetDialogue;
    const quest = quests.find(quest => quest.npc === charItem.name) || '';
    const questIsDoing = currentQuests.includes(quest);
    const questIsFinished = finishedQuests.includes(quest);

    // 如果該 NPC 有任務
    if (quest) {
      // 未承接任務
      if (!questIsFinished && !questIsDoing) {
        targetDialogue = quest.dialogues.find(dialogue => dialogue.timing === 'start').dialogue;
      }

      // 已承接，未完成任務
      if (!questIsFinished && questIsDoing) {
        targetDialogue = quest.dialogues.find(dialogue => dialogue.timing === 'doing').dialogue;
      }

      // 已完成任務
      if (questIsFinished) {
        targetDialogue = quest.dialogues.find(dialogue => dialogue.timing === 'end').dialogue;
      }
    }

    // 如果該 NPC 沒任務
    if (!quest) {
      // 選出要顯示的對話
      let dialogueIndex = stage - 1;
      // 根據現在的 stage 來顯示，若更新 stage 後對話沒有變，則停在最新的對話
      if (charItem.dialogues.length < stage) {
        dialogueIndex = charItem.dialogues.length - 1;
      }
      targetDialogue = charItem.dialogues[dialogueIndex].dialogue;
    }

    // 與人交談
    const handleClick = () => {
      // 將交談對象設定為點擊對象
      dispatch(changeCurrentDialogue({
        talker: charItem.name,
        img: charItem.img,
        content: targetDialogue
      }));

      // 點擊人物後顯示第一句話，剩下的交給 NextButton 處理
      dispatch(addMessage({
        type: 'basic',
        content: `${charItem.name}：「${targetDialogue[0]}」`,
      }));

      // 如果只有一句對話，則點擊後馬上跳回主頁，不會顯示下一頁
      if (targetDialogue.length === 1) {
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
  });

  // 承接任務的當下，自動跳出對話
  useEffect(() => {
    const quest = currentQuests.find(quest => quest.npc === currentDialogue.talker) || null;

    // 防止沒任務時跳出
    if (!quest) return;

    const targetDialogue = quest.dialogues.find(dialogue => dialogue.timing === 'accept').dialogue;

    dispatch(changeCurrentDialogue({
      talker: currentDialogue.talker,
      img: currentDialogue.img,
      content: targetDialogue
    }));

    // 點擊人物後顯示第一句話，剩下的交給 NextButton 處理
    dispatch(addMessage({
      type: 'basic',
      content: `${currentDialogue.talker}：「${targetDialogue[0]}」`,
    }));

    // 如果只有一句對話，則點擊後馬上跳回主頁，不會顯示下一頁
    if (targetDialogue.length === 1) {
      setCurrentStep('主頁');
    // 如果對話不只一句，則句子往下走
    } else {
      setSentence(sentence + 1);
      setCurrentStep('talking');
    }
  }, [currentQuests])

  // 完成任務的當下，自動跳出對話
  useEffect(() => {
    const quest = currentQuests.find(quest => quest.npc === currentDialogue.talker) || null;

    // 防止沒任務時跳出
    if (!quest) return;

    const targetDialogue = quest.dialogues.find(dialogue => dialogue.timing === 'finish').dialogue;

    dispatch(changeCurrentDialogue({
      talker: currentDialogue.talker,
      img: currentDialogue.img,
      content: targetDialogue
    }));

    const updatedQuests = currentQuests.filter(questItem => questItem !== quest);
    dispatch(changeCurrentQuests(updatedQuests));

    // 顯示第一句話，剩下的交給 NextButton 處理
    dispatch(addMessage({
      type: 'basic',
      content: `${currentDialogue.talker}：「${targetDialogue[0]}」`,
    }));

    // 如果只有一句對話，則點擊後馬上跳回主頁，不會顯示下一頁
    if (targetDialogue.length === 1) {
      setCurrentStep('主頁');
    // 如果對話不只一句，則句子往下走
    } else {
      setSentence(sentence + 1);
      setCurrentStep('talking');
    }
  }, [finishedQuests])

  // 移動（場景們）
  const renderedScenes = scenes.map(sceneItem => {
    const sceneName = sceneItem.name;
    const sceneStage = sceneItem.stage;

    // 不能前往當前地點
    if (currentScene === sceneName) return null;

    // 不能前往 stage 還沒到的地方
    if (sceneStage > stage) return null;

    const handleClick = () => {
      // 將場景改為點擊地點
      dispatch(changeCurrentScene(sceneName));
      // 系統提示
      dispatch(addMessage({
        type: 'basic',
        content: `${selfName}移動到${sceneName}了。`,
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

  // 系統指令們
  const renderedSystemButtons = systemButtons.map(button => {
    const handleClick = () => {
      if (button === '存取進度') {
        setShowModal('progress');
      } else if (button === '回到首頁') {
        Swal.fire({
          title: `確定要回到主頁嗎？`,
          text: '記得先存檔哦！',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確認',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('landing');
            setCurrentStep('主頁');
          };
        });
      } else if (button === '冒險指南') {
        setShowModal('manual');
      }
    };

    return (
      <Button onClick={handleClick} className="mx-1" rose key={button}>{button}</Button>
    );
  });

  // 商店按鈕
  const ShopButton = () => {
    const handleClick = () => {
      setShowModal('shop');
    }

    return (
      <Button onClick={handleClick} amber>進入商店</Button>
    )
  }

  // --------------------------------------------
  // 戰鬥狀態（battleTime 為真時）
  // --------------------------------------------

  // 戰鬥指令們
  const battleCommands = commands.find(command => command.type === 'battle').commands;
  const renderedBattleCommandItems = battleCommands.map(commandItem => {
    // BOSS戰無法逃跑
    if (isBoss && commandItem.command === '逃跑') return null;

    return (
      <CommandItem
        key={commandItem.command}
        command={commandItem.command}
        color={commandItem.color}
        Icon={commandItem.img}
      />
    )
  });

  return (
    <section id="command-section" className="w-11/12 bg-orange-100 rounded-md my-1">
      {/* 上方 */}
      <div className="flex justify-between p-2">
        {/* 文字敘述 */}
        <p className="text-xl text-orange-800">{textContent}</p>

        {/* 返回按鈕（主頁或對談中不會顯示） */}
        { currentStep !== '主頁' && currentStep !== 'talking' && !executingCommand &&
          <div className="flex justify-center items-center cursor-pointer" onClick={handleReturn}>
            <TiArrowBack className="text-2xl text-orange-800" />
          </div>
        }
      </div>

      {/* 下方 */}
      <div className="p-2 flex flex-wrap justify-start items-center">

        {/* 主頁：非戰鬥狀態 */}
        { currentStep === '主頁' && !inBattle && renderedMainCommandItems }

        {/* 主頁：如果在村莊就會多出這些指令 */}
        { currentStep === '主頁' && !inBattle && currentScene === '村莊' && renderedVillageCommandItems }

        {/* 交談 */}
        { currentStep === '交談' && renderedCharacters }

        {/* 移動 */}
        { currentStep === '移動' && renderedScenes }

        {/* 物品 */}
        { currentStep === '物品' && <ItemsList /> }

        {/* 技能 */}
        { currentStep === '技能' && <SkillsList /> }

        {/* 狀態 */}
        { currentStep === '狀態' && <CharacterStatsList /> }

        {/* 迷宮 */}
        { currentStep === '探索' && <MazeMoveCommand /> }

        {/* taking 下一句按鈕 */}
        { currentStep === 'talking' && <NextButton sentence={sentence} setSentence={setSentence} /> }

        {/* 探險 */}
        { currentStep === '探險' && <DiscoverButton /> }

        {/* 脫逃 */}
        { currentStep === '脫逃' && <MazeEscapeButton /> }

        {/* 系統 */}
        { currentStep === '系統' && !executingCommand && renderedSystemButtons }

        {/* 旅館 */}
        { currentStep === '旅館' && !executingCommand && <HotelButton /> }

        {/* 旅館 */}
        { currentStep === '商店' && !executingCommand && <ShopButton /> }

        {/* 主頁：戰鬥指令 */}
        { currentStep === '主頁' && inBattle && !executingCommand && turn === 'self' && renderedBattleCommandItems }

        {/* 確定「攻擊」 */}
        { currentStep === '攻擊' && !executingCommand && <AttackButton /> }

        {/* 確定「逃跑」 */}
        { currentStep === '逃跑' && !executingCommand && <EscapeButton /> }
      </div>
    </section>
  );
};