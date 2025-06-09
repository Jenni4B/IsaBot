'use client';

import React, { useState } from 'react';
import { useClientTable, getStatusColor, statusOptions } from '@/app/context/clientTableContext';

const ClientTable: React.FC = () => {
  const {
    clients,
    setClients,
    openIndex,
    setOpenIndex,
    fetchClientSummary,
    // note,
    setNote,
  } = useClientTable();

  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updated = [...clients];
    updated[index].status = newStatus;
    setClients(updated);
  };

  // const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setNote(e.target.value);
  // };

  // const handleSaveNote = () => {
  //   if (openIndex === null) return;
  //   const updated = [...clients];
  //   updated[openIndex].note = note;
  //   setClients(updated);
  //   setOpenIndex(null);
  // };

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
            {clients.map((client: Client, index: number) => (
            <tr key={index} className="hover:bg-gray-700 transition">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.lastCheckIn}</td>
              <td className="p-2">
              <select
                className={`bg-gray-700 rounded px-2 py-1 ${getStatusColor(client.status)}`}
                value={client.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(index, e.target.value)}
              >
                {statusOptions.map((status: string) => (
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
            <p className="mb-4">
              <strong>Note:</strong> {clients[openIndex].note || 'No notes available.'}
            </p>
            <div className="mb-4">
              <strong>Check-Ins:</strong>
              {clients[openIndex].checkIns && clients[openIndex].checkIns.length > 0 ? (
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {clients[openIndex].checkIns.map((checkIn: string, idx: number) => (
                    <li key={idx}>{checkIn}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-400">No check-ins available.</p>
              )}
            </div>


            <div className="mb-3">
              <strong>AI Summary:</strong>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await fetchClientSummary(openIndex);
                  setIsLoading(false);
                }}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </button>
            </div>

            {/* <div className="mb-4">
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
            </div> */}

            {/* <button
              onClick={handleSaveNote}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save Note
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTable;
