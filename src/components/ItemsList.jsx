import { useSelector, useDispatch } from "react-redux";
import { changeHPorMP } from "../store";
import items from "../data/items";

export default function ItemsList() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.items);

  const { HP, MP } = useSelector(state => state.charStats);

  console.log(HP, MP)

  const Item = ({ name, quantity }) => {
    const itemEffect = items.find(item => item.name === name)?.effect;
    const handleClick = () => {
      dispatch(changeHPorMP(itemEffect(HP)));
      // console.log(result);
    }

    return (
      <div className="w-3/6 flex justify-between" onClick={handleClick}>
        <h5 className="px-2 py-1 font-bold">{name}</h5>
        <h5 className="px-2 py-1 text-gray-600">x{quantity}</h5>
      </div>
    );
  };

  const renderItems = data.map(item => <Item key={item.name} name={item.name} quantity={item.quantity} />);

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderItems}
    </div>
  );
};