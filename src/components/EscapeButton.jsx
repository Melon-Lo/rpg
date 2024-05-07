import { useDispatch } from "react-redux";
import { addMessage, changeExecutingCommand, changeInBattle, changeTurn } from "../store";
import Button from "./Button";

import { useContext } from "react";
import { StepContext } from "../contexts/step";

export default function EscapeButton() {
  const dispatch = useDispatch();

  const { setCurrentStep } = useContext(StepContext);

  const handleEscape = () => {
    dispatch(addMessage({
      type: 'basic',
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
          type: 'success',
          content: '成功逃跑了！'
        }));

        // 回到非戰鬥狀態
        dispatch(changeInBattle(false));
        dispatch(changeExecutingCommand(false));
        dispatch(changeTurn(''));
      // 逃跑失敗
      } else {
        dispatch(addMessage({
          type: 'basic',
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
}