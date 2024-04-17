export default function StatusBar({ type, color, currentValue, maxValue }) {
  const currentRatio = currentValue / maxValue;

  return (
    <div className="flex justify-between py-2">
      <div>
        {type}：{currentValue} / {maxValue}
      </div>
      <div className="w-5/12 md:w-7/12 bg-gray-300 rounded-md relative overflow-hidden">
        {/* 依照比例顯示長度 */}
        <div id="hpBar" className={"absolute inset-0 bg-" + color + "-500"} style={{ width: currentRatio * 100 + '%' }}></div>
      </div>
    </div>
  )
}