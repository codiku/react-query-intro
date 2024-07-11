import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Profil } from "@/pages/Profil";
import { ROUTES } from "./router";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "@/api/auth-api";

export function App() {

  useQuery({
    queryKey: ["user"],
    queryFn: AuthAPI.login,
    staleTime: Infinity
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.profil} element={<Profil />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
