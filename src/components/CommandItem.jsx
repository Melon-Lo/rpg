export default function CommandItem({ command, color, Icon }) {
  return (
    <div className={`relative w-20 h-20 rounded-full shadow-md bg-${color}-500 m-2`}>
      <div className="absolute inset-0 flex justify-center items-center">
        <Icon className={`text-6xl opacity-50 text-${color}-400`} />
      </div>
      <h5 className={`absolute inset-0 flex justify-center items-center text-2xl font-bold text-slate-100 tracking-widest`}>
        {command}
      </h5>
    </div>
  );
}