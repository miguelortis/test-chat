import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./views/login/Login";
import { ContextProvider } from './components/contexts/Context'
import PrivateRoute from "./components/privateRoute/PrivateRoute";
function App() {

  return (
    <div className="App">
      <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat"
            element={<PrivateRoute />}
          />
        </Routes>
        <Footer />
      </ContextProvider>
    </div>

  );
}

export default App;