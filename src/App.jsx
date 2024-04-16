import CreatePage from "./pages/CreatePage";
import LandingPage from "./pages/LandingPage";
import Route from "./components/Route";

export default function App () {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div className="col-span-5">
        <Route path='/landing'>
          <LandingPage />
        </Route>
        <Route path='/create'>
          <CreatePage />
        </Route>
      </div>
    </div>
  );
}