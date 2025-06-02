"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import crypto from "crypto-js";

export default function AgregarTareaModal({
  open,
  onClose,
  estado,
  tasks,
  setTasks,
}) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = decodeURIComponent(
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("user-name="))
      ?.split("=")[1] || ""
  );

  useEffect(() => {
    if (!open) {
      setNombre("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  const handleAdd = async () => {
    const name = nombre.trim();

    if (!name) {
      setError("El nombre no puede estar vacío");
      return;
    }

    const regex = /^[\w\sáéíóúÁÉÍÓÚñÑ.,:;!¡¿?"'()-]+$/;
    if (!regex.test(name)) {
      setError("Caracteres inválidos");
      return;
    }

    const all = Object.values(tasks).flatMap((group) => Object.values(group));
    const duplicate = all.find(
      (t) => t.title.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      setError("Ya existe una tarea con ese nombre");
      return;
    }

    setLoading(true);

    const base = `${Date.now()}-${user}-${name}`;
    const id = crypto.SHA256(base).toString();

    // Simula retardo aleatorio
    await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));

    const nueva = {
      id,
      title: name,
      estado,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      [estado]: {
        ...prev[estado],
        [id]: nueva,
      },
    }));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-4">
            Agregar Tarea a "{estado}"
          </Dialog.Title>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el nombre..."
            className="w-full border rounded p-2 text-sm mb-2"
          />
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Agregando..." : "Agregar"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
