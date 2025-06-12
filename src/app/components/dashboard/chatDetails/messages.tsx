'use client';

import React from 'react';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string; // ISO date string
};

type MessagesProps = {
  messages: Message[];
  loading?: boolean;
};

const Messages: React.FC<MessagesProps> = ({ messages, loading }) => (
  <div className="mb-4 max-h-96 overflow-y-auto bg-gray-800 rounded p-4">
    {messages.length === 0 && (
      <p className="text-gray-400 text-center">Start the conversation by asking for an idea!</p>
    )}
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`px-4 py-2 rounded-lg max-w-xs ${
            msg.sender === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-100'
          }`}
        >
          {msg.content}
          <div className="text-xs text-gray-400 mt-1 text-right">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    ))}
    {loading && (
      <div className="mb-2 flex justify-start">
        <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-100 animate-pulse">
          AI is typing...
        </div>
      </div>
    )}
  </div>
);

export default Messages;