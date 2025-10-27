import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
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

  // Поки перевіряємо автентифікацію - показуємо завантаження
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Якщо не автентифікований - редірект на логін
  if (!isAuthenticated) {
    return <Navigate to="/registrationStep1" replace />;
  }

  // Якщо все ОК - показуємо контент
  return <>{children}</>;
};

export default ProtectedRoute;
