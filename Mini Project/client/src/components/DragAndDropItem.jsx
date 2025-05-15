import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DropdownList from "./DropdownList";

export default function DragAndDropItem({
  initialItems: items,
  dropdown,
  handleOption,
  handleUpdateOrderDrag,
  handleEditItem,
  handleDeleteItem,
}) {
  const handleOnDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    await handleUpdateOrderDrag(
      newItems.map((item, index) => {
        item.order = index + 1;
        return item;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="border-2 border-dashed rounded-lg p-2 overflow-y-auto h-[80vh]"
          >
            {items.map((item, index) => (
              <Draggable
                key={item.order}
                draggableId={item.order?.toString()}
                index={index}
              >
                {(provided) => (
                  <div className="relative">
                    <li
                      className={`border rounded-lg flex items-center justify-between border-2 border-purple-500/50`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "10px",
                        margin: "4px 0",
                        backgroundColor: "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.name}
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
                        handleEditItem={() => handleEditItem(item)}
                        handleDeleteItem={(e) => handleDeleteItem(item.id, e)}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
