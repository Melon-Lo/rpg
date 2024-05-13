import { useSelector } from "react-redux";

export default function QuestsList() {
  const { currentQuests, finishedQuests } = useSelector(state => state.systemStatus.quests);

  const renderedCurrentQuests = currentQuests.map(quest => {
    return (
      <div key={quest.quest} className="my-1">
        <h5>{quest.quest}</h5>
      </div>
    );
  });

  const renderedFinishedQuests = finishedQuests.map(quest => {
    return (
      <div key={quest.quest} className="my-1">
        <h5>{quest.quest}</h5>
      </div>
    );
  });

  return (
    <div className="text-gray-800 w-full rounded-md bg-slate-50/75 max-h-20 md:max-h-40 overflow-y-scroll">
      { renderedCurrentQuests.length > 0 &&
        <div className="p-3 text-gray-800">
          <h5 className="font-bold">【進行中】</h5>
          <div>
            {renderedCurrentQuests}
          </div>
        </div>
      }
      { renderedFinishedQuests.length > 0 &&
        <div className="p-3 text-gray-400">
          <h5 className="font-bold">【已完成】</h5>
          <div>
            {renderedFinishedQuests}
          </div>
        </div>
      }
      {
        renderedCurrentQuests.length === 0 && renderedFinishedQuests.length === 0 &&
        <div className="p-3 text-gray-800">
          目前沒有進行中的任務
        </div>
      }
    </div>
  );
};