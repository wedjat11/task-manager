"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-gray-100 p-3 rounded-md flex flex-col gap-1 shadow-sm border cursor-move"
    >
      <h3 className="text-sm font-semibold">{task.title}</h3>
      <p className="text-xs text-gray-600">{task.description}</p>
    </div>
  );
}
