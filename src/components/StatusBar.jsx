export default function StatusBar({ type, color, currentValue, maxValue, selfStatus }) {
  const currentRatio = currentValue / maxValue;

  const ValueNumbers = () => {
    return (
      <div className="text-nowrap pr-3">
        {type}：{currentValue} / {maxValue}
      </div>
    );
  };

  const barStyle = selfStatus ? 'w-5/12 md:w-7/12' : 'w-full';

  return (
    <div className="flex justify-between items-center py-1">
      { selfStatus && <ValueNumbers /> }
      {/* 灰色背景 */}
      <div className={`${barStyle} bg-gray-300/60 rounded-md relative overflow-hidden h-4`}>
        {/* 依照比例顯示長度 */}
        <div className={`absolute inset-0 bg-${color}-500`} style={{ width: currentRatio * 100 + '%' }}></div>
      </div>
    </div>
  )
}