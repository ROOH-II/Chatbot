import React from 'react'
import { User, Bot } from 'lucide-react';

function ChatMessage({ darkMode, messages, formatTime }) {
  return (
    <div className={`flex ${messages.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 ${messages.sender === "user" ? "bg-grandient-to-r to bg-indigo-600  to-purple-600 text-white shadow-md" : darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 shadow-md"}`}>
        <div className={`flex-shrink- mr-3 ${messages.sender === "user" ? "text-indigo-200" : darkMode ? "text-indigo-400" : "text-indigo-400"

          }`}>
          {messages.sender === "user" ? (<User className='h-5 w-5' />) : (<Bot className='h-5 w-5' />)}



        </div>
        <div className='flex-1'>
          <div className='mb-1 flex justify-between items-center'>
            <span className='font-medium '>
              {messages.sender === "user" ? "You" : "AI Assistant"}

            </span>
            <span className={`text-xs ${messages.sender === "user" ? "opacity-70" : darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
              {formatTime(messages.timestamp)}

            </span>

          </div>
          <p className="text-sm md:text-base whitespace-pre-wrap break-word leading-relaxed">{messages.text}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage
