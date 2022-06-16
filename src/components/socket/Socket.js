import io from "socket.io-client";

let socket = io("https://servidor-chattest.herokuapp.com/");

export default socket;