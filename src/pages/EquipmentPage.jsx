import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeItem, changeEquipments, changeEquipmentsStats, changeTotalStats, changeCharacterStats, changeStats } from "../store";

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

  // 裝備種類的中文
  let equipmentType_CH;
  if (equipmentType === 'weapon') {
    equipmentType_CH = '武器';
  } else if (equipmentType === 'armor') {
    equipmentType_CH = '防具';
  } else if (equipmentType === 'accessory') {
    equipmentType_CH = '飾品';
  }

  const { roleCreated } = useSelector(state => state.systemStatus);
  const { equipments, equipmentsStats, totalStats, classTitle, maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD } = useSelector(state => state.characterStats);
  const characterStats = useSelector(state => state.characterStats);
  const selfStats = { maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD };
  const { data: currentItems } = useSelector(state => state.items);

  // 是否有選中裝備
  const hasSelectedEquipment = !(Object.keys(selectedEquipment).length === 0 && selectedEquipment.constructor === Object);

  // 選中的裝備種類內是否有裝備
  const selectedEquipmentTypeHasEquipment = equipments[equipmentType] || null;

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/landing');
      }
    };

    handleNavigate();
  }, []);

  // 每次更換裝備後，更新數值
  useEffect(() => {
    dispatch(changeEquipmentsStats());
    dispatch(changeTotalStats());
  }, [equipments])

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
    const selfValue = selfStats[engName];

    // 原本所有的裝備加起來的數值，如果沒有就代表是 0
    const originalValue = equipmentsStats[engName] || 0;

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
    const equipment = equipments[engType] || <span className="text-gray-500">無</span>;
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

  // 裝備列表的長度（不要計算null）
  const renderedEquipmentsLength = renderedEquipments.filter(item => item !== null).length;

  // 確定裝備
  const handleEquip = () => {
    if (!hasSelectedEquipment) {
      Swal.fire({
        icon: 'info',
        title: '請選擇裝備！',
      });

      return;
    }

    if (!selectedEquipment.availableClasses.includes(classTitle)) {
      Swal.fire({
        title: `${classTitle}無法裝備此武器！`
      });

      return;
    }

    if (equipmentType === 'weapon') {
      dispatch(changeEquipments({ ...equipments, weapon: selectedEquipment.name }));

      // 如果原本有武器，物品增一個一個舊武器
      if (equipments.weapon) {
        dispatch(changeItem({ name: equipments.weapon, quantity: 1 }));
      }
    } else if (equipmentType === 'armor') {
      dispatch(changeEquipments({ ...equipments, armor: selectedEquipment.name }));

      // 如果原本有防具，物品增一個一個舊防具
      if (equipments.armor) {
        dispatch(changeItem({ name: equipments.armor, quantity: 1 }));
      }
    } else if (equipmentType === 'accessory') {
      dispatch(changeEquipments({ ...equipments, accessory: selectedEquipment.name }));

      // 如果原本有飾品，物品增一個一個舊飾品
      if (equipments.accessory) {
        dispatch(changeItem({ name: equipments.accessory, quantity: 1 }));
      }
    }
    dispatch(changeItem({ name: selectedEquipment.name, quantity: -1 }));
    setSelectedEquipment({});
  };

  // 卸下裝備
  const handleUnequip = () => {
    if (!selectedEquipmentTypeHasEquipment) {
      Swal.fire({
        icon: 'info',
        title: `無${equipmentType_CH}可卸下`,
      });

      return;
    }

    if (equipmentType === 'weapon') {
      Swal.fire({
        icon: 'info',
        title: '不可卸下武器！',
      });

      return;
    } else if (equipmentType === 'armor') {
      dispatch(changeEquipments({ ...equipments, armor: '' }));
      dispatch(changeItem({ name: equipments.armor, quantity: 1 }));
    } else if (equipmentType === 'accessory') {
      dispatch(changeEquipments({ ...equipments, accessory: '' }));
      dispatch(changeItem({ name: equipments.accessory, quantity: 1 }));
    }
  };

  // 整備完畢，改變自身數值，回到主頁
  const handleSubmit = () => {
    Swal.fire({
      title: '整裝好了嗎？',
      text: '即將回到主頁',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      };
    });
  };

  return (
    <div className="flex flex-col items-center py-3 mb-3 min-w-[325px] w-10/12 max-w-[1024px]">
      {/* 上方數值 */}
      <div className="w-full flex flex-wrap justify-start max-w-[425px] border-2 border-gray-300 rounded-lg">
        {renderedStats}
      </div>

      {/* 中間武器種類 */}
      <div className="w-full flex my-5 max-w-[425px]">
        {renderedEquipmentTypes}
      </div>

      {/* 下方武器列表 */}
      { equipmentType === '' ?
        <h5 className="text-center text-xl">請選擇裝備種類</h5> :
        <div className="w-full flex max-w-[425px]">
          <div className="w-3/4 h-32 border-2 border-gray-300 rounded-lg p-3 overflow-y-scroll">
            { renderedEquipmentsLength !== 0 ?
              renderedEquipments :
              <div className="px-1 py-2 text-gray-500">物品欄內無任何{equipmentType_CH}</div>
            }
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center">
            <Button
              onClick={handleEquip}
              className="my-1"
              rounded
              green={hasSelectedEquipment}
              disabled={!hasSelectedEquipment}
            >
              裝備
            </Button>
            <Button
              onClick={handleUnequip}
              className="my-1"
              rounded
              yellow={selectedEquipmentTypeHasEquipment}
              disabled={!selectedEquipmentTypeHasEquipment}
            >
              卸下
            </Button>
          </div>
        </div>
      }

      {/* 返回主頁按鈕 */}
      <Button
        onClick={handleSubmit}
        className="mt-5"
        blue
      >
        返回主頁
      </Button>
    </div>
  );
}