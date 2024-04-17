import Button from "../components/Button";
import classImgData from "../data/class/classImgData";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeClassTitle } from "../store";
import { RiDiceFill } from "react-icons/ri";

export default function CreatePage() {
  const dispatch = useDispatch();
  const { name, classTitle } = useSelector(state => {
    return {
      name: state.form.name,
      classTitle: state.form.classTitle,
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, classTitle);
  }

  const handleChange = (e) => {
    dispatch(changeName(e.target.value));
  }

  const renderedClassList = classImgData.map(classItem => {
    const selectedStyle = classTitle === classItem.classTitle ? 'border-blue-800 border-4' : 'border-2 border-gray-400';

    return (
      <div key={classItem.classTitle} className={"w-40 m-1 p-8 rounded-md flex flex-col items-center " + selectedStyle} onClick={() => dispatch(changeClassTitle(classItem.classTitle))}>
        <classItem.icon className="text-xl" />
        <h5 className="font-medium mt-3">{classItem.classTitle}</h5>
      </div>
    )
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-xl">歡迎來到好玩的RPG！</h1>
        <h3 className="text-lg text-gray-600 mt-3">在此建立你的角色</h3>
      </div>
      <form className="mt-10 w-full flex flex-col items-center" onSubmit={handleSubmit}>
        {/* 輸入名字 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3">名字</h2>
          <input onChange={handleChange} value={name} className="p-3" type="text" placeholder="輸入角色名..." />
        </div>
        {/* 選擇職業 */}
        <div className="flex flex-col items-start text-lg w-full py-2 px-5">
          <h2 className="m-3">職業</h2>
          <div className="flex flex-wrap justify-start items-center w-5/6">
            {renderedClassList}
          </div>
        </div>
        {/* 擲骰子 */}
        <div className="flex flex-col items-center w-5/6 text-lg py-5">
          <div className="border-2 border-blue-800 rounded-full w-24 h-24 flex justify-center items-center shadow-md shadow-blue-500/50">
            <RiDiceFill className="text-5xl text-blue-800" />
          </div>
          <div className="border-2 border-gray-300 p-3 rounded-lg leading-8 mt-8 w-full max-w-60 text-gray-800">
            <h5>HP：</h5>
            <h5>MP：</h5>
            <h5>攻擊力：</h5>
            <h5>防禦力：</h5>
            <h5>魔法攻擊力：</h5>
            <h5>魔法防禦力：</h5>
            <h5>速度：</h5>
          </div>
        </div>
        <Button primary rounded className="mt-5">創建角色</Button>
      </form>
    </div>
  );
}