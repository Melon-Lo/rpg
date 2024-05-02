import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store";
import Button from "./Button";

export default function NextButton({ sentence, setSentence, setCurrentStep }) {
  const dispatch = useDispatch();

  const talker = useSelector(state => state.systemStatus.currentDialogue.talker);
  const content = useSelector(state => state.systemStatus.currentDialogue.content);
  const contentLength = useSelector(state => state.systemStatus.currentDialogue.content.length);


  const handleClick = () => {
    dispatch(addMessage({
      type: 'basic',
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