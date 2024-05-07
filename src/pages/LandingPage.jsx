import { useContext } from "react";
import Button from "../components/Button";
import ProgressModal from "../components/ProgressModal";
import { ModalContext } from "../contexts/modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LandingPage() {
  const navigate = useNavigate();
  const { showModal, setShowModal } = useContext(ModalContext);

  const handleGoCreatePage = () => {
    Swal.fire({
      title: `確定要開啟新遊戲嗎？`,
      text: '即將開始創建角色',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('create');
      };
    });
  };

  const handleShowProgressModal = () => {
    setShowModal('progress');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-10">好玩的RPG</h1>
      <div>
        <Button blue className="my-3" onClick={handleGoCreatePage}>新的冒險</Button>
        <Button green className="my-3" onClick={handleShowProgressModal}>讀取進度</Button>
      </div>
      {showModal && <ProgressModal />}
    </div>
  );
};