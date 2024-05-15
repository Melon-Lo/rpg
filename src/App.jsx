import './App.scss';
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import EquipmentPage from './pages/EquipmentPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

export default function App () {
  return (
    <div>
      <BrowserRouter basename={basename}>
        <Header />
        <div className="mt-16 w-screen flex justify-center">
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="equipment" element={<EquipmentPage />}></Route>
              <Route path="create" element={<CreatePage />}></Route>
              <Route path="landing" element={<LandingPage />}></Route>
              <Route path="*" element={<Navigate to="create" />}></Route>
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};