import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeInMaze, changeBoss, changeMazeName, changePlayerPosition, changeEnemies, changeChests } from "../store";
import Button from "./Button";
import Swal from "sweetalert2";
import mazes from "../data/mazes";

export default function DiscoverButton({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { currentScene } = useSelector(state => state.systemStatus);

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
        type: 'basic',
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