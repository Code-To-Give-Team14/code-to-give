import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { FaRobot } from 'react-icons/fa';
import ActionProvider from './ActionProvider';
import config from './config.jsx';
import MessageParser from './MessageParser';
import './styles/index.css';

export const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const handleChatbotToggle = () => {
        setShowChatbot((prevState) => !prevState);
    };

    const saveMessages = (messages, HTMLString) => {
        sessionStorage.setItem('chat_messages', JSON.stringify(messages));
    };

    const loadMessages = () => {
        const messages = JSON.parse(sessionStorage.getItem('chat_messages'));
        return messages;
    };

    return (
        <>
            {showChatbot &&
                <div>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        headerText='Chatbot'
                        placeholderText='Type a message...'
                        saveMessages={saveMessages}
                        messageHistory={loadMessages()}
                    />
                </div>
            }
            <div className='chatbot-icon-container'>
                <FaRobot
                    className='chatbot-icon'
                    onClick={handleChatbotToggle}
                />
            </div>
        </>
    );
};