import {
  Play,
  Tv,
  Settings,
  TrendingUp,
  Home,
  Users,
  Bookmark,
  Award,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebarContext } from "./FixedSidebarLayout";
import { useLayoutContext } from "./Layout";

const navItems = [
  { icon: Home, path: "/", label: "Home" },
  { icon: Play, path: "/movies", label: "Movies" },
  { icon: Tv, path: "/series", label: "Series" },
  { icon: TrendingUp, path: "/trending", label: "Trending" },
  { icon: Users, path: "/actors", label: "Actors" },
  { icon: Award, path: "/awards", label: "Awards" },
  { icon: Bookmark, path: "/watchlist", label: "Watchlist" },
  { icon: Settings, path: "/settings", label: "Settings" },
];

export const Sidebar = () => {
  const { toggleSidebar } = useSidebarContext();
  const { isPlaying } = useLayoutContext();
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-sidebar/95 text-sidebar-foreground">
      {/* Header with close button - removed border */}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-sidebar-accent rounded-md transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground"
                    } justify-start ${index === 0 ? 'mt-8' : ''}`
                  }
                  onClick={() => {
                    // Close sidebar on mobile when navigation item is clicked
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>
  );
};
