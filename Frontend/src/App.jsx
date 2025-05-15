import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemList from "./Pages/ItemList";
import ContactForm from "./Pages/ContactForm";
import FetchingFromJsonPlaceholder from "./Pages/FetchingFromJsonPlaceholder";
import Pagination from "./Pages/Pagination";
import Home from "./Pages/Home";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/item",
    element: <ItemList />,
  },
  {
    path: "/contact-form",
    element: <ContactForm />,
  },
  {
    path: "/fetching-data",
    element: <FetchingFromJsonPlaceholder />,
  },
  {
    path: "/pagination",
    element: <Pagination />,
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
