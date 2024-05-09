import Button from "./Button";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, changeMoney, changeInMaze } from "../store";
import { useContext } from "react";
import { StepContext } from "../contexts/step";

export default function MazeEscapeButton() {
  const dispatch = useDispatch();
  const { setCurrentStep } = useContext(StepContext);
  const { money } = useSelector(state => state.items);

  const handleClick = () => {
    Swal.fire({
      title: `確定從迷宮中脫逃嗎？`,
      text: '將損失一半的金錢，且敵人將會重置！',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        const result = money / 2;
        dispatch(changeMoney(result));
        dispatch(changeInMaze(false));
        setCurrentStep('主頁');

        Swal.fire({
          title: '從迷宮中脫逃了！',
          text: '損失一半金錢',
        })

        dispatch(addMessage({
          type: 'basic',
          content: '從迷宮中脫逃了！損失一半金錢⋯⋯'
        }));
      }
    })
  };

  return (
    <Button purple onClick={handleClick}>從迷宮中脫逃</Button>
  );
};