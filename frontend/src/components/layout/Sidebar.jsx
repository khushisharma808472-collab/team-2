import {
  LayoutDashboard,
  FolderKanban,
  Map,
  HardHat,
  Package,
  Users,
  ShoppingCart,
  FileBarChart,
  ChartNoAxesCombined,
  Bell,
  Settings,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    section: "MAIN",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
      {
        name: "Projects",
        icon: FolderKanban,
        path: "/admin/projects",
      },
      {
        name: "Site Progress",
        icon: Map,
        path: "/admin/site-progress",
      },
    ],
  },

  {
    section: "MANAGEMENT",
    items: [
      {
        name: "Resources",
        icon: HardHat,
        path: "/admin/resources",
      },
      {
        name: "Inventory",
        icon: Package,
        path: "/admin/inventory",
      },
      {
        name: "Workforce",
        icon: Users,
        path: "/admin/workforce",
      },
      {
        name: "Procurement",
        icon: ShoppingCart,
        path: "/admin/procurement",
      },
    ],
  },

  {
    section: "INSIGHTS",
    items: [
      {
        name: "Reports",
        icon: FileBarChart,
        path: "/admin/reports",
      },
      {
        name: "Analytics",
        icon: ChartNoAxesCombined,
        path: "/admin/analytics",
      },
      {
        name: "Notifications",
        icon: Bell,
        path: "/admin/notifications",
      },
    ],
  },

  {
    section: "SYSTEM",
    items: [
      {
        name: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <h2>BUILDTRACK</h2>
        <span>PROJECT MANAGEMENT</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        {menuItems.map((group) => (

          <div className="menu-group" key={group.section}>

            <p className="menu-title">
              {group.section}
            </p>

            {group.items.map((item) => {

              const Icon = item.icon;

              // Current active page check
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  className={`menu-item ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />

                  <span>{item.name}</span>

                </button>
              );
            })}

          </div>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;