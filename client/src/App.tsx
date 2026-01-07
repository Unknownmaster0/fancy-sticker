import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
