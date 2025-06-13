'use client';

import React, { useEffect, useState } from 'react';

type Status = 'Draft' | 'In Progress' | 'Published';

interface ContentItem {
  id: number;
  title: string;
  status: Status;
  note?: string;
}

const STATUS_OPTIONS: Status[] = ['Draft', 'In Progress', 'Published'];

const ContentPipeline: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState<Status>('Draft');
  const [newNote, setNewNote] = useState('');

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem('isaContentPipeline');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem('isaContentPipeline', JSON.stringify(items));
  }, [items]);

  // Add new content item
  const addItem = () => {
    if (!newTitle.trim()) return;
    const newItem: ContentItem = {
      id: Date.now(),
      title: newTitle.trim(),
      status: newStatus,
      note: newNote.trim(),
    };
    setItems(prev => [...prev, newItem]);
    setNewTitle('');
    setNewStatus('Draft');
    setNewNote('');
  };

  // Delete content item
  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Update any field inline
  const updateItem = (id: number, field: keyof ContentItem, value: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const filteredItems =
    filter === 'All' ? items : items.filter(item => item.status === filter);

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md text-white">
      <h3 className="text-lg font-bold mb-4">📂 Content Pipeline</h3>

      {/* Status Filter */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-gray-300">Filter:</span>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as Status | 'All')}
          className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 text-sm"
        >
          <option value="All">All</option>
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Add New */}
      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="New Content Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
        />
        <select
          value={newStatus}
          onChange={e => setNewStatus(e.target.value as Status)}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <textarea
          placeholder="Optional note"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-sm border border-gray-600"
          rows={2}
        />
        <button
          onClick={addItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Add Project
        </button>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <p className="text-gray-400 text-sm">No content found</p>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="bg-gray-700 p-4 rounded shadow-sm space-y-2">
              {/* Editable Title */}
              <input
                value={item.title}
                onChange={e => updateItem(item.id, 'title', e.target.value)}
                className="w-full text-white font-semibold text-sm bg-transparent border-b border-gray-500 focus:outline-none"
              />

              {/* Editable Status */}
              <select
                value={item.status}
                onChange={e => updateItem(item.id, 'status', e.target.value)}
                className="bg-gray-800 border border-gray-600 px-2 py-1 text-sm rounded"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {/* Editable Note */}
              <textarea
                value={item.note || ''}
                onChange={e => updateItem(item.id, 'note', e.target.value)}
                placeholder="Add a note..."
                rows={2}
                className="w-full bg-gray-800 border border-gray-600 rounded text-sm p-2"
              />

              {/* Delete Button */}
              <div className="text-right">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-400 hover:text-red-500 text-xs"
                >
                  ✖ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentPipeline;