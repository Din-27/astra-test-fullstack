import DragAndDropItem from "./components/DragAndDropItem";
import Drawer from "./components/Drawer";
import ModalItem from "./components/ModalItem";
import Spinner from "./components/Spinner";
import { useTodo } from "./hook/use-todo";

function App() {
  const {
    data,
    dropdown,
    form,
    handleChange,
    handleCreateTodo,
    handleDeleteTodo,
    handleEditItem,
    handleOffModalEdit,
    handleOffOption,
    handleOption,
    handleUpdateOrderTodo,
    handleUpdateTodo,
    handleModalAdd,
    handleDrawer,
    modal,
    drawer,
  } = useTodo();

  if (!data) {
    return <Spinner />;
  }
  console.clear();
  return (
    <>
      {dropdown.condtion && (
        <div
          className={`absolute w-full h-full z-10 ${
            drawer.display ? "bg-gray-800 opacity-50" : ""
          }`}
          onClick={handleOffOption}
        />
      )}
      {drawer.display && (
        <div
          className={`absolute w-full h-full z-10 ${
            drawer.display ? "bg-gray-800 opacity-50" : ""
          }`}
          onClick={handleDrawer}
        />
      )}
      <div className="flex justify-center p-6">
        <div className="w-1/3 max-h-screen">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Todo List</h2>
            <div className="space-x-2">
              <button
                onClick={handleModalAdd}
                className="cursor-pointer border p-1 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            </div>
          </div>
          <DragAndDropItem
            dropdown={dropdown}
            handleOption={handleOption}
            initialItems={data}
            handleEditItem={handleEditItem}
            handleUpdateOrderDrag={handleUpdateOrderTodo}
            handleDeleteItem={handleDeleteTodo}
            handleOnDrawer={handleDrawer}
          />
        </div>
      </div>
      {modal.display && modal.type === "add" && (
        <ModalItem
          title={"Create"}
          form={form}
          onChange={handleChange}
          handleSubmit={handleCreateTodo}
          handleOffModal={handleModalAdd}
        />
      )}
      {modal.display && modal.type === "edit" && (
        <ModalItem
          title={"Edit"}
          form={form}
          onChange={handleChange}
          handleSubmit={(e) => handleUpdateTodo(form.id, e)}
          handleOffModal={handleOffModalEdit}
        />
      )}
      {drawer.display && (
        <Drawer data={drawer.data} handleCloseDrawer={handleDrawer} />
      )}
    </>
  );
}

export default App;
