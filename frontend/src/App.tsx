import { Routes, Route } from "react-router-dom";
import CVAnalyzerPage from "./pages/CVAnalyzerPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CVAnalyzerPage />} />
    </Routes>
  );
}

export default App;
