import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { changePlayerPosition, addMessage, changeChests, changeItem } from "../store";

const moves = [
  {
    direction: 'up',
    img: FaArrowUp,
  },
  {
    direction: 'down',
    img: FaArrowDown,
  },
  {
    direction: 'left',
    img: FaArrowLeft,
  },
  {
    direction: 'right',
    img: FaArrowRight,
  },
]

export default function MazeMoveCommand() {
  const dispatch = useDispatch();
  const { playerPosition, boss, chests } = useSelector(state => state.maze);

  // 得到寶箱
  useEffect(() => {
    const handleGetChest = () => {
      // 我方位置等於任何一個寶箱位置
      const touchingChest = JSON.stringify(chests.find(chest => chest.position.x === playerPosition.x && chest.position.y === playerPosition.y));

      if (touchingChest) {
        const chestName = JSON.parse(touchingChest).chest;
        const chestQuantity = JSON.parse(touchingChest).quantity;

        dispatch(changeItem({
          name: chestName,
          quantity: chestQuantity,
        }));

        Swal.fire({
          title: '找到寶箱！',
          text: `獲得 ${chestName} * ${chestQuantity}！`,
        });

        dispatch(addMessage({
          type: 'maze',
          content: `找到寶箱！獲得 ${chestName} * ${chestQuantity}！`
        }));

        // 同一個地點不會再出現寶箱
        const filteredChests = chests.filter(chest => chest.position.x !== playerPosition.x && chest.position.y !== playerPosition.y);
        dispatch(changeChests(filteredChests));
      }
    };

    handleGetChest();
  }, [dispatch, chests, playerPosition])

  // 移動
  const handleMove = (direction) => {
    const isMoveOutOfBounds = (newPosition) => {
      return newPosition.x < 1 || newPosition.x > 5 || newPosition.y < 1 || newPosition.y > 5;
    };

    let newPosition = { ...playerPosition };

    if (direction === 'up') {
      newPosition.y += 1;
    } else if (direction === 'down') {
      newPosition.y -= 1;
    } else if (direction === 'left') {
      newPosition.x -= 1;
    } else if (direction === 'right') {
      newPosition.x += 1;
    }

    if (isMoveOutOfBounds(newPosition)) {
      dispatch(addMessage({
        type: 'maze',
        content: '到底了！無法再往這個方向移動'
      }));
      return;
    }

    if (newPosition.x === boss.position.x && newPosition.y === boss.position.y) {
      Swal.fire({
        title: '強敵警告',
        text: '感受到前方有強敵的氣息，確定要繼續前進嗎？',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
      }).then((result) => {
        // 如果用戶點擊了確認按鈕，則繼續執行後續操作
        if (result.isConfirmed) {
          dispatch(changePlayerPosition(newPosition));
        }
      });
    } else {
      dispatch(changePlayerPosition(newPosition));
    }
  };

  const renderedMoves = moves.map(move => {
    return (
      <div key={move.direction} className="w-8 h-8 bg-slate-100 rounded-full mx-1 flex justify-center items-center" onClick={() => handleMove(move.direction)}>
        <move.img />
      </div>
    );
  });

  return (
    <div className="flex">
      {renderedMoves}
    </div>
  );
};