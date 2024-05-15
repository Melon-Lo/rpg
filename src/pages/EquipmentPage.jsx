import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeItem, changeEquipments } from "../store";

// icons
import { TbSword } from "react-icons/tb";
import { MdOutlineShield } from "react-icons/md";
import { LuWand2 } from "react-icons/lu";
import { RiShieldFlashLine } from "react-icons/ri";
import { PiBoot } from "react-icons/pi";
import { PiArrowBendRightUpBold } from "react-icons/pi";
import { PiArrowBendRightDownBold } from "react-icons/pi";
import { MdBloodtype } from "react-icons/md";
import { GiCrystalShine } from "react-icons/gi";

// data
import itemsData from "../data/items";

// components
import Button from "../components/Button";

import Swal from "sweetalert2";

const stats = [
  {
    name: '攻',
    engName: 'ATK',
    color: 'orange',
    img: TbSword,
  },
  {
    name: '防',
    engName: 'DEF',
    color: 'orange',
    img: MdOutlineShield,
  },
  {
    name: '魔攻',
    engName: 'MATK',
    color: 'cyan',
    img: LuWand2,
  },
  {
    name: '魔防',
    engName: 'MDEF',
    color: 'cyan',
    img: RiShieldFlashLine,
  },
  {
    name: 'HP',
    engName: 'maxHP',
    color: 'red',
    img: MdBloodtype,
  },
  {
    name: 'MP',
    engName: 'maxMP',
    color: 'blue',
    img: GiCrystalShine,
  },
  {
    name: '速',
    engName: 'SPD',
    color: 'green',
    img: PiBoot,
  },
]

const equipmentTypes = [
  {
    type: '武器',
    engType: 'weapon',
  },
  {
    type: '防具',
    engType: 'armor',
  },
  {
    type: '飾品',
    engType: 'accessory',
  },
]

export default function EquipmentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [equipmentType, setEquipmentType] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState({});

  const { roleCreated } = useSelector(state => state.systemStatus);
  const { equipments, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD } = useSelector(state => state.characterStats);
  const valuesCollection = { maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD };
  const { data: currentItems } = useSelector(state => state.items);

  // 裝備數值
  const weaponStats = itemsData.find(itemData => itemData.name === equipments.weapon)?.stats || {};
  const armorStats = itemsData.find(itemData => itemData.name === equipments.armor)?.stats || {};
  const accessoryStats = itemsData.find(itemData => itemData.name === equipments.accessory)?.stats || {};

  const totalATK = (weaponStats.ATK || 0) + (armorStats.ATK || 0) + (accessoryStats.ATK || 0);
  const totalMATK = (weaponStats.MATK || 0) + (armorStats.MATK || 0) + (accessoryStats.MATK || 0);
  const totalDEF = (weaponStats.DEF || 0) + (armorStats.DEF || 0) + (accessoryStats.DEF || 0);
  const totalMDEF = (weaponStats.MDEF || 0) + (armorStats.MDEF || 0) + (accessoryStats.MDEF || 0);
  const totalSPD = (weaponStats.SPD || 0) + (armorStats.SPD || 0) + (accessoryStats.SPD || 0);
  const totalMaxHP = (weaponStats.maxHP || 0) + (armorStats.maxHP || 0) + (accessoryStats.maxHP || 0);
  const totalMaxMP = (weaponStats.maxMP || 0) + (armorStats.maxMP || 0) + (accessoryStats.maxMP || 0);
  const totalEquipmentValues = { ATK: totalATK, MATK: totalMATK, DEF: totalDEF, MDEF: totalMDEF, SPD: totalSPD, maxHP: totalMaxHP, maxMP: totalMaxMP };

  const hasSelectedEquipment = !(Object.keys(selectedEquipment).length === 0 && selectedEquipment.constructor === Object);

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/landing');
      }
    };

    handleNavigate();
  }, []);

  // 切換裝備種類
  const handleSelectEquipmentType = (value) => {
    setEquipmentType(value);
    setSelectedEquipment({});
  };

  // 選擇裝備
  const handleSelectEquipment = (value) => {
    setSelectedEquipment(value);
  };


  // 上方狀態數值
  const SingleStats = ({ name, engName, color, Icon }) => {
    // 原本自身的數值
    const selfValue = valuesCollection[engName];

    // 原本所有的裝備加起來的數值
    const originalValue = totalEquipmentValues[engName];

    // 其他剩下的裝備加起來的數值
    const currentEquipmentValue = itemsData.find(itemData => itemData.name === equipments[equipmentType])?.stats[engName] || 0;
    const leftEquipmentsValue = originalValue - currentEquipmentValue;

    // 更新過後增加的數值 = 更改的裝備數值 + 其他剩下的裝備加起來的數值
    let updatedValue;
    let selectedEquipmentValue;
    if (hasSelectedEquipment) {
      selectedEquipmentValue = selectedEquipment.stats[engName] || 0
      updatedValue = selectedEquipmentValue + leftEquipmentsValue;
    } else {
      updatedValue = 0;
    }

    return (
      <div className="flex items-center p-2 w-1/2">
        <div className={`w-10 h-10 bg-${color}-200 shadow-md rounded-full relative`}>
          <div className="absolute inset-0">
            <Icon className={`w-full h-full p-1 text-${color}-300`} />
          </div>
          <p className="absolute inset-0 flex justify-center items-center text-gray-800 text-nowrap">
            {name}
          </p>
        </div>
        <div className="flex text-md pl-2 text-gray-800">
          <p>{selfValue + originalValue}</p>
          <div className="flex items-center">
            {/* 數值有改變才會出現變化箭頭 */}
            { hasSelectedEquipment && updatedValue > originalValue &&
              <>
                <PiArrowBendRightUpBold className="text-blue-500 mx-1" />
                <p className="text-blue-800">{selfValue + updatedValue}</p>
              </>
            }
            { hasSelectedEquipment && updatedValue < originalValue &&
              <>
                <PiArrowBendRightDownBold className="text-red-500 mx-1" />
                <p className="text-red-800">{selfValue + updatedValue}</p>
              </>
            }
          </div>
        </div>
      </div>
    )
  };

  const renderedStats = stats.map(statsItem =>
    <SingleStats
      key={statsItem.name}
      name={statsItem.name}
      engName={statsItem.engName}
      color={statsItem.color}
      Icon={statsItem.img}
    />
  );

  // 中間選裝備種類
  const SingleEquipmentType = ({ type, engType }) => {
    const equipment = equipments[engType] || '無';
    const selectedStyle = equipmentType === engType ? 'border-blue-500' : 'border-gray-300';

    return (
      <div
        onClick={() => handleSelectEquipmentType(engType)}
        className="w-2/6 flex flex-col items-center p-1"
      >
        <h5 className="text-xl font-bold mb-3">{type}</h5>
        <div className={"w-full h-20 border-2 rounded-lg p-5 text-gray-800 flex justify-center items-center text-nowrap " + selectedStyle}>
          {equipment}
        </div>
      </div>
    )
  };

  const renderedEquipmentTypes = equipmentTypes.map(item =>
    <SingleEquipmentType
      key={item.type}
      type={item.type}
      engType={item.engType}
    />
  );

  // 下面裝備列表
  const renderedEquipments = currentItems.map(item => {
    const renderedItem = itemsData.find(itemData => itemData.name === item.name);
    const selectedStyle = selectedEquipment.name === item.name && 'bg-blue-100 font-bold rounded-md';

    // 防止 bug
    if (!renderedItem) return null;

    // 只顯示裝備，不顯示其他物品
    const itemType = renderedItem.type;
    if (itemType !== 'equipment') return null;

    // 只顯示當前種類的裝備
    const itemEquipmentType = renderedItem.equipmentType;
    if (itemEquipmentType !== equipmentType) return null;

    return (
      <div
        onClick={() => handleSelectEquipment(renderedItem)}
        key={item.name}
        className={"my-1 p-1 text-gray-800 " + selectedStyle}
      >
        {item.name}
      </div>
    )
  });

  // 確定裝備
  const handleEquip = () => {
    if (!hasSelectedEquipment) {
      Swal.fire({
        icon: 'info',
        title: '請選擇裝備！',
      });

      return;
    }

    if (equipmentType === 'weapon') {
      dispatch(changeEquipments({ ...equipments, weapon: selectedEquipment.name }));
      dispatch(changeItem({ name: equipments.weapon, quantity: 1 }));
    } else if (equipmentType === 'armor') {
      dispatch(changeEquipments({ ...equipments, armor: selectedEquipment.name }));
      dispatch(changeItem({ name: equipments.armor, quantity: 1 }));
    } else if (equipmentType === 'accessory') {
      dispatch(changeEquipments({ ...equipments, accessory: selectedEquipment.name }));
      dispatch(changeItem({ name: equipments.accessory, quantity: 1 }));
    }
    dispatch(changeItem({ name: selectedEquipment.name, quantity: -1 }));
    setSelectedEquipment({});
  };

  // 取消
  const handleCancel = () => {
    setSelectedEquipment({});
  };

  return (
    <div className="flex flex-col items-center py-3 mb-3 min-w-[325px] w-10/12 max-w-[1024px]">
      <div className="w-full flex flex-wrap justify-start max-w-[425px] border-2 border-gray-300 rounded-lg">
        {renderedStats}
      </div>
      <div className="w-full flex my-5 max-w-[425px]">
        {renderedEquipmentTypes}
      </div>
      { equipmentType === '' ?
        <h5 className="text-center text-xl">請選擇裝備種類</h5> :
        <div className="w-full flex max-w-[425px]">
          <div className="w-3/4 max-h-32 border-2 border-gray-300 rounded-lg p-3 overflow-y-scroll">
            {renderedEquipments ? renderedEquipments : '無任何裝備'}
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center">
            <Button
              onClick={handleEquip}
              className="my-1"
              rounded
              blue={hasSelectedEquipment}
              disabled={!hasSelectedEquipment}
            >
              裝備
            </Button>
            <Button onClick={handleCancel} className="my-1" rounded yellow>取消</Button>
          </div>
        </div>
      }
    </div>
  );
}