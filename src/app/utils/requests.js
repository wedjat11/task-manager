export async function useLogin(email) {
  try {
    const response = await fetch("https://reqres.in/api/login", {
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
