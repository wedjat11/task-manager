import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request) {
  const { email, clientKey } = await request.json();

  // 1. Validación de clave dinámica
  if (!clientKey || clientKey.length < 5) {
    return new Response(JSON.stringify({ error: "Clave inválida" }), {
      status: 400,
    });
  }

  // 2. Simular latencia aleatoria entre 500ms y 2000ms
  const latency = Math.floor(Math.random() * 1500) + 500;
  await new Promise((resolve) => setTimeout(resolve, latency));

  // 3. Petición real a la API de ReqRes
  const loginRes = await fetch("https://reqres.in/api/login", {
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

  if (!loginRes.ok) {
    const errorData = await loginRes.json();
    return new Response(JSON.stringify({ error: errorData.error }), {
      status: 401,
    });
  }

  const { token } = await loginRes.json();

  // 4. Obtener nombre del email
  const usernamePart = email.split("@")[0];
  const [firstName, lastName] = usernamePart
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  const fullName = `${firstName} ${lastName}`;

  // 5. Guardar en cookies
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    secure: true,
    sameSite: "lax",
  });

  cookieStore.set("user-name", fullName, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  // 6. Encriptar token para localStorage (frontend)
  const secret = process.env.SECRET_KEY || "clave-secreta-123456";
  const key = crypto.createHash("sha256").update(secret).digest();
  const iv = Buffer.alloc(16, 0); // vector de inicialización fijo (simple)
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  const encryptedToken =
    cipher.update(token, "utf8", "hex") + cipher.final("hex");

  // 7. Devolver token encriptado para localStorage
  return new Response(
    JSON.stringify({ success: true, encrypted: encryptedToken }),
    {
      status: 200,
    }
  );
}
