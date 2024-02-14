import React, { useRef } from 'react';
import io from 'socket.io-client';

export default function Join({ setChatVisible, setSocket }) {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if (!username.trim()) return
    const socket = await io.connect(
      // 'http://localhost:3001'
      'https://online-chat-backend-five.vercel.app'
      );
    socket.emit('set_username', username);
    setSocket(socket);
    setChatVisible(true);
  }

  return (
    <div className='login-form'>
      <h1>Logar</h1>
      <span>Digite seu nome:</span>
      <input className='login-input' type="text" ref={usernameRef} placeholder='Nome de usuario' />
      <button onClick={() => handleSubmit()}>Entrar</button>
    </div>
  )
}
