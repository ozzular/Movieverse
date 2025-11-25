import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatBreadcrumb = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 px-4 ml-20">
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors hover-scale"
      >
        <Home className="w-4 h-4" />
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const isNumeric = /^\d+$/.test(name);

        if (isNumeric) return null;

        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-foreground font-medium">
                {formatBreadcrumb(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-foreground transition-colors hover-scale"
              >
                {formatBreadcrumb(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
