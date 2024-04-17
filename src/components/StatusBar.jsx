import { useDispatch, useSelector } from "react-redux";
import { RiCoinsLine } from "react-icons/ri";

export default function StatusBar() {
  const { name, classTitle, level, HP, maxHP, MP, maxMP } = useSelector(state => {
    return {
      name: state.charStats.name,
      classTitle: state.charStats.classTitle,
      level: state.charStats.level,
      HP: state.charStats.HP,
      maxHP: state.charStats.maxHP,
      MP: state.charStats.MP,
      maxMP: state.charStats.maxMP,
    };
  });

  const { money } = useSelector(state => {
    return {
      money: state.items.money,
    };
  });

  return (
    <section className="flex flex-col items-end px-3">
      <div className="flex justify-between w-full">
        <div className="w-6/12">
          <div>
            {name}｜{classTitle}
          </div>
          <div>
            LV.{level}
          </div>
        </div>
        <div className="w-6/12">
          <div className="flex justify-between">
            <div>
              HP：{HP}/{maxHP}
            </div>
            <div>
              HP條
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              MP：{MP}/{maxMP}
            </div>
            <div>
              MP條
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div>
          <RiCoinsLine />
        </div>
        <div>
          {money}
        </div>
      </div>
    </section>
  );
}