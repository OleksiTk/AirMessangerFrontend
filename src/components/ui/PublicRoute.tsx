// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { useEffect, useState } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.checkAuth();
        console.log(response);

        // Перевіряємо чи відповідь успішна
        if (response.checkAuth === "ok") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Якщо токен є, перенаправляємо на головну сторінку
  if (isAuthenticated) {
    return <Navigate to="/chats" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
