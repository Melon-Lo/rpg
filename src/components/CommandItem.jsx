export default function CommandItem({ command, color, Icon, setCurrentStep }) {
  const handleClick = () => {
    setCurrentStep(command);
  };

  return (
    <div onClick={handleClick} className={`relative w-12 h-12 rounded-full shadow-md bg-${color}-500 m-1 cursor-pointer`}>
      <div className="absolute inset-0 flex justify-center items-center">
        <Icon className={`text-3xl opacity-50 text-${color}-300`} />
      </div>
      <h5 className={`absolute inset-0 flex justify-center items-center text-lg font-bold text-slate-100 tracking-widest`}>
        {command}
      </h5>
    </div>
  );
}