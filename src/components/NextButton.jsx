import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeCurrentDialogue, changeCurrentQuests, addFinishedQuest } from "../store";
import Button from "./Button";
import { useContext } from "react";
import { StepContext } from "../contexts/step";
import quests from "../data/quests";
import Swal from "sweetalert2";

export default function NextButton({ sentence, setSentence }) {
  const dispatch = useDispatch();
  const { setCurrentStep } = useContext(StepContext);
  const { talker, content } = useSelector(state => state.systemStatus.currentDialogue);
  const { currentQuests, finishedQuests } = useSelector(state => state.systemStatus.quests);
  const contentLength = content.length;
  const questDialogues = quests.find(quest => quest.npc === talker)?.dialogues;

  const handleClick = () => {
    // 每一句對話
    dispatch(addMessage({
      type: 'basic',
      content: `${talker}：「${content[sentence]}」`,
    }))

    // 如果沒任務
    if (!questDialogues) {
      // 每講一句，就推進一句
      if (sentence < contentLength - 1) {
        setSentence(sentence + 1);
      } else {
        setCurrentStep('主頁');
        setSentence(0);
      }
    }

    // 如果有任務，根據情況給不同的對話
    if (questDialogues) {
      if (sentence < contentLength - 1) {
        setSentence(sentence + 1);
      } else {
        setCurrentStep('主頁');
        setSentence(0);
      }
      // Swal.fire({
      //   title: '要幫忙嗎？',
      //   icon: 'question',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: '幫忙',
      //   cancelButtonText: '算了'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     console.log('yes')
      //   }
      // });
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