import Button from "./Button"
import ShopItem from "./ShopItem";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { changeItem, changeMoney } from "../store";
import { ModalContext } from "../contexts/modal";
import { StepContext } from "../contexts/step";
import shopsItems from "../data/shopsItems";
import itemsData from "../data/items";

export default function ShopModal() {
  const dispatch = useDispatch();
  const { setShowModal } = useContext(ModalContext);
  const { setCurrentStep } = useContext(StepContext);
  const { currentScene, stage } = useSelector(state => state.systemStatus);
  const { money, data: items } = useSelector(state => state.items);
  const currentShopItems = shopsItems.find(shop => shop.shop === currentScene).items;

  const [total, setTotal] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [type, setType] = useState('buy');
  const typeStyle = `mx-3 px-3 py-2 text-amber-800 cursor-pointer `
  const selectedStyle = `bg-amber-800 text-slate-100 rounded-md`
  const typeText = type === 'buy' ? '購買' : '販賣';

  const handleCloseModal = () => {
    setShowModal('');
  };

  const handleSetTypeBuy = () => {
    setType('buy');
  };

  const handleSetTypeSell = () => {
    setType('sell');
  };

  // 確定買賣
  const handleSubmit = () => {
    if (total === 0) {
      Swal.fire({
        icon: 'info',
        title: '未選擇商品！'
      });
      return;
    };

    // 如果是買，總價不能超過持有金錢
    if (type === 'buy') {
      if (money < total) {
        Swal.fire({
          icon: 'info',
          title: '金錢不足！'
        });
        return;
      }
    }

    Swal.fire({
        title: `確定${typeText}嗎？`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        // 購買
        if (type === 'buy') {
          // 購買 shoppingCart 內的所有東西
          shoppingCart.forEach(singleItem => {
            dispatch(changeItem({
              name: singleItem.name,
              quantity: singleItem.quantity,
            }));
          });

          // 金錢扣掉 total
          dispatch(changeMoney(money - total));
        }

        // 販賣
        if (type === 'sell') {
          // 賣掉 shoppingCart 內的指定物品與數量
          shoppingCart.forEach(singleItem => {
            dispatch(changeItem({
              name: singleItem.name,
              quantity: singleItem.quantity * -1,
            }));
          });

          // 金錢扣掉 total
          dispatch(changeMoney(money + total));
        }

        // 回歸買賣前狀態
        setShoppingCart([]);
        setShowModal('');

        Swal.fire({
          title: `${typeText}成功！`,
          icon: 'success',
        });
      }
    });
  };

  // 購買
  const renderedBuyItems = currentShopItems.map(item => {
    const itemName = item.item;
    const itemPrice = itemsData.find(itemData => itemData.name === itemName)?.price || 0;
    const currentHeld = items.find(item => item.name === itemName)?.quantity || 0;

    // 如果還沒到達特定 stage，不會販賣該品項
    if (stage < item.stage) return null;

    return (
      <ShopItem
        key={itemName}
        item={itemName}
        price={itemPrice}
        total={total}
        setTotal={setTotal}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        type={type}
        quantityHeld={currentHeld}
      />
    )
  })

  // 販賣
  const renderedSellItems = items.map(item => {
    const itemName = item.name;

    // 任務道具不能販賣
    const sellItemType = itemsData.find(itemData => itemData.name === itemName)?.type;
    if (sellItemType && sellItemType === 'quest') return null;

    // 賣價為買價的 50%
    const sellItemPrice = Math.floor(itemsData.find(itemsData => itemsData.name === itemName).price / 2) || null;

    return (
      <ShopItem
        key={itemName}
        item={itemName}
        price={sellItemPrice}
        total={total}
        setTotal={setTotal}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        type={type}
        quantityHeld={item.quantity}
      />
    )
  })

  return (
    <div className="fixed bg-gray-800/75 inset-0 z-10">
      <div className="relative w-full h-full">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-amber-200 w-11/12 h-5/6 max-w-[768px] rounded-lg flex flex-col justify-between">
          <div className="relative flex flex-col justify-center items-center py-2">
            <h1 className="text-3xl text-amber-900">商店</h1>
            <h2 className="text-amber-800 py-2">＊點擊商品可以查看效果</h2>
            <div className="absolute top-2 right-2" onClick={handleCloseModal}>
              <RxCross1 className="text-2xl text-amber-900" />
            </div>
          </div>
          <div className="flex justify-center items-center pb-5 text-lg">
            <div
              className={typeStyle + (type === 'buy' && selectedStyle)}
              onClick={handleSetTypeBuy}
            >
              購買
            </div>
            <div
              className={typeStyle + (type === 'sell' && selectedStyle)}
              onClick={handleSetTypeSell}
            >
              販賣
            </div>
          </div>
          <div className="h-[500px] bg-slate-100/75 overflow-y-scroll">
            { type === 'buy' && renderedBuyItems }
            { type === 'sell' &&
              ( renderedSellItems.length > 0 ?
                renderedSellItems :
                <p className="p-3 text-lg text-center">
                  未持有任何物品
                </p>
              )
            }
          </div>
          <div className="flex justify-between items-center px-3 py-5">
            <div>
              <h5 className="text-xs text-gray-600">持有金錢：$ {money}</h5>
              <h5 className="text-xl text-gray-800">總計：$ {total}</h5>
            </div>
            {/* 根據不同條件渲染 submit 按鈕 */}
            <Button
              onClick={handleSubmit}
              disabled={(type === 'buy' && (money < total || total === 0)) || (type === 'sell' && total === 0)}
              amber={(type === 'buy' && money >= total && total !== 0) || (type === 'sell' && total !== 0)}
            >
              確定{typeText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}