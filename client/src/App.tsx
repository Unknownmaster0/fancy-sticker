import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/Header";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {navigation.state === "loading" ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <div className="ml-4 text-lg text-text-light-muted dark:text-text-muted">
            Loading... 🫨🫨🫨
          </div>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}

export default App;
