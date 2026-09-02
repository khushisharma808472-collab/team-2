import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  // Get logged-in user from localStorage or sessionStorage
  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  // Get user's initials
  const getInitials = (name) => {
    if (!name) return "AD";

    const names = name.trim().split(" ");

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) +
      names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Format role
  const formatRole = (role) => {
    if (!role) return "Administrator";

    return role
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  // Logout
  const handleLogout = () => {
    // Remove local storage data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove session storage data
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // Redirect to login
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="dashboard-header">

      {/* LEFT SIDE */}

      <div className="header-left">

        <button className="menu-button">
          <Menu size={21} />
        </button>

        <div>
          <h2>Administrator Dashboard</h2>
        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="header-right">

        {/* SEARCH */}

        <div className="search-box">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search anything..."
          />

        </div>


        {/* NOTIFICATIONS */}

        <button
          className="notification-button"
          title="Notifications"
        >

          <Bell size={20} />

          <span className="notification-badge">
            3
          </span>

        </button>


        {/* USER PROFILE */}

        <div className="admin-profile-container">

          <button
            className="admin-profile"
            onClick={() =>
              setShowDropdown(!showDropdown)
            }
          >

            {/* USER INITIALS */}

            <div className="profile-avatar">

              {getInitials(user?.name)}

            </div>


            {/* USER INFO */}

            <div className="profile-info">

              <strong>
                {user?.name || "Admin User"}
              </strong>

              <span>
                {formatRole(user?.role)}
              </span>

            </div>


            <ChevronDown
              size={16}
              className={
                showDropdown
                  ? "dropdown-arrow rotate"
                  : "dropdown-arrow"
              }
            />

          </button>


          {/* DROPDOWN */}

          {showDropdown && (

            <div className="profile-dropdown">

              <div className="dropdown-user-info">

                <div className="dropdown-avatar">

                  {getInitials(user?.name)}

                </div>


                <div>

                  <strong>
                    {user?.name || "Admin User"}
                  </strong>

                  <span>
                    {user?.email || ""}
                  </span>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              {/* PROFILE BUTTON */}

              <button
                className="dropdown-item"
                onClick={() =>
                  alert("Profile page coming soon!")
                }
              >

                <User size={17} />

                My Profile

              </button>


              {/* LOGOUT */}

              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >

                <LogOut size={17} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Header;