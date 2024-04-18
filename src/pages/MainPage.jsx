import StatusSection from "../components/StatusSection";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <StatusSection />
      <button onClick={() => navigate('create')}>to create</button>
    </div>
  );
};