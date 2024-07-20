import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { Suspense } from "react";
import Loader from "./layouts/loader/Loader";
import "./App.scss";

function App() {
  const routing = createBrowserRouter(Themeroutes);
  return (
    <div className="dark">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={routing} />
      </Suspense>
    </div>
  );
}

export default App;
