import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ItemList from "./Pages/ItemList";
import ContactForm from "./Pages/ContactForm";
import FetchingFromJsonPlaceholder from "./Pages/FetchingFromJsonPlaceholder";
import TablePagination from "./Pages/TablePagination";
import Home from "./Pages/Home";
import Navigation from "./components/Navigation";

const dataList = [{ name: "Apple" }, { name: "Banana" }, { name: "Cherry" }];

export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/item",
    name: "Item List",
    element: <ItemList data={dataList} />,
  },
  {
    path: "/contact-form",
    name: "Contact Form",
    element: <ContactForm />,
  },
  {
    path: "/fetching-data",
    name: "Fetching From Json Placeholder",
    element: <FetchingFromJsonPlaceholder />,
  },
  {
    path: "/pagination",
    name: "Table Pagination",
    element: <TablePagination />,
  },
];

function App() {
  const router = createBrowserRouter(
    routes.map((item) => {
      item.element = (
        <>
          <Navigation />
          {item.element}
        </>
      );
      return item;
    })
  );

  return <RouterProvider router={router} />;
}

export default App;
