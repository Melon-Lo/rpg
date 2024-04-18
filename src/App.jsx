import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
// import Route from "./components/Route";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

export default function App () {
  return (
    <div className="app">
      <Header />
      <BrowserRouter basename={basename}>
        <div className="mt-20">
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='create' element={<CreatePage />}></Route>
            <Route path='landing' element={<LandingPage />}></Route>
            <Route path='*' element={<CreatePage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};