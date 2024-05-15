import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// icons
import { TbSword } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuWand2 } from "react-icons/lu";
import { RiShieldFlashLine } from "react-icons/ri";
import { PiBoot } from "react-icons/pi";
import { PiArrowBendRightUpBold } from "react-icons/pi";
import { PiArrowBendRightDownBold } from "react-icons/pi";

const stats = [
  {
    name: '攻',
    color: 'red',
    img: TbSword,
  },
  {
    name: '魔攻',
    color: 'rose',
    img: LuWand2,
  },
  {
    name: '速',
    color: 'blue',
    img: PiBoot,
  },
  {
    name: '防',
    color: 'green',
    img: MdOutlineShield,
  },
  {
    name: '魔防',
    color: 'emerald',
    img: RiShieldFlashLine,
  },
]

export default function EquipmentPage() {
  const navigate = useNavigate();

  const { roleCreated } = useSelector(state => state.systemStatus);

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/landing');
      }
    };

    handleNavigate();
  }, [])

  const SingleStats = ({ name, color, Icon }) => {
    return (
      <div className="flex items-center p-2 w-4/12">
        <div className={`w-10 h-10 bg-${color}-200 shadow-md rounded-full relative`}>
          <div className="absolute inset-0">
            <Icon className={`w-full h-full p-1 text-${color}-300`} />
          </div>
          <p className="absolute inset-0 flex justify-center items-center text-gray-800">
            {name}
          </p>
        </div>
        <div className="flex text-md pl-2 text-gray-800">
          <p>10</p>
          <div className="flex items-center">
            <PiArrowBendRightUpBold className="text-blue-500" />
            <p className="text-blue-800">12</p>
          </div>
        </div>
      </div>
    )
  }

  const renderedStats = stats.map(statsItem =>
    <SingleStats
      name={statsItem.name}
      color={statsItem.color}
      Icon={statsItem.img}
    />
  )

  return (
    <div className="flex flex-col items-center py-3 mb-3 border-2 border-gray-300 min-w-[325px] w-10/12 max-w-[1024px] rounded-lg">
      <div className="w-full flex flex-wrap justify-start max-w-[768px]">
        {renderedStats}
      </div>
    </div>
  );
}