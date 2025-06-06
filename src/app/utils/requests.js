// src/app/utils/requests.js
export async function useLogin(email) {
  try {
    // 1. Generar clave dinámica (puede usarse también como challenge simulada)
    const clientKey = Math.random().toString(36).slice(2); // clave pseudoaleatoria

    // 2. Enviar email y clave al backend
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

    // 3. Obtener el token encriptado (simulado desde el backend)
    const { encrypted } = await response.json();

    // 4. Guardar el token encriptado en localStorage
    localStorage.setItem("auth-token", encrypted);

    // 5. Redirigir
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
      credentials: "include", // Necesario para cookies HTTP-only
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
