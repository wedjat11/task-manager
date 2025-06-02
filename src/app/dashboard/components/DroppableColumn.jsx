// DroppableColumn.jsx
"use client";

import { useDroppable } from "@dnd-kit/core";

export default function DroppableColumn({ id, children }) {
  const { setNodeRef } = useDroppable({
    id, // this must be column name like "To Do"
  });

  return (
    <div ref={setNodeRef} className="min-w-[300px] flex-1">
      {children}
    </div>
  );
}
