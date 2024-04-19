import StatusSection from "../components/StatusSection";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const { roleCreated } = useSelector(state => {
    return {
      roleCreated: state.systemStatus.roleCreated,
    };
  });

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

      {/* DEV ONLY */}
      <button className="border-3 border-green-500" onClick={() => navigate('create')}>to create</button>
    </div>
  );
};