import StatusSection from "../components/StatusSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ScreenSection from "../components/ScreenSection";
import MessageSection from "../components/MessageSection";
import CommandSection from "../components/CommandSection";
import Button from "../components/Button";

// DEV ONLY
import { useDispatch } from "react-redux";
import { changeItem } from "../store";

export default function MainPage() {
  // DEV ONLY
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { roleCreated } = useSelector(state => state.systemStatus);

  const handleNavigate = () => {
    if (!roleCreated) {
      navigate('/create');
    }
  };

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    handleNavigate();
  }, [])

  return (
    <div className="flex flex-col items-center">
      <StatusSection />
      <ScreenSection />
      <MessageSection />
      <CommandSection />

      {/* DEV ONLY */}
      <Button blue onClick={() => navigate('create')}>to create</Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => dispatch(changeItem({
        name: '補藥',
        quantity: 1,
      }))}>
        加1個補藥
      </Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => dispatch(changeItem({
        name: '魔法藥',
        quantity: 1,
      }))}>
        加1個魔法藥
      </Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => dispatch(changeItem({
        name: '毒藥',
        quantity: 1,
      }))}>
        加1個毒藥
      </Button>
    </div>
  );
};