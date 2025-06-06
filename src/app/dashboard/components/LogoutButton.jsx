import { useLogout } from "@/app/utils/requests";

function UserMenu() {
  const handleLogout = async () => {
    await useLogout();
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 text-sm transition-all cursor-pointer"
    >
      Logout
    </button>
  );
}

export default UserMenu;
