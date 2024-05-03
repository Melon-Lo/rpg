import Button from "./Button"
import { RxCross1 } from "react-icons/rx";

export default function ShopModal({ setShowModal }) {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
      <div className="fixed bg-gray-800/75 inset-0 z-10">
        <div className="relative w-full h-full">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-amber-200 w-10/12 h-2/3 rounded-lg">
            <div className="relative h-1/6 flex flex-col justify-center items-center py-1">
              <h1 className="text-3xl text-amber-900">商店</h1>
              <h2 className="text-amber-800">＊點擊商品可以查看效果</h2>
              <div className="absolute top-2 right-2" onClick={handleCloseModal}>
                <RxCross1 className="text-2xl text-amber-900" />
              </div>
            </div>
            <div className="h-2/3 bg-slate-100/75">
            </div>
            <div className="h-1/6 flex justify-between items-center px-3">
              <h5 className="text-xl text-gray-800">總計：$</h5>
              <Button amber>確定購買</Button>
            </div>
          </div>
        </div>
      </div>
  )
}