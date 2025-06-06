import React from "react";
import { useLogout } from "@/app/utils/requests";

const LogoutButton = () => {
  const handleLogout = async () => {
    await useLogout();
  };
  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer text-sm lg:text-md bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all duration-200"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
