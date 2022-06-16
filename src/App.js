import React, { useState } from "react";
import Chat from "./components/chat/Chat";
import "./App.css";
import { Header } from "./components/header/Header";
import { GetUsers } from "./components/getUsers/getUsers";
import Footer from "./components/footer/Footer";

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
      <Header />
      {!register && (
        <div className="register">
          <form onSubmit={handleRegister}>
            <label htmlFor="">Introduzca su nombre</label>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} />
            <button>Ir al chat</button>
          </form>
        </div>
      )}

      {register && <GetUsers />}
      {register && <Chat name={name} />}
      <Footer />
    </div>

  );
}

export default App;