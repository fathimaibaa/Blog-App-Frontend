import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login", { replace: true }); // Redirect to the login page
  };

  return (
    <div className="w-full h-[5rem] bg-green-700 flex justify-between items-center px-8 fixed inset-0 z-40">
      {/* Navigation Links */}
      <div className="text-white flex gap-[2rem]">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/add-blog"}>Add Blog</NavLink>
        <NavLink to={"/myblogs"}>Profile</NavLink>
      </div>
      {/* Logout Button (Visible only if user is logged in) */}
      {user && (
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
