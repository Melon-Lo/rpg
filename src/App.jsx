import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
// import Route from "./components/Route";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const basename = process.env.PUBLIC_URL;

export default function App () {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="main" element={<MainPage />}></Route>
            <Route path="create" element={<CreatePage />}></Route>
            <Route path="landing" element={<LandingPage />}></Route>
            <Route path="*" element={<Navigate to="create" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    // <div className="">
    //   <Header />
    //   <div className="mt-20">
    //     <Route path='/'>
    //       <MainPage />
    //     </Route>
    //     <Route path='/landing'>
    //       <LandingPage />
    //     </Route>
    //     <Route path='/create'>
    //       <CreatePage />
    //     </Route>
    //   </div>
    // </div>
  );
};