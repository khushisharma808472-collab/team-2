import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchUnreadCount = async () => {
      try {
        const response = await api.get("/notifications/unread-count");
        if (mounted && response.data.success) {
          setUnreadCount(response.data.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
      }
    };

    fetchUnreadCount();

    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Read stored user from localStorage or sessionStorage
  const getParsedUser = () => {
    try {
      const stored =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };
  const parsedUser = getParsedUser();

  // Determine active route context defaults
  let pageRole = "admin";
  let defaultName = "Admin User";
  let defaultEmail = "admin@buildtrack.com";
  let defaultInitials = "AD";

  if (location.pathname.startsWith("/site-engineer")) {
    pageRole = "site_engineer";
    defaultName = "Site Engineer";
    defaultEmail = "site.engineer@buildtrack.com";
    defaultInitials = "SE";
  } else if (location.pathname.startsWith("/contractor")) {
    pageRole = "contractor";
    defaultName = "Contractor";
    defaultEmail = "contractor@buildtrack.com";
    defaultInitials = "CO";
  } else if (location.pathname.startsWith("/project-manager")) {
    pageRole = "project_manager";
    defaultName = "Project Manager";
    defaultEmail = "project.manager@buildtrack.com";
    defaultInitials = "PM";
  } else if (location.pathname.startsWith("/client")) {
    pageRole = "client";
    defaultName = "Client";
    defaultEmail = "client@buildtrack.com";
    defaultInitials = "CL";
  } else if (location.pathname.startsWith("/worker")) {
    pageRole = "worker";
    defaultName = "Site Worker";
    defaultEmail = "worker@buildtrack.com";
    defaultInitials = "WO";
  } else if (location.pathname.startsWith("/admin")) {
    pageRole = "admin";
    defaultName = "Admin User";
    defaultEmail = "admin@buildtrack.com";
    defaultInitials = "AD";
  }

  // Format role string (e.g. site_engineer -> Site Engineer)
  const formatRole = (r) => {
    if (!r) return "User";
    return r
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // Get user's initials
  const getInitials = (name, fallback = "AD") => {
    if (!name) return fallback;
    const names = name.trim().split(/\s+/);
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (
      names[0].charAt(0) +
      names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // If the logged-in user matches the current page role, use their credentials;
  // otherwise fallback to the current dashboard's role persona
  const hasMatchingRole = parsedUser && parsedUser.role === pageRole;
  const displayName = hasMatchingRole ? (parsedUser.name || defaultName) : (parsedUser?.name || defaultName);
  const displayRole = formatRole(hasMatchingRole ? parsedUser.role : pageRole);
  const displayEmail = hasMatchingRole ? (parsedUser.email || defaultEmail) : (parsedUser?.email || defaultEmail);
  const displayInitials = getInitials(displayName, defaultInitials);
  const activeRoleClass = hasMatchingRole ? (parsedUser.role || pageRole) : pageRole;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
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
          <h2>{title || `${displayRole} Dashboard`}</h2>
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
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}
        </button>

        {/* USER PROFILE */}
        <div
          className="admin-profile-container profile-container"
          ref={dropdownRef}
        >
          <button
            className="admin-profile"
            onClick={() =>
              setShowDropdown(!showDropdown)
            }
          >
            {/* USER INITIALS */}
            <div className={`profile-avatar role-${activeRoleClass}`}>
              {displayInitials}
            </div>

            {/* USER INFO */}
            <div className="profile-info">
              <strong>{displayName}</strong>
              <span>{displayRole}</span>
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
                <div className={`dropdown-avatar role-${activeRoleClass}`}>
                  {displayInitials}
                </div>

                <div>
                  <strong>{displayName}</strong>
                  <span>{displayEmail}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              {/* PROFILE BUTTON */}
              <button
                className="dropdown-item"
                onClick={() =>
                  alert("Profile settings coming soon!")
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