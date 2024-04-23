import { useSelector, useDispatch } from "react-redux";
import { changeHP, changeMP, addMessage, changeItem } from "../store";
import items from "../data/items";
import Swal from "sweetalert2";

export default function ItemsList() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.items);

  const { HP, MP } = useSelector(state => state.charStats);

  // 查看、使用物品
  const Item = ({ name, quantity }) => {
    // 先抓到 items 列表中的該物件，取得該 item 的屬性
    const item = items.find(item => item.name === name);
    const handleClick = () => {
      Swal.fire({
        title: `要使用「${item.name}」嗎？`,
        html: `
          <div>
            <h5>${item.effectDescription}</h5>
            <h5>${item.description}</h5>
          <div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
      }).then((result) => {
        // 如果用戶點擊了確認按鈕，則繼續執行後續操作
        if (result.isConfirmed) {
          // 運算完的值
          let valueAfterEffect;

          // 根據類別做不同運算
          if (item.type === 'healHP' || item.type === 'damageHP') {
            valueAfterEffect = item.effect(HP);
            dispatch(changeHP(valueAfterEffect));
          } else if (item.type === 'healMP' || item.type === 'damageMP') {
            valueAfterEffect = item.effect(MP);
            dispatch(changeMP(valueAfterEffect));
          }

          // 使用完物品後數量要 -1
          dispatch(changeItem({
            name: item.name,
            quantity: -1,
          }));

          // 使用物品訊息
          dispatch(addMessage({
            type: 'useItem',
            content: `使用了${item.name}！${item.effectMessage}`,
          }));
        }
      });
    };

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