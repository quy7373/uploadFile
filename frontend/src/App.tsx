import { Routes, Route } from "react-router-dom";
import CVAnalyzer from "./pages/CVAnalyzer";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CVAnalyzer />} />
    </Routes>
  );
}

export default App;
