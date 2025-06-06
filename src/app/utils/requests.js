export async function useLogin(email) {
  try {
    const clientKey = Math.random().toString(36).slice(2);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, clientKey }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Login failed");
      throw new Error(errorData.error || "Login failed");
    }

    const { encrypted } = await response.json();

    // Guardar el token y el email del usuario
    localStorage.setItem("auth-token", encrypted);
    localStorage.setItem("user-email", email);

    // Inicializar estructura de árbol para tasks si no existe
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    if (!allTasks[email]) {
      allTasks[email] = {
        // Nodo raíz del árbol
        root: {
          id: "root",
          type: "root",
          children: [], // Aquí irán los IDs de las tareas principales
          depth: 0,
        },
        // Diccionario de nodos (tareas)
        nodes: {
          /*
          Ejemplo de estructura:
          "task1": {
            id: "task1",
            title: "Tarea principal",
            completed: false,
            children: ["subtask1", "subtask2"],
            parent: "root",
            depth: 1
          }
          */
        },
      };
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }

    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

export async function useLogout() {
  try {
    const response = await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.redirected) {
      window.location.href = response.url;
    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout failed:", error);
    window.location.href = "/login";
  }
}

export async function createUser(email) {
  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "x-api-key": "reqres-free-v1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: "anypassword",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Login failed");
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}
