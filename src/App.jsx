import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonList } from "@/pages/PokemonList";
import { PokemonDetail } from "@/pages/PokemonDetail";
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
        <Route path={ROUTES.pokemonList} element={<PokemonList />} />
        <Route path={ROUTES.pokemonDetail + "/:id"} element={<PokemonDetail />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
