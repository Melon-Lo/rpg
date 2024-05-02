import { TiArrowBack } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addMessage, changeCurrentScene, changeCurrentDialogue, changeEnemyHP, changeExecutingCommand, changeEnemyDefeated, changeTurn, changeInBattle, changeMazeName, changeInMaze, changePlayerPosition, changeEnemies, changeChests, changeBoss } from "../store";
import Swal from "sweetalert2";

// components
import CommandItem from "./CommandItem";
import ItemsList from "./ItemsList";
import SkillsList from "./SkillsList";
import Button from "./Button";
import CharacterStatsList from "./CharacterStatsList";
import MazeMoveCommand from "./MazeMoveCommand";

// data
import commands from "../data/commands";
import scenes from "../data/scenes";
import mazes from "../data/mazes";

// utils
import decideDamage from "../utils/battle/decideDamage";

export default function CommandSection() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState('主頁');
  const [textContent, setTextContent] = useState('想做什麼呢？');
  const selfName = useSelector(state => state.characterStats.name);

  // 場景相關變數
  const { currentScene } = useSelector(state => state.systemStatus);
  const isDiscoverable = scenes.find(scene => scene.name === currentScene).isDiscoverable;
  const hasNPC = scenes.find(scene => scene.name === currentScene).characters.length > 0;

  // 對話相關變數
  const [sentence, setSentence] = useState(0);
  const talker = useSelector(state => state.systemStatus.currentDialogue.talker);
  const content = useSelector(state => state.systemStatus.currentDialogue.content);
  const contentLength = useSelector(state => state.systemStatus.currentDialogue.content.length);

  // 戰鬥相關變數
  const { inBattle } = useSelector(state => state.battle);
  const enemyName = useSelector(state => state.enemies.name);
  const enemyHP = useSelector(state => state.enemies.HP);
  const enemyDEF = useSelector(state => state.enemies.DEF);
  const selfATK = useSelector(state => state.characterStats.ATK);
  const { turn, executingCommand } = useSelector(state => state.battle);
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
      } else if (currentStep === 'talking') {
        setTextContent('對談中⋯⋯');
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

  // 主頁（指令們）
  const mainCommands = commands.find(command => command.type === 'main').commands;
  const renderedMainCommandItems = mainCommands.map(commandItem => {
    // 如果該場景無法探險，則不會出現「探險」
    if (!isDiscoverable && commandItem.command === '探險') return null;

    // 如果此處沒有可交談對象，則不會出現「交談」
    if (!hasNPC && commandItem.command === '交談') return null;

    // 如果已經在迷宮內，則不會出現「探險」
    if (inMaze && commandItem.command === '探險') return null;

    // 如果不在迷宮中，則不會出現「探索」
    if (!inMaze && commandItem.command === '探索') return null;

    // 如果在迷宮中，則不會出現「交談」和「移動」
    if ((inMaze && commandItem.command === '交談') || (inMaze && commandItem.command === '移動')) return null;

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

  // taking 下一句按鈕
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
    if (currentScene === sceneName) return null;

    const handleClick = () => {
      // 將場景改為點擊地點
      dispatch(changeCurrentScene(sceneName));
      // 系統提示
      dispatch(addMessage({
        type: 'move',
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

  // 探險按鈕
  const DiscoverButton = () => {
    const handleClick = () => {
      Swal.fire({
        title: `確定要進入「${currentScene}」探險嗎？`,
        text: '進入迷宮後無法存檔，而且只有「被擊敗」或「打倒迷宮魔王」才能離開哦！',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
      }).then((result) => {
        dispatch(addMessage({
          type: 'maze',
          content: '探險開始，請步步為營！'
        }))

        // 抓到迷宮資料並進入
        const { initialPlayerPosition: playerPosition, enemies, chests } = mazes.find(maze => maze.mazeName === currentScene);
        const boss = mazes.find(maze => maze.mazeName === currentScene).boss;
        dispatch(changeInMaze(true));
        dispatch(changeMazeName('洞穴'));
        dispatch(changePlayerPosition(playerPosition));
        dispatch(changeEnemies(enemies));
        dispatch(changeChests(chests));
        dispatch(changeBoss(boss));
        setCurrentStep('主頁');
      });
    }

    return (
      <Button onClick={handleClick} fuchsia>進入{currentScene}探險</Button>
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
        setCurrentStep={setCurrentStep}
      />
    )
  });

  // 攻擊敵人按鈕
  const AttackButton = () => {
    const handleAttack = () => {
      dispatch(addMessage({
        type: 'battle',
        content: `${selfName}向${enemyName}發動了攻擊！`
      }));
      dispatch(changeExecutingCommand(true));

      // 等待 1.5s
      setTimeout(() => {
        // 對敵人造成傷害
        const damage = decideDamage(selfATK, enemyDEF);
        dispatch(changeEnemyHP(enemyHP - damage));
        dispatch(addMessage({
          type: 'battle',
          content: `${enemyName}受到了 ${damage} 點的傷害！`
        }));

        // 如果擊敗敵人，剩下的交給 MainPage 處理
        if (damage >= enemyHP) {
          dispatch(changeEnemyDefeated(true));
        } else {
          // 如果還沒擊敗敵人，則換成對方的回合
          dispatch(changeExecutingCommand(false));
          dispatch(changeTurn('enemy'));
        }

        // 無論如何都回到主頁
        setCurrentStep('主頁');
      }, 1500);
    };

    return (
      <Button onClick={handleAttack} red>向{enemyName}發動攻擊！</Button>
    );
  };

  // 逃跑按鈕
  const EscapeButton = () => {
    const handleEscape = () => {
      dispatch(addMessage({
        type: 'battle',
        content: `逃跑中⋯⋯`
      }));
      dispatch(changeExecutingCommand(true));

      // 等待 1.5s
      setTimeout(() => {
        // 逃跑成功機率 50%
        const escapeSuccess = Math.random() > 0.5;

        // 逃跑成功
        if (escapeSuccess) {
          dispatch(addMessage({
            type: 'battle',
            content: '成功逃跑了！'
          }));

          // 回到非戰鬥狀態
          dispatch(changeInBattle(false));
          dispatch(changeExecutingCommand(false));
          dispatch(changeTurn(''));
        // 逃跑失敗
        } else {
          dispatch(addMessage({
            type: 'battle',
            content: '逃跑失敗⋯⋯'
          }));
          dispatch(changeExecutingCommand(false));
          dispatch(changeTurn('enemy'));
        }

        // 無論如何都回到主頁
        setCurrentStep('主頁');
      }, 1500);
    };

    return (
      <Button onClick={handleEscape} gray>確定逃跑</Button>
    );
  };

  return (
    <section className="w-11/12 bg-orange-100 rounded-md my-1">
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

        {/* 交談 */}
        { currentStep === '交談' && renderedCharacters }

        {/* 移動 */}
        { currentStep === '移動' && renderedScenes }

        {/* 物品 */}
        { currentStep === '物品' && <ItemsList setCurrentStep={setCurrentStep} /> }

        {/* 技能 */}
        { currentStep === '技能' && <SkillsList setCurrentStep={setCurrentStep} /> }

        {/* 狀態 */}
        { currentStep === '狀態' && <CharacterStatsList /> }

        {/* 迷宮 */}
        { currentStep === '探索' && <MazeMoveCommand /> }

        {/* talking */}
        { currentStep === 'talking' && <NextButton /> }

        {/* 探險 */}
        { currentStep === '探險' && <DiscoverButton /> }

        {/* 主頁：戰鬥指令 */}
        { currentStep === '主頁' && inBattle && !executingCommand && turn === 'self' && renderedBattleCommandItems }

        {/* 確定「攻擊」 */}
        { currentStep === '攻擊' && !executingCommand && <AttackButton /> }

        {/* 確定「逃跑」 */}
        { currentStep === '逃跑' && !executingCommand && <EscapeButton /> }
      </div>
    </section>
  )
};