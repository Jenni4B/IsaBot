'use client';

import React, { useState } from 'react';
import { fetchIdea } from '@/app/hooks/fetchIdea';
import Messages from './chatDetails/messages';

const IdeaBox: React.FC = () => {
  const [input, setInput] = useState('');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter something before generating an idea.');
      return;
    }
    setError(null);
    // Reset previous idea and set loading state
    setLoading(true);
    const generated = await fetchIdea(input);
    setIdea(generated);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-900 text-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Generate an Idea</h1>
      <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your idea prompt here..."
          className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Generate Idea
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && <p className="text-gray-400 mt-2">Generating...</p>}
      {idea && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Generated Idea:</h2>
          <Messages
            messages={[
              {
                id: '1',
                content: idea,
                sender: 'bot',
                timestamp: new Date().toISOString(),
              },
            ]}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default IdeaBox;
