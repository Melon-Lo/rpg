import mazes from "../data/mazes";
import { nanoid } from "nanoid";
import { SiNodemon } from "react-icons/si";
import { FaPerson } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Maze() {
  const dispatch = useDispatch();

  const { mazeName, playerPosition } = useSelector(state => state.maze);
  const mazeData = mazes.find(maze => maze.mazeName === mazeName);

  const BossPosition = () => <SiNodemon className="text-red-500" />;
  const PlayerPosition = () => <FaPerson className="text-blue-500" />;

  const Box = ({ x, y }) => {
    const bossPosition = mazeData.bossPosition.x === x && mazeData.bossPosition.y === y;
    const nowPlayerPosition = playerPosition.x === x && playerPosition.y === y;

    return (
      <div className="bg-gray-600/50 m-1 rounded flex justify-center items-center">
        {bossPosition && <BossPosition />}
        {nowPlayerPosition && <PlayerPosition />}
        {!bossPosition && !nowPlayerPosition && `${x}${y}`}
      </div>
    );
  };

  // 固定順序：左下開始，往右、往上排列
  let renderedBoxes = [];
  for (let y = 5; y >= 1; y--) {
    for (let x = 1; x < 6; x++) {
      renderedBoxes.push(<Box x={x} y={y} key={nanoid()} />);
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <div className="absolute inset-0 bg-slate-200 z-1 opacity-30"></div>
      <div className="grid gap-0 grid-cols-5 w-10/12 max-w-sm z-10">
        {renderedBoxes}
      </div>
    </div>
  );
};