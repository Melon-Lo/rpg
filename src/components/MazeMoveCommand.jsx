import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { changePlayerPosition, addMessage } from "../store";

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

  const { playerPosition } = useSelector(state => state.maze);

  const isMoveOutOfBounds = (newPosition) => {
    return newPosition.x < 1 || newPosition.x > 5 || newPosition.y < 1 || newPosition.y > 5;
  };

  const handleMove = (direction) => {
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
        content: '無法再往這個方向移動了！'
      }));
      return;
    }

    dispatch(changePlayerPosition(newPosition));
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