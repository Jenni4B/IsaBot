'use client';

import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const suggestedTasks = [
  'Outline next episode',
  'Draft email for audience',
  'Edit video footage',
  'Schedule social media post',
  'Review podcast feedback',
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('creatorTasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('creatorTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newItem: Task = { id: Date.now(), text: newTask.trim(), completed: false };
    setTasks(prev => [...prev, newItem]);
    setNewTask('');
  };

  const handleAddSuggestedTask = (taskText: string) => {
    if (!tasks.some(t => t.text === taskText)) {
      const newItem: Task = { id: Date.now(), text: taskText, completed: false };
      setTasks(prev => [...prev, newItem]);
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md text-white">
      <h3 className="text-lg font-bold mb-3">📋 To-Do List</h3>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="flex-1 px-3 py-1 rounded bg-gray-700 text-white border border-gray-600"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Quick Add */}
      <div className="mb-3">
        <p className="text-sm text-gray-300 mb-1">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedTasks.map((task, idx) => (
            <button
              key={idx}
              onClick={() => handleAddSuggestedTask(task)}
              className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
            >
              {task}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="mt-4 space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks yet</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
