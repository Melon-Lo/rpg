import Button from "../components/Button";
import classImg from "../data/class/classImg";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeClassTitle, changeStatName, changeStatClassTitle, resetStats, generateStats, changeRoleCreated } from "../store";
import { RiDiceFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, classTitle } = useSelector(state => {
    return {
      name: state.form.name,
      classTitle: state.form.classTitle,
    };
  });
  const { maxHP, maxMP, ATK, DEF, MATK, MDEF, SPD } = useSelector(state => {
    return {
      maxHP: state.charStats.maxHP,
      maxMP: state.charStats.maxMP,
      ATK: state.charStats.ATK,
      DEF: state.charStats.DEF,
      MATK: state.charStats.MATK,
      MDEF: state.charStats.MDEF,
      SPD: state.charStats.SPD,
    };
  });

  // 送出資料
  const handleSubmit = (e) => {
    e.preventDefault();

    // 姓名不得為空白
    if (name.length === 0) {
      Swal.fire({
        text: "姓名不得為空白！",
        icon: "warning"
      });
      return
    }

    // 需要選擇職業並擲骰子決定數值
    if (!classTitle) {
      Swal.fire({
        text: "請選擇職業並擲骰子決定數值！",
        icon: "warning"
      });
      return
    }

    Swal.fire({
      title: '都確定了嗎？',
      html: `
        <div>
          <h5>名字：${name}</h5>
          <h5>職業：${classTitle}</h5>
          <h5>最大HP：${maxHP}</h5>
          <h5>最大MP：${maxMP}</h5>
          <h5>攻擊力：${ATK}</h5>
          <h5>防禦力：${DEF}</h5>
          <h5>魔法攻擊力：${MATK}</h5>
          <h5>魔法防禦力：${MDEF}</h5>
          <h5>速度：${SPD}</h5>
        <div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      // 如果用戶點擊了確認按鈕，則繼續執行後續操作
      if (result.isConfirmed) {
        Swal.fire({
          title: '角色創建成功',
          text: '請開始你的冒險！',
          icon: 'success',
          confirmButtonText: '開始冒險',
        });

        dispatch(changeStatName(name));
        dispatch(changeStatClassTitle(classTitle));
        dispatch(changeRoleCreated(true));
        navigate('/');
      }
    });
  };

  // 輸入名字
  const handleInputChange = (e) => {
    const value = e.target.value;

    // 名字長度不得超過10個字
    if (value.length > 10) return

    dispatch(changeName(value));
  };

  // 選職業
  const handleSelectClass = (item) => {
    dispatch(changeClassTitle(item.classTitle));
    dispatch(changeStatClassTitle(item.classTitle));

    // 當選擇不同的職業時，數值會重設
    if (item.classTitle === classTitle) return;
    dispatch(resetStats());
  };

  // 擲骰子
  const handleRollDice = () => {
    // 還沒選職業就擲骰子
    if (!classTitle) {
      Swal.fire({
        text: "請先選擇職業！",
        icon: "warning"
      });
      return
    }
    dispatch(generateStats());
  };

  // 職業列表
  const renderedClassList = classImg.map(classItem => {
    const selectedStyle = classTitle === classItem.classTitle ? 'border-blue-800 border-4' : 'border-2 border-gray-400';

    return (
      <div key={classItem.classTitle} className={"w-40 m-1 p-8 rounded-md flex flex-col items-center " + selectedStyle} onClick={() => handleSelectClass(classItem)}>
        <classItem.icon className="text-xl" />
        <h5 className="font-medium mt-3">{classItem.classTitle}</h5>
      </div>
    )
  });

  return (
    <div className="flex flex-col items-center py-3">
      <div className="text-center">
        <h1 className="text-4xl">歡迎來到好玩的RPG！</h1>
        <h3 className="text-lg text-gray-600 mt-3">在此建立你的角色</h3>
      </div>
      <form className="mt-10 w-full flex flex-col items-center" onSubmit={handleSubmit}>
        {/* 輸入名字 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3 font-bold text-2xl">【名字】</h2>
          <input onChange={handleInputChange} value={name} className="p-3 w-80" type="text" placeholder="輸入角色名（10個字以內）" />
        </div>
        {/* 選擇職業 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3 font-bold text-2xl">【職業】</h2>
          <div className="flex flex-wrap justify-start items-center w-5/6">
            {renderedClassList}
          </div>
        </div>
        {/* 擲骰子 */}
        <div className="flex flex-col items-center w-5/6 text-lg mt-10 py-5">
          <div className="border-2 border-blue-800 rounded-full w-24 h-24 flex justify-center items-center shadow-md shadow-blue-500/50" onClick={handleRollDice}>
            <RiDiceFill className="text-5xl text-blue-800" />
          </div>
          <div className="border-2 border-gray-300 p-3 rounded-lg leading-8 mt-8 w-full max-w-60 text-gray-800">
            <h5>最大HP：{maxHP ? maxHP : '-'}</h5>
            <h5>最大MP：{maxMP ? maxMP : '-'}</h5>
            <h5>攻擊力：{ATK ? ATK : '-'}</h5>
            <h5>防禦力：{DEF ? DEF : '-'}</h5>
            <h5>魔法攻擊力：{MATK ? MATK : '-'}</h5>
            <h5>魔法防禦力：{MDEF ? MDEF : '-'}</h5>
            <h5>速度：{SPD ? SPD : '-'}</h5>
          </div>
        </div>
        <Button primary rounded className="mt-5">創建角色</Button>
      </form>
    </div>
  );
}