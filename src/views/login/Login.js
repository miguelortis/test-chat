import { useContext, useRef } from "react";
import { Context } from '../../components/contexts/Context'
import { useNavigate } from 'react-router-dom'
import "./login.css";
// import { CircularProgress } from "@material-ui/core";

export default function Login() {
    const navigate = useNavigate();
    const {
        state: { currentUser },
        dispatch,
    } = useContext(Context)

    const name = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('name', name.current.value.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()))
        navigate("/chat");
        // loginCall(
        //     { email: email.current.value, password: password.current.value },
        //     dispatch
        // );
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
