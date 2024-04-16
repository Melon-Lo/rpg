import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import Route from "./components/Route";

export default function App () {
  return (
    <div className="container">
      <Header />
      <div className="mt-20">
        <Route path='/'>
          <MainPage />
        </Route>
        <Route path='/landing'>
          <LandingPage />
        </Route>
        <Route path='/create'>
          <CreatePage />
        </Route>
      </div>
    </div>
  );
};