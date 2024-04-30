import mazes from "../data/mazes";
import { nanoid } from "nanoid";
import { SiNodemon } from "react-icons/si";
import { FaPerson } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";

export default function Maze() {
  const { mazeName, playerPosition, bossPosition } = useSelector(state => state.maze);
  const mazeData = mazes.find(maze => maze.mazeName === mazeName);

  // 各種圖示：玩家、魔王、一般格
  const PlayerPosition = () => <FaPerson className="text-blue-500 text-2xl" />;
  const BossPosition = () => <SiNodemon className="text-red-500 text-2xl" />;
  const DotPosition = () => <GoDotFill className="text-gray-500 m-2" />

  const Box = ({ x, y }) => {
    const isBossPosition = bossPosition.position.x === x && bossPosition.position.y === y;
    const isPlayerPosition = playerPosition.x === x && playerPosition.y === y;

    return (
      <div className="bg-gray-400/50 m-0.5 rounded flex justify-center items-center">
        {isBossPosition && <BossPosition />}
        {isPlayerPosition && <PlayerPosition />}
        {!isBossPosition && !isPlayerPosition && <DotPosition />}
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
      {/* 蓋上一層透明的白 */}
      <div className="absolute inset-0 bg-slate-200 z-1 opacity-50"></div>

      {/* 5*5 網格 */}
      <div className="grid gap-0 grid-cols-5 w-10/12 max-w-sm z-10">
        {renderedBoxes}
      </div>
    </div>
  );
};