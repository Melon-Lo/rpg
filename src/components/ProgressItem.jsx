import { useSelector, useDispatch } from "react-redux";
import { changeCharacterStats, changeStatName, changeStatClassTitle, changeCurrentScene, changeSkills, changeItems, changeMoney } from "../store";
import Swal from "sweetalert2";

export default function ProgressItem({
  index,
  currentTime,
  name,
  classTitle,
  level,
  currentScene,
  money,
  setShowModal,
  type,
  typeColor,
  setCurrentStep,
}) {
  const dispatch = useDispatch();

  // 取得所有的資料
  const { name: currentName, classTitle: currentClassTitle, level: currentLevel, HP, maxHP, MP, maxMP, ATK, DEF, MATK, MDEF, SPD, exp, expToNextLevel, skills } = useSelector(state => state.characterStats);
  const { money: currentMoney, data } = useSelector(state => state.items);
  const { currentScene: scene } = useSelector(state => state.systemStatus);

  const handleClick = () => {
    if (type === 'save') {
      handleSave();
    } else if (type === 'load') {
      handleLoad();
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: `確定要覆蓋此進度嗎？`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const currentTime = `${year}/${month}/${date} ${hours}:${minutes}`
        const progressData = {
          characterStats: { name: currentName, classTitle: currentClassTitle, level: currentLevel, HP, maxHP, MP, maxMP, ATK, DEF, MATK, MDEF, SPD, exp, expToNextLevel, skills },
          items: { money: currentMoney, data },
          systemStatus: { currentScene: scene },
          currentTime: { currentTime },
        };

        localStorage.setItem(`progressData${index}`, JSON.stringify(progressData));

        // 存檔完馬上跳出提示，趁機更新數據
        setShowModal('');
        setTimeout(() => {
          setShowModal('progress');
        }, 1)

        Swal.fire({
          title: '存檔成功！',
          icon: 'success',
        })
      }
    })
  };

  const handleLoad = () => {
    if (!currentScene) {
      Swal.fire({
        title: '此進度格沒有進度！',
        icon: 'info',
      })

      return;
    };

    Swal.fire({
      title: `確定要讀取此進度嗎？`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        const progressData = JSON.parse(localStorage.getItem(`progressData${index}`));
        dispatch(changeStatName(progressData.characterStats.name));
        dispatch(changeStatClassTitle(progressData.characterStats.classTitle));
        dispatch(changeCharacterStats({ ...progressData.characterStats }));
        dispatch(changeCurrentScene(progressData.systemStatus.currentScene));
        dispatch(changeSkills(progressData.characterStats.skills));
        dispatch(changeItems(progressData.items.data));
        dispatch(changeMoney(progressData.items.money));
        setShowModal('');
        setCurrentStep('主頁');

        Swal.fire({
          title: '讀取成功！',
          icon: 'success',
        })
      }
    });
  }

  return (
    <div onClick={handleClick} className="flex items-center w-11/12 rounded-lg overflow-hidden h-20 my-3 shadow-md cursor-pointer">
      <h5 className={`w-4/12 bg-${typeColor}-700 text-slate-100 h-full flex justify-center items-center`}>進度 {index}</h5>
      <div className="w-8/12 bg-slate-100/80 h-full flex flex-col justify-center items-start pl-2 text-gray-800">
        { currentTime ?
          <>
            <p>{currentTime}</p>
            <p>{name}｜{classTitle}｜LV{level}</p>
            <p>{currentScene}｜${money}</p>
          </>
          :
          <p>尚無資料</p>
        }
      </div>
    </div>
  );
};