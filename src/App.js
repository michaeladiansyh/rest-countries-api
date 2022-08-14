import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import CountryPage from "./pages/CountryPage/CountryPage";
import { CountryContextProvider } from "./context/CountryContext";

function App() {
  return (
    <Router>
      <CountryContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/country/:name" element={<CountryPage />} />
        </Routes>
      </CountryContextProvider>
    </Router>
  );
}

export default App;
