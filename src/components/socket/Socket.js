import io from "socket.io-client";

let socket = io("http://localhost:5500/");

export default socket;