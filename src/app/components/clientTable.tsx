'use client';

import React, { useState } from "react"

type ClientStatus = 'Active' | 'Due' | 'Overdue';
interface Client {
  name: string;
  lastCheckIn: string;
  status: ClientStatus;
  aiSummary?: string;
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

const clients: Client[] = [
  { name: 'Jane Doe', lastCheckIn: 'May 17', status: 'Active', aiSummary: 'Jane is doing great! She has been very active in her sessions and is making good progress.' },

  { name: 'John Smith', lastCheckIn: 'May 10', status: 'Due', aiSummary: 'John has been a bit quiet lately. He missed his last session, but we are reaching out to him.' },

  { name: 'A. Grace', lastCheckIn: 'May 2', status: 'Overdue', aiSummary: 'A. Grace has not checked in for a while. We are concerned and will follow up with her.' },
];

const ClientTable: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Client List</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">Client Name</th>
                        <th className="p-2">Last Check-In</th>
                        <th className="p-2">Status</th>
                        <th className="p-1">AI Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => (
                        <React.Fragment key={index}>
                            <tr className="hover:bg-gray-600">
                                <td className="p-2">{client.name}</td>
                                <td className="p-2">{client.lastCheckIn}</td>
                                <td className={`p-2 ${getStatusColor(client.status)}`}>
                                    {client.status}
                                </td>
                                <td className="p-2">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                            {openIndex === index && (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="bg-gray-700 rounded p-4 my-2 shadow-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold">AI Summary</span>
                                                <button
                                                    className="text-gray-300 hover:text-white"
                                                    onClick={() => setOpenIndex(null)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div>{client.aiSummary}</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ClientTable;