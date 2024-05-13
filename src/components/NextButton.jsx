import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeCurrentDialogue, changeCurrentQuests, addFinishedQuest, changeItem, changeFinishingQuest } from "../store";
import Button from "./Button";
import { useContext } from "react";
import { StepContext } from "../contexts/step";
import Swal from "sweetalert2";
import quests from "../data/quests";

export default function NextButton({ sentence, setSentence }) {
  const dispatch = useDispatch();
  const { setCurrentStep } = useContext(StepContext);
  const { money, data: currentItems } = useSelector(state => state.items);
  const { talker, content } = useSelector(state => state.systemStatus.currentDialogue);
  const { currentQuests, finishedQuests, finishingQuest } = useSelector(state => state.systemStatus.quests);
  const contentLength = content.length;
  const questDialogues = quests.find(quest => quest.npc === talker)?.dialogues;

  const quest = quests.find(quest => quest.npc === talker) || null;

  const handleClick = () => {
    // 每一句對話
    dispatch(addMessage({
      type: 'basic',
      content: `${talker}：「${content[sentence]}」`,
    }))

    // 每講一句，就推進一句
    if (sentence < contentLength - 1) {
      setSentence(sentence + 1);
    } else {
      setCurrentStep('主頁');
      setSentence(0);

      if (!quest) return;

      // 以下是有任務的狀態
      const questIsDoing = currentQuests.some(questItem => questItem.quest === quest.quest);
      const questIsFinished = finishedQuests.some(questItem => questItem.quest === quest.quest);
      const questRequiredItems = quest.requirements.find(requirement => requirement.type === 'item').content || null;
      const haveRequiredItems = currentItems.some(itemA => {
        return questRequiredItems.some(itemB => itemB.name === itemA.name && itemB.quantity === itemA.quantity) || null;
      })

      // 如果該NPC有任務，選擇要不要幫忙
      if (!questIsDoing && !questIsFinished) {
        Swal.fire({
          title: `要${quest.quest}嗎？`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確認',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(changeCurrentQuests([ ...currentQuests, quest ]));
          }
        });
      }

      // 如果有任務所需道具，選擇要不要給予
      if (haveRequiredItems && questIsDoing && !questIsFinished) {
        const itemName = questRequiredItems[0].name;
        const hintText = questRequiredItems.length > 1 ? '等物品' : '';

        Swal.fire({
          title: `要給予${itemName}${hintText}嗎？`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確認',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            // 更改任務列表
            dispatch(addFinishedQuest(quest));

            // 減少任務道具
            questRequiredItems.forEach(item => {
              dispatch(changeItem({
                name: item.name,
                quantity: item.quantity * -1
              }));
            });

            // 完成任務中
            dispatch(changeFinishingQuest(true));
          }
        });
      }

      // 完成任務後，得到獎勵
      if (questIsFinished && finishingQuest) {
        const questRewardItems = quest.rewards.find(reward => reward.type === 'item').content || null;
        const formattedItems = questRewardItems.map(item => `${item.name} * ${item.quantity}`);
        const rewardString = formattedItems.join('');

        Swal.fire({
          title: '任務完成！',
          text: `獲得報酬：${rewardString}`,
        });

        questRewardItems.forEach(item => {
          dispatch(changeItem({
            name: item.name,
            quantity: item.quantity
          }));
        });

        // 結束完成任務，之後再開啟便不能再度領取獎勵
        dispatch(changeFinishingQuest(false));
      }
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