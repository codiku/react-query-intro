import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { PokemonDetail } from "@/pages/PokemonDetail"
import { ROUTES } from "@/router";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.detail + "/:id"} element={<PokemonDetail />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
