import { useRef } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import "./login.css";

export default function Login() {
    const navigate = useNavigate();

    const name = useRef();
    if (localStorage.getItem("name")) {
        return <Navigate to="/chat" replace={true} />
    }


    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('name', name.current.value.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()))
        navigate("/chat");
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">TestchatS</h3>
                    <span className="loginDesc">
                        Conectate con tus amigos de diferentes partes del mundo y disfruta de una gran experiencia con TestchatS.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Nombre de Usuario"
                            type="text"
                            required
                            className="loginInput"
                            ref={name}
                        />

                        <button className="loginButton" type="submit" >
                            "Ir al Chat"
                        </button>
                        <span className="loginForgot">Quieres unirte al chat?</span>
                        <span className="loginForgot">Ingresa colocando un nombre de Usuario...</span>
                    </form>
                </div>
            </div>
        </div>
    );
}
