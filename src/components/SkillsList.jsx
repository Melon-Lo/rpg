import { useSelector, useDispatch } from "react-redux";
import { changeHP, changeMP, addMessage, changeItem, changeTurn } from "../store";
import items from "../data/items";
import Swal from "sweetalert2";

export default function SkillsList({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { skills } = useSelector(state => state.characterStats);

  const Skill = ({ name }) => {
    return (
      <div className="w-3/6 flex justify-between">
        <h5 className="px-2 py-1 font-bold">{name}</h5>
      </div>
    );
  };

  const renderedSkills = skills.map(skill => <Skill key={skill} name={skill} />)

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderedSkills}
    </div>
  );
};