import React, { useState, useEffect, useRef } from "react";
import socket from "../socket/Socket";
const Chat = ({ name }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("connected", name);
  }, [name]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, { ...message, receiverId: socket.id }]);
    });


  }, [messages]);

  const ReceiverStyle = {
    padding: '2px 7px',
    width: 'maxContent',
    maxWidth: '40%',
    backgroundColor: 'rgb(186, 213, 231)',
    border: 'none',
    textAlign: 'left',
    borderRadius: '0px 200px 200px 200px',
    border: '0px dotted #000000',
    boxShadow: '2px 5px 6px - 1px rgb(0 0 0 / 20 %), 6px 3px 14px 2px rgb(0 0 0 / 12 %), 0px 5px 5px - 3px rgb(0 0 0 / 20 %)',
  }
  const senderStyle = {
    padding: '2px 7px',
    width: 'maxContent',
    maxWidth: '40%',
    backgroundColor: 'rgb(120, 199, 245)',
    border: 'none',
    textAlign: 'right',
    borderRadius: ' 200px 200px 200px 0px',
    boxShadow: '2px 5px 6px - 1px rgb(0 0 0 / 20 %), 6px 3px 14px 2px rgb(0 0 0 / 12 %), 0px 5px 5px - 3px rgb(0 0 0 / 20 %)',
  }
  const divRef = useRef(null);
  const textarea = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
    textarea.current.focus();
  });

  const submit = (e) => {
    e.preventDefault();

    socket.emit("message", name, message);
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((el, i) => (
          <div style={{ textAlign: el.senderId === el.receiverId ? 'right' : 'left', margin: '8px 2px' }} key={i}>
            <span className={el.senderId === el.receiverId ? 'right' : 'left'}>{el.name + ':' + el.message}</span>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form action="#" onSubmit={submit} className='submit'>
        <label htmlFor="">Introduce texto del mensaje...</label>
        <textarea
          autoFocus
          ref={textarea}
          name=""
          id=""
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div style={{ width: '100%' }}>
          <button className="btn1" disabled={message ? false : true}>Enviar</button>
          <button className="btn2" disabled={message ? false : true} type="reset" onClick={() => {
            setMessage('')
            textarea.current.focus();
          }}>Borrar</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;