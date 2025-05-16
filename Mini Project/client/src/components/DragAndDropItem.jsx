import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DropdownList from "./DropdownList";
import Spinner from "../components/Spinner";

export default function DragAndDropItem({
  initialItems: items,
  dropdown,
  handleOption,
  handleUpdateOrderDrag,
  handleEditItem,
  handleDeleteItem,
  handleOnDrawer,
  handleLoading,
  loading,
}) {
  const [onDrag, setOnDrag] = useState({ draggableId: null });
  const handleOnDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    const changedItems = newItems.filter(
      (item, index) => item.id !== items[index].id
    );

    if (changedItems.length > 0) {
      const data = newItems.map((x, index) => {
        x.order = index + 1;
        return x;
      });
      handleLoading(true);
      setTimeout(async () => {
        await handleUpdateOrderDrag(data);
        handleLoading(false);
        setOnDrag({ draggableId: null });
      }, 200);
    }
  };

  const handleOnDragUpdate = (result) => {
    setOnDrag({ draggableId: result.draggableId });
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragUpdate={handleOnDragUpdate}
    >
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="border-2 border-dashed rounded-lg p-2 overflow-y-auto h-[80vh]"
          >
            {loading ? (
              <div className="flex justify-center h-full items-center">
                <Spinner />
              </div>
            ) : (
              items.map((item, index) => (
                <Draggable
                  key={item.order}
                  draggableId={item.order?.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div className="relative">
                      <li
                        className={`rounded-lg flex items-center justify-between border-2 border-purple-500/50 ${
                          onDrag.draggableId !== null
                            ? onDrag.draggableId === item.order?.toString()
                              ? "bg-gray-800 bg-blend-multiply text-white"
                              : "bg-gray-200 bg-blend-multiply"
                            : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "10px",
                          margin: "4px 0",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <span className="flex flex-col w-full space-y-1">
                          <span className="font-semibold">
                            <span className="font-bold">{item.order}. </span>
                            <span className="text-lg">{item.name}</span>
                          </span>
                          <span className="text-xs font-semibold text-gray-400">{item.description}</span>
                          <span className="text-xs">
                            {new Date(item.createdAt).toDateString()}
                          </span>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleOption(index)}
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
                            class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </span>
                      </li>
                      {dropdown.condtion && dropdown.id === index && (
                        <DropdownList
                          handleDetail={() => handleOnDrawer(item.id)}
                          handleEditItem={() => handleEditItem(item)}
                          handleDeleteItem={(e) => handleDeleteItem(item.id, e)}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
