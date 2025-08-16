import { DetailPage } from "@/pages/DetailPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "../components/layouts/auth/AuthLayout";
import { MainLayout } from "../components/layouts/mainLayout/MainLayout";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import { CharactersPage } from "../pages/CharactersPage";
import { LoginPage } from "../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => !!state.user?.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            index
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<CharactersPage />} />
          <Route path="/character/:id" element={<DetailPage />} />
          <Route path="/character/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
