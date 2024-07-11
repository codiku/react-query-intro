import { PokemonDetail } from "@/pages/PokemonDetail/PokemonDetail";
import { PokemonList } from "@/pages/PokemonList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./router";

export function App() {


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
