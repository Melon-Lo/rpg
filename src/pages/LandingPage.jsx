import { useContext } from "react";
import Button from "../components/Button";
import ProgressModal from "../components/ProgressModal";
import { ModalContext } from "../contexts/modal";

export default function LandingPage() {
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10">好玩的RPG</h1>
      <div>
        <Button blue className="my-3">新的冒險</Button>
        <Button green className="my-3" onClick={() => setShowModal('progress')}>讀取進度</Button>
      </div>
      {showModal && <ProgressModal />}
    </div>
  )
}