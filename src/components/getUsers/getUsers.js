import React, { useState, useEffect } from "react";
import socket from "../socket/Socket";
export function GetUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("getUsers", (users) => {
            setUsers(users);
        });
    }, [users]);
    return (

        <div className="users">
            <h4>Usuarios conectados</h4>
            <span style={{ margin: '-10px auto', textTransform: 'uppercase' }}>({users.map(el => { if (el.socketId === socket.id) return el.name })})</span>
            <hr style={{ width: '100%' }} />
            <ul>

                {users.map((el, i) => (
                    el.socketId !== socket.id &&
                    <li key={i}>
                        <div>{el.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}