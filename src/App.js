import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./views/login/Login";
import { ContextProvider } from './components/contexts/Context'
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Page404 from "./views/page404/Page404";

function App() {
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (name !== "") {
      setRegister(true);
    }
  };

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
          {/* <Route exact path="*" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
        </Routes>
        <Footer />
      </ContextProvider>
    </div>

  );
}

export default App;