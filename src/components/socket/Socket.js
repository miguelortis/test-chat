import io from "socket.io-client";

let socket = io("//localhost:5500");

export default socket;