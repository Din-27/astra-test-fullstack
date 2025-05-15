import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemList from "./Pages/ItemList";
import ContactForm from "./Pages/ContactForm";
import FetchingFromJsonPlaceholder from "./Pages/FetchingFromJsonPlaceholder";
import TablePagination from "./Pages/TablePagination";
import Home from "./Pages/Home";

const dataList = [{ name: "Apple" }, { name: "Banana" }, { name: "Cherry" }];

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/item",
    element: <ItemList data={dataList} />,
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
    element: <TablePagination />,
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
