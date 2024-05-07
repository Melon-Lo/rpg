import { useContext } from "react";
import Button from "../components/Button";
import ProgressModal from "../components/ProgressModal";
import { ModalContext } from "../contexts/modal";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { showModal, setShowModal } = useContext(ModalContext);

  const handleGoCreatePage = () => {
    navigate('create');
  }

  const handleShowProgressModal = () => {
    setShowModal('progress');
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10">好玩的RPG</h1>
      <div>
        <Button blue className="my-3" onClick={handleGoCreatePage}>新的冒險</Button>
        <Button green className="my-3" onClick={handleShowProgressModal}>讀取進度</Button>
      </div>
      {showModal && <ProgressModal />}
    </div>
  )
}