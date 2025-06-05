"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";

const initialData = {
  "To Do": {},
  "In Progress": {},
  Done: {},
};

// 1. Función para detectar elementos interactivos
function isInteractiveElement(element) {
  const interactiveElements = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
    "a",
    "label",
  ];

  const tagName = element.tagName.toLowerCase();

  // Verificar por tagName
  if (interactiveElements.includes(tagName)) {
    return true;
  }

  // Verificar por contentEditable
  if (element.contentEditable === "true") {
    return true;
  }

  // Verificar por atributo data-no-drag
  if (element.closest("[data-no-drag]")) {
    return true;
  }

  return false;
}

// 2. Sensor personalizado para mouse
class CustomPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown",
      handler: ({ nativeEvent: event }) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

// 3. Sensor personalizado para touch
class CustomTouchSensor extends TouchSensor {
  static activators = [
    {
      eventName: "onTouchStart",
      handler: ({ nativeEvent: event }) => {
        const { touches } = event;
        if (touches.length > 1) {
          return false;
        }

        if (isInteractiveElement(event.target)) {
          return false;
        }

        return true;
      },
    },
  ];
}

export default function DashboardBoard() {
  const [tasks, setTasks] = useState(initialData);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 4. Configurar sensores personalizados
  const sensors = useSensors(
    useSensor(CustomPointerSensor),
    useSensor(CustomTouchSensor)
  );

  const handleDragStart = ({ active }) => {
    const activeId = active.id;

    for (const column of Object.values(tasks)) {
      if (column[activeId]) {
        setActiveTask(column[activeId]);
        break;
      }
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);

    if (!active || !over) return;

    const activeId = active.id;
    const overColumn = over.id;

    let fromColumn = null;
    for (const key in tasks) {
      if (tasks[key][activeId]) {
        fromColumn = key;
        break;
      }
    }

    if (!fromColumn || fromColumn === overColumn) return;

    const task = tasks[fromColumn][activeId];
    const updatedFrom = { ...tasks[fromColumn] };
    delete updatedFrom[activeId];

    const updatedTo = {
      ...tasks[overColumn],
      [activeId]: { ...task, state: overColumn },
    };

    setTasks({
      ...tasks,
      [fromColumn]: updatedFrom,
      [overColumn]: updatedTo,
    });
  };

  return (
    <DndContext
      sensors={sensors} // 5. Usar los sensores personalizados
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 overflow-x-auto h-full">
        {Object.entries(tasks).map(([state, group]) => (
          <TaskColumn
            key={state}
            state={state}
            tasks={group}
            setTasks={setTasks}
            allTasks={tasks}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div
            className="w-[250px] max-w-xs bg-white rounded-md shadow-md border p-3 pointer-events-none"
            style={{
              fontSize: "14px",
              lineHeight: "1.4",
              boxSizing: "border-box",
            }}
          >
            <p className="font-medium text-gray-800 truncate">
              {activeTask.title}
            </p>
            <p className="text-sm text-gray-500 mt-1 break-words line-clamp-3">
              {activeTask.description}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
