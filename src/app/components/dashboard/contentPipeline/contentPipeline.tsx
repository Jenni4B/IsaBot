'use client';

import React, { useEffect, useState } from 'react';

interface ContentItem {
  id: number;
  title: string;
  status: 'Draft' | 'In Progress' | 'Published';
  note?: string;
}

const defaultStatus: ContentItem['status'][] = ['Draft', 'In Progress', 'Published'];

const ContentPipeline: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ContentItem['status']>('Draft');
  const [note, setNote] = useState('');

  // Load saved items
  useEffect(() => {
    const saved = localStorage.getItem('isaContentPipeline');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('isaContentPipeline', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!title.trim()) return;
    const newItem: ContentItem = {
      id: Date.now(),
      title: title.trim(),
      status,
      note: note.trim() || '',
    };
    setItems(prev => [...prev, newItem]);
    setTitle('');
    setStatus('Draft');
    setNote('');
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">📂 Content Pipeline</h3>

      {/* Add New Content Item */}
      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="Content Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value as ContentItem['status'])}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
        >
          {defaultStatus.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Add a description... (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
        />

        <button
          onClick={addItem}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
        >
          Add Project
        </button>
      </div>

      {/* Display Content Items */}
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">No content yet</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-700 p-3 rounded shadow-sm space-y-1 text-sm"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{item.title}</h4>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
              <p className="text-xs text-gray-300">Status: <span className="font-medium">{item.status}</span></p>
              {item.note && (
                <p className="text-gray-300">📝 {item.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentPipeline;
