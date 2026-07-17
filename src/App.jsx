import React, { useState }from 'react'
import Header from './components/Header.jsx'
import ChatMessage from './components/ChatMessage.jsx';
import {formatTime , getRandomResponse}  from '../utils/chatUtils.js'
import LoadingIndicator from './components/LoadingIndicator.jsx';
import ChatInput from './components/ChatInput.jsx';
import { generateContent } from "./Services/geminiApi.js"
function App(){
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([
    {
    id:1,
    text:"Hello,how can I help you?",
    sender:"bot",
    timestamp: new Date(),
  },
]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = () => {
    const userMessage = {
      id: Date.now().toString(),
      text:input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateContent(input),
        sender: "bot",
        timestamp: new Date(),

      }
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);


    }, 1500 )
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <div className='flex-1 overflow-y-auto p-4 md:p-6'>
        <div className='max-w-5xl mx-auto space-y-4'>
          {messages.map((message) => {
            return (
              <ChatMessage
              key={message.id}
              darkMode={darkMode}
              messages={message}
              formatTime={formatTime}

              />
               );
          })}
              {isLoading && <LoadingIndicator darkMode={darkMode}/>}
              </div>
      </div>
      <ChatInput darkMode={darkMode} 
      input={input}
       setInput={setInput}
        loading={isLoading} 
      handleSendMessage={handleSendMessage}
      />

    </div>
  );
}

export default App;