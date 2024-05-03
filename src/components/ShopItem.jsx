import { useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import itemsData from "../data/items";
import Swal from "sweetalert2";

export default function ShopItem({ item, price, total, setTotal, shoppingCart, setShoppingCart }) {
  const [quantity, setQuantity] = useState(0);

  // 增減項目，同時計算總價和修改 shoppingCart
  const handleCalculate = (plusNumber) => {
    setQuantity(quantity + plusNumber);

    if (plusNumber > 0) {
      setTotal(total + price);
    } else if (plusNumber < 0) {
      setTotal(total - price);
    }

    // 先判別 shoppingCart 裡面有沒有該項目
    const updatedShoppingCart = shoppingCart.map(singleItem => {
      // 如果有，修改 quantity
      if (singleItem.name === item) {
        return { ...singleItem, quantity: singleItem.quantity + plusNumber };
      }
      // 如果沒有，整包放進去
      return singleItem;
    });
    // 如果沒有該項目，則新增一個
    if (!updatedShoppingCart.some(singleItem => singleItem.name === item)) {
      updatedShoppingCart.push({ name: item, quantity: quantity + plusNumber });
    }

    setShoppingCart(updatedShoppingCart);
  };

  // 點擊品項名可以查看詳細資訊
  const handleShowDetail = () => {
    const itemData = itemsData.find(singleItem => singleItem.name === item);
    const { description, effectDescription } = itemData;

    Swal.fire({
      title: `${item}`,
      html: `
        <p>${effectDescription}</p>
        <p>${description}</p>
      `
    })
  }

  return (
    <div className="w-full flex justify-between items-center p-3 text-gray-700 even:bg-gray-500/10">
      <h5 className="w-5/12" onClick={handleShowDetail}>{item}</h5>
      <h5 className="w-4/12 font-bold">$ {price}</h5>
      <div className="w-3/12 flex justify-end items-center">
        {/* 只有在大於 0 時才能減少 */}
        { quantity > 0 &&
          <FaMinusCircle className="w-1/3" onClick={() => handleCalculate(-1)} />
        }
        <span className="w-1/3 text-xl text-center">{quantity}</span>
        <FaPlusCircle className="w-1/3" onClick={() => handleCalculate(1)} />
      </div>
    </div>
  )
}