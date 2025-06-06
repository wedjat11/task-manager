// GET /api/tasks - Obtener tasks del usuario actual
export async function GET(request) {
  const session = await getSession();
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const tasks = await Task.find({ userEmail: session.user.email });
  return new Response(JSON.stringify(tasks));
}

// POST /api/tasks - Crear nueva task para el usuario actual
export async function POST(request) {
  const session = await getSession();
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { title } = await request.json();
  const newTask = await Task.create({
    title,
    userEmail: session.user.email,
    completed: false,
  });

  return new Response(JSON.stringify(newTask));
}
