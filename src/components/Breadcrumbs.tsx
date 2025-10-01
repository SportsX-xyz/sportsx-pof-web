import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  dashboard: "AI-powered Sports Dashboard",
  profile: "Your Proof of Fandom Profile",
  leaderboard: "Top Fan Rankings",
  predictions: "Sports Prediction Markets",
  about: "About SportsX",
  admin: "Admin Dashboard"
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  if (pathSegments.length === 0) return null;
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" }
  ];
  
  pathSegments.forEach((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const href = isLast ? undefined : "/" + pathSegments.slice(0, index + 1).join("/");
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({ label, href });
  });

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            {index === 0 && <Home className="h-4 w-4 mr-1" />}
            {crumb.href ? (
              <Link 
                to={crumb.href} 
                className="hover:text-primary transition-colors"
                aria-label={`Navigate to ${crumb.label}`}
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}