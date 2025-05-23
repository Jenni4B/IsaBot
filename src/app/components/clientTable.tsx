import React from "react"

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
                        <tr key={index} className="hover:bg-gray-600">
                            <td className="p-2">{client.name}</td>
                            <td className="p-2">{client.lastCheckIn}</td>
                            <td className={`p-2 ${getStatusColor(client.status)}`}>
                                {client.status}
                            </td>
                            <td className="p-2">{client.aiSummary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ClientTable;