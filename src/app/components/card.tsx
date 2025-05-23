import React from "react"

type ClientStatus = 'Active' | 'Due' | 'Overdue';
interface Client {
  name: string;
  lastCheckIn: string;
  status: ClientStatus;
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
  { name: 'Jane Doe', lastCheckIn: 'May 17', status: 'Active' },
  { name: 'John Smith', lastCheckIn: 'May 10', status: 'Due' },
  { name: 'A. Grace', lastCheckIn: 'May 2', status: 'Overdue' },
];

const Card: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Client List</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">Client Name</th>
                        <th className="p-2">Last Check-In</th>
                        <th className="p-2">Status</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Card