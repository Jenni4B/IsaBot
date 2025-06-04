'use client';

import React, { useState } from 'react';

type ClientStatus = 'Active' | 'Due' | 'Overdue';

interface Client {
  name: string;
  lastCheckIn: string;
  status: ClientStatus;
  aiSummary?: string;
  note?: string;
}

const getStatusColor = (status: ClientStatus): string => {
  switch (status) {
    case 'Active':
      return 'text-green-500';
    case 'Due':
      return 'text-yellow-500';
    case 'Overdue':
      return 'text-red-500';
    default:
      return 'text-gray-300';
  }
};

const clientsData: Client[] = [
  {
    name: 'Emily Carter',
    lastCheckIn: 'June 3',
    status: 'Active',
    aiSummary: 'Emily is consistently checking in and showing confidence in her workflow.',
  },
  {
    name: 'D. Nguyen',
    lastCheckIn: 'May 28',
    status: 'Due',
    aiSummary: 'D. Nguyen is quieter than usual and may need a check-in message.',
  },
  {
    name: 'Marcus Liu',
    lastCheckIn: 'May 20',
    status: 'Overdue',
    aiSummary: 'Marcus has not submitted a check-in in over two weeks. Recommend re-engagement.',
  },
  {
    name: 'Priya Patel',
    lastCheckIn: 'June 1',
    status: 'Active',
    aiSummary: 'Priya is on track with content planning and seems more confident.',
  },
  {
    name: 'Carlos Ramos',
    lastCheckIn: 'May 25',
    status: 'Due',
    aiSummary: 'Carlos missed his last check-in and mentioned scheduling issues previously.',
  }
];

const statusOptions: ClientStatus[] = ['Active', 'Due', 'Overdue'];

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');

  const handleStatusChange = (index: number, newStatus: ClientStatus) => {
    const updated = [...clients];
    updated[index].status = newStatus;
    setClients(updated);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (openIndex === null) return;
    const updated = [...clients];
    updated[openIndex].note = note;
    setClients(updated);
    setOpenIndex(null);
  };

  const handleOpenModal = (index: number) => {
    setNote(clients[index].note || '');
    setOpenIndex(index);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Client List</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 text-left">Client Name</th>
            <th className="p-2 text-left">Last Check-In</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">AI Summary</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} className="hover:bg-gray-700 transition">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.lastCheckIn}</td>
              <td className="p-2">
                <select
                  className={`bg-gray-700 rounded px-2 py-1 ${getStatusColor(client.status)}`}
                  value={client.status}
                  onChange={(e) => handleStatusChange(index, e.target.value as ClientStatus)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleOpenModal(index)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {openIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition">
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-md relative animate-fade-in">
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-2">{clients[openIndex].name}</h3>
            <p className="mb-1">
              <strong>Last Check-In:</strong> {clients[openIndex].lastCheckIn}
            </p>
            <p className="mb-1">
              <strong>Status:</strong>{' '}
              <span className={getStatusColor(clients[openIndex].status)}>
                {clients[openIndex].status}
              </span>
            </p>
            <div className="mb-3">
              <strong>AI Summary:</strong>
              <p className="mt-1 text-sm text-gray-300">{clients[openIndex].aiSummary}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium mb-1">
                Your Notes:
              </label>
              <textarea
                id="note"
                value={note}
                onChange={handleNoteChange}
                className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
                rows={4}
              />
            </div>

            <button
              onClick={handleSaveNote}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTable;
