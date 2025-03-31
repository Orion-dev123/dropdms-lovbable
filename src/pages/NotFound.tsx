
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-hidden">
      <div className="text-center p-6">
        <div className="text-6xl font-bold text-muted-foreground">404</div>
        <p className="mt-4 text-xl">The page you are looking for doesn't exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 bg-yellow text-primary-foreground rounded-md">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
