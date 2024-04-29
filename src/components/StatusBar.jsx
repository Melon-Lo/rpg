export default function StatusBar({ type, color, currentValue, maxValue, selfStatus }) {
  const currentRatio = currentValue / maxValue;

  const ValueNumbers = () => {
    return (
      <div>
        {type}：{currentValue} / {maxValue}
      </div>
    );
  };

  const barStyle = selfStatus ? 'w-5/12 md:w-7/12' : 'w-full';

  return (
    <div className="flex justify-between items-center py-2">
      { selfStatus && <ValueNumbers /> }
      {/* 灰色背景 */}
      <div className={`${barStyle} bg-gray-300 rounded-md relative overflow-hidden h-4`}>
        {/* 依照比例顯示長度 */}
        <div className={`absolute inset-0 bg-${color}-500`} style={{ width: currentRatio * 100 + '%' }}></div>
      </div>
    </div>
  )
}