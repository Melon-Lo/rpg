import Button from "./Button"
import ShopItem from "./ShopItem";
import { RxCross1 } from "react-icons/rx";
import shopsItems from "../data/shopsItems";
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { changeItem, changeMoney } from "../store";
import { ModalContext } from "../contexts/modal";
import { StepContext } from "../contexts/step";

export default function ShopModal() {
  const dispatch = useDispatch();
  const { setCurrentStep } = useContext(StepContext);

  const { currentScene } = useSelector(state => state.systemStatus);
  const { money } = useSelector(state => state.items);
  const currentShopItems = shopsItems.find(shop => shop.shop === currentScene).items;
  const [total, setTotal] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  const { setShowModal } = useContext(ModalContext);

  const handleCloseModal = () => {
    setShowModal('');
  };

  const handleSubmit = () => {
    if (total === 0) {
      Swal.fire({
        icon: 'info',
        title: '未選擇商品！'
      });
      return;
    };

    if (money < total) {
      Swal.fire({
        icon: 'info',
        title: '金錢不足！'
      });
      return;
    }

    Swal.fire({
        title: '確定購買嗎？',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        // 購買 shoppingCart 內的所有東西
        shoppingCart.forEach(singleItem => {
          dispatch(changeItem({
            name: singleItem.name,
            quantity: singleItem.quantity,
          }));
        });

        // 金錢扣掉 total
        dispatch(changeMoney(money - total));

        Swal.fire({
          title: '購買成功！',
          icon: 'success',
        });

        // 回歸購買前狀態
        setShoppingCart([]);
        setShowModal('');
        setCurrentStep('主頁');
      }
    });
  }

  const renderedItems = currentShopItems.map(item => {
    return (
      <ShopItem key={item.item} item={item.item} price={item.price} total={total} setTotal={setTotal} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
    )
  })

  return (
      <div className="fixed bg-gray-800/75 inset-0 z-10">
        <div className="relative w-full h-full">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-amber-200 w-10/12 h-5/6 rounded-lg">
            <div className="h-1/6 relative flex flex-col justify-center items-center py-1">
              <h1 className="text-3xl text-amber-900">商店</h1>
              <h2 className="text-amber-800">＊點擊商品可以查看效果</h2>
              <div className="absolute top-2 right-2" onClick={handleCloseModal}>
                <RxCross1 className="text-2xl text-amber-900" />
              </div>
            </div>
            <div className="h-2/3 bg-slate-100/75 overflow-y-scroll">
              {renderedItems}
            </div>
            <div className="h-1/6 flex justify-between items-center px-3">
              <div>
                <h5 className="text-xs text-gray-600">擁有金錢：$ {money}</h5>
                <h5 className="text-xl text-gray-800">總計：$ {total}</h5>
              </div>
              { money >= total && total !== 0 ?
                <Button amber onClick={handleSubmit}>確定購買</Button> :
                <Button disable onClick={handleSubmit}>確定購買</Button>
              }
            </div>
          </div>
        </div>
      </div>
  )
}