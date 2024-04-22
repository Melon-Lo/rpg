import { useSelector } from "react-redux";

export default function ItemsList() {
  const items = useSelector(state => state.items.data);

  const Item = ({ name, quantity }) => {
    return (
      <div className="w-3/6 flex justify-between">
        <h5 className="px-2 py-1 font-bold">{name}</h5>
        <h5 className="px-2 py-1 text-gray-600">x{quantity}</h5>
      </div>
    );
  };

  const renderItems = items.map(item => <Item key={item.name} name={item.name} quantity={item.quantity} />);

  return (
    <div className="w-full flex flex-wrap bg-slate-50/75 p-3">
      {renderItems}
    </div>
  );
};