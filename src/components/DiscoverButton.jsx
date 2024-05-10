import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeInMaze, changeBoss, changeMazeName, changePlayerPosition, changeEnemies, changeVisitedMazesChests, addVisitedMaze } from "../store";
import Button from "./Button";
import Swal from "sweetalert2";
import mazes from "../data/mazes";
import { useContext } from "react";
import { StepContext } from "../contexts/step";
import scenes from "../data/scenes";

export default function DiscoverButton() {
  const dispatch = useDispatch();
  const { currentScene, visitedMazes } = useSelector(state => state.systemStatus);
  const { visitedMazesChests } = useSelector(state => state.maze);
  const { setCurrentStep } = useContext(StepContext);
  const recommendedLevel = scenes.find(scene => scene.name === currentScene).recommendedLevel;

  const handleClick = () => {
    Swal.fire({
      title: `確定要進入「${currentScene}」探險嗎？`,
      html: `
        <p>【建議等級：${recommendedLevel}】</p>
        <p>進入迷宮後無法存檔，而且只有打倒地區魔王、戰鬥失敗或脫逃才能離開哦！</p>
        <p>脫逃會損失 50% 金錢、戰鬥失敗會損失 50% 經驗值</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addMessage({
          type: 'basic',
          content: '探險開始，請步步為營！'
        }))

        // 抓到迷宮資料並進入
        const { initialPlayerPosition: playerPosition, enemies, chests, mazeName } = mazes.find(maze => maze.mazeName === currentScene);
        const boss = mazes.find(maze => maze.mazeName === currentScene).boss;
        dispatch(changeInMaze(true));
        dispatch(changeMazeName(mazeName));
        dispatch(changePlayerPosition(playerPosition));
        dispatch(changeEnemies(enemies));
        dispatch(changeBoss(boss));
        setCurrentStep('主頁');

        dispatch(addVisitedMaze(mazeName));

        // 如果是第一次來此迷宮，增加至 visitedMazes、寶箱用原始資料
        if (!visitedMazes.includes(mazeName)) {
          dispatch(changeVisitedMazesChests([
            ...visitedMazesChests, { mazeName, chests }
          ]));
        // 如果不是第一次來此迷宮，則沿用之前剩下來的寶箱資料
        } else {
          const chests = visitedMazesChests.find(item => item.mazeName === currentScene).chests;
          const existingIndex = visitedMazesChests.findIndex(item => item.mazeName === currentScene);
          let updatedVisitedMazesChests = [...visitedMazesChests];
          updatedVisitedMazesChests[existingIndex] = {
            ...visitedMazesChests[existingIndex],
            chests
          }

          dispatch(changeVisitedMazesChests(updatedVisitedMazesChests));
        }
      }
    });
  }

  return (
    <Button onClick={handleClick} fuchsia>進入{currentScene}探險</Button>
  )
}