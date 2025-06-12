'use client';

import React, { useState } from 'react';
import { fetchIdea } from '@/app/hooks/fetchIdea';

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
      <h1 className="text-3xl font-bold mb-6 text-center">💡 Idea Generator</h1>

      <label htmlFor="input" className="block text-sm mb-1">What do you need help brainstorming?</label>
      <textarea
        id="input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          if (error) setError(null);
        }}
        rows={4}
        className="w-full p-3 text-white rounded mb-4"
        placeholder="e.g., podcast topic about burnout, newsletter idea, episode intro"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Idea'}
      </button>

      {idea && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h2 className="font-semibold mb-2">Suggested Idea:</h2>
          <p className="text-sm text-gray-300">{idea}</p>
        </div>
      )}
    </div>
  );
};

export default IdeaBox;
