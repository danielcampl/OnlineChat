import React, { useRef, useState, useEffect } from 'react';
import style from './Chat.module.css';

export default function Chat({ socket }) {
    const messageRef = useRef();
    const scrollRef = useRef();
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data]);
        });
        return () => socket.off('receive_message');
    }, [socket]);

    useEffect(() => {
        scrollDown()
    }, [messageList]);

    const clear = () => {
        messageRef.current.value = '';
    }

    const focusInput = () => {
        messageRef.current.focus();
    }

    const getEnter = (e) => {
        if (e.key === 'Enter')
            handleMessage();
    }

    const scrollDown = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleMessage = () => {
        const message = messageRef.current.value;
        if (!message.trim()) return
        socket.emit('message', message);
        clear();
        focusInput();
    }

    return (
        <div>
            <div className={style['chat-container']}>
                <div className={style["chat-body"]}>
                    {
                        messageList.map((message, index) => (
                            <div className={`${style["message-container"]} ${message.authorId === socket.id && style["message-mine"]}`} key={index}>
                                <div className="message-author"><strong>{message.author}</strong></div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))
                    }
                    <div ref={scrollRef} />
                </div>
                <div className={style["chat-footer"]}>
                    <input className={style["chat-input"]} ref={messageRef} placeholder='Mensagem' onKeyDown={(e) => getEnter(e)} />
                    <button className={style["submit-button"]} onClick={() => handleMessage()}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
