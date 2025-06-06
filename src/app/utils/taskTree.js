// utils/taskTree.js

// Función para agregar una nueva tarea
export const addTaskToTree = (title, parentId = "root") => {
  const email = localStorage.getItem("user-email");
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  const userTasks = allTasks[email] || {
    root: { id: "root", children: [] },
    nodes: {},
  };

  const newTaskId = `task-${Date.now()}`;
  const parentNode =
    parentId === "root" ? userTasks.root : userTasks.nodes[parentId];
  const depth = parentId === "root" ? 1 : userTasks.nodes[parentId].depth + 1;

  // Crear nuevo nodo
  userTasks.nodes[newTaskId] = {
    id: newTaskId,
    title,
    completed: false,
    children: [],
    parent: parentId,
    depth,
    createdAt: new Date().toISOString(),
  };

  // Agregar a los hijos del padre
  parentNode.children.push(newTaskId);

  // Guardar cambios
  allTasks[email] = userTasks;
  localStorage.setItem("tasks", JSON.stringify(allTasks));

  return newTaskId;
};

// Función para obtener todas las tareas de un usuario
export const getUserTaskTree = () => {
  const email = localStorage.getItem("user-email");
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  return allTasks[email] || { root: { id: "root", children: [] }, nodes: {} };
};

// Función para eliminar una tarea (y sus sub-tareas recursivamente)
export const deleteTaskFromTree = (taskId) => {
  const email = localStorage.getItem("user-email");
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
  const userTasks = allTasks[email];

  if (!userTasks || !userTasks.nodes[taskId]) return;

  // Función recursiva para eliminar
  const deleteRecursive = (id) => {
    const node = userTasks.nodes[id];

    // Primero eliminar todos los hijos
    node.children.forEach((childId) => deleteRecursive(childId));

    // Eliminar de los hijos del padre
    const parent =
      node.parent === "root" ? userTasks.root : userTasks.nodes[node.parent];
    parent.children = parent.children.filter((childId) => childId !== id);

    // Eliminar el nodo
    delete userTasks.nodes[id];
  };

  deleteRecursive(taskId);

  // Guardar cambios
  allTasks[email] = userTasks;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
};
