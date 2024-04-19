import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-blue-800 fixed top-0">
      <h1 className="p-3 text-lg font-medium text-slate-100" onClick={() => navigate('/')}>
        好玩的RPG
      </h1>
    </div>
  );
};