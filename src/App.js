import { BrowserRouter, Route, Routes } from "react-router-dom";
import MOMOFetch from "./MOMOFetch";
import VCBFetch from "./VCBFetch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VCBFetch />} />
        <Route path="/MOMOFetch" element={<MOMOFetch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;