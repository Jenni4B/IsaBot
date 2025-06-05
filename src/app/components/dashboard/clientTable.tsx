'use client';

import React, { useState } from 'react';
import { fetchSummary } from '@/app/hooks/fetchSummary';

type ClientStatus = 'Active' | 'Due' | 'Overdue';

interface Client {
  name: string;
  lastCheckIn: string;
  status: ClientStatus;
  aiSummary?: string;
  note?: string;
  checkIns?: string[];
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
    checkIns: [
      "I'm staying consistent this week — finished scripting early.",
      "Feeling confident about my next recording!"
    ]
  },
  {
    name: 'Marcus Liu',
    lastCheckIn: 'May 20',
    status: 'Overdue',
    checkIns: [
      "I missed my session again — things are chaotic.",
      "Still behind but trying to get back into it."
    ]
  }
];

const statusOptions: ClientStatus[] = ['Active', 'Due', 'Overdue'];

const ClientTable: React.FC = () => {

  // State to manage clients and modal
  // my plan is to use a context provider for the client data
  // but for now, I'll keep it here and move it later when things start coming together
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
    // Main component rendering the client list and modal
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Client List</h2>

      {/* Table */}
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

          {/* Map through clients and render each row */}
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
        // This modal will show client details and allow note-taking
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

                <button
                  onClick={async () => {
                    const updated = [...clients];
                    const checkIns = updated[openIndex].checkIns ?? [];

                    if (!checkIns.length) {
                      console.warn("No check-ins available for this client.");
                      return;
                    }

                    try {
                      // Fetch AI summary for the client's check-ins
                      const aiSummary = await fetchSummary(checkIns);
                      updated[openIndex].aiSummary = aiSummary;
                      setClients(updated);
                    } catch (error) {
                      // Handle any errors that occur during the fetch and console log them
                      console.error("Failed to fetch AI summary:", error);
                      // alerts the user about the error
                      alert("An error occurred while generating the summary. Please try again later.");
                    }
                  }}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Generate Summary
                </button>

            </div>


            {/* Display AI summary if available */}

            <div className="mb-4">
              {/* Lets the client take her own notes */}
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

            {/* Save button to save the note */}
            {/* I need the note to display as saved though but I'll get on that soon */}
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