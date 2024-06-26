import { useContext } from "react";
import { StepContext } from "../contexts/step";

export default function CommandItem({ command, color, Icon }) {
  const { setCurrentStep } = useContext(StepContext);

  const handleClick = () => {
    setCurrentStep(command);
  };

  return (
    <div onClick={handleClick} className={`relative w-12 h-12 rounded-full shadow-md bg-${color}-500 m-1`}>
      <div className="absolute inset-0 flex justify-center items-center">
        <Icon className={`text-3xl opacity-50 text-${color}-800`} />
      </div>
      <h5 className={`absolute inset-0 flex justify-center items-center text-lg font-bold text-slate-100 tracking-widest`}>
        {command}
      </h5>
    </div>
  );
}