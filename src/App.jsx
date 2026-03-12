import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImpactForm from "./components/ImpactForm";
import ImpactResult from "./components/ImpactResult";
import ImpactTerms from "./components/ImpactTerms";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <Router>
      <div className="app-container">
        {/* Header with navigation */}
        <Header />

        {/* Main content */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ImpactForm setResult={setResult} />} />
            <Route path="/result" element={<ImpactResult result={result} />} />
          </Routes>
        </main>

        {/* Footer with ImpactTerms accordion */}
        <footer className="app-footer">
          <ImpactTerms />
        </footer>
      </div>
    </Router>
  );
}

export default App;
