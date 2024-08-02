import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { ROUTES } from "./router";
import { Detail } from "@/pages/Detail";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.detail + "/:id"} element={<Detail />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
