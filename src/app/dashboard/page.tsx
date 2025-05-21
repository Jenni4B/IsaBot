import React from 'react';
import NavBar from '../components/navbar';

type ClientStatus = 'Active' | 'Due' | 'Overdue';

interface Client {
  name: string;
  lastCheckIn: string;
  status: ClientStatus;
}

const clients: Client[] = [
  { name: 'Jane Doe', lastCheckIn: 'May 17', status: 'Active' },
  { name: 'John Smith', lastCheckIn: 'May 10', status: 'Due' },
  { name: 'A. Grace', lastCheckIn: 'May 2', status: 'Overdue' },
];

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

const Dashboard: React.FC = () => {
  return (
    <div className="text-white font-sans min-h-screen py-8 px-4">
        <NavBar />
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 border border-gray-700">Client Name</th>
                <th className="p-4 border border-gray-700">Last Check-In</th>
                <th className="p-4 border border-gray-700">Status</th>
                <th className="p-4 border border-gray-700">AI Summary</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="bg-gray-800">
                  <td className="p-4 border border-gray-700">{client.name}</td>
                  <td className="p-4 border border-gray-700">{client.lastCheckIn}</td>
                  <td className="p-4 border border-gray-700">
                    <div className="flex items-center">
                      <span className={`${getStatusColor(client.status)} mr-2`}>
                        {client.status === 'Active' && '✔️'}
                        {client.status === 'Due' && '⚠️'}
                        {client.status === 'Overdue' && '❌'}
                      </span>
                      {client.status}
                    </div>
                  </td>
                  <td className="p-4 border border-gray-700">
                    <a href="#" className="text-blue-400 hover:underline">
                      View ➤
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="text-white py-2 px-4 rounded hover:opacity-90"
                  style={{ backgroundColor: "var(--color-accent, #D0355B)" }}>
            Add New Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
