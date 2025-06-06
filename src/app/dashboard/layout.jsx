"use client";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const name = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user-name="))
      ?.split("=")[1];

    if (name) {
      setUserName(decodeURIComponent(name));
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white p-4 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">Task Manager</h2>
        <nav>
          <ul className="space-y-2">
            <li>📋 Tableros</li>
            <li>👥 Mi equipo</li>
            <li>⚙️ Configuración</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
          {userName !== null && (
            <p className="text-gray-600 text-sm sm:text-base">
              👋 Hola, <strong>{userName}</strong>
            </p>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
