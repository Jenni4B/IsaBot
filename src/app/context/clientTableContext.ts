import { fetchSummary } from "../hooks/fetchSummary";
import { createContext, useContext, useState } from "react";

// This is where the client data will be managed 
// Right now it's in the clientTable component
// but later it will be moved to this context file

export interface Client {
    name: string;
    lastCheckIn: string;
    status: 'Active' | 'Due' | 'Overdue';
    aiSummary?: string;
    note?: string;
    checkIns?: string[];
}

interface ClientContextType {
    clients: Client[];
    setClients: React.Dispatch<React.SetStateAction<Client[]>>;
    openIndex: number | null;
    setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
    fetchClientSummary: (clientName: string) => Promise<void>;
}

type ClientStatus = 'Active' | 'Due' | 'Overdue';

export const statusOptions: ClientStatus[] = ['Active', 'Due', 'Overdue'];

export interface Client {
    name: string;
    lastCheckIn: string;
    status: ClientStatus;
    aiSummary?: string;
    note?: string;
    checkIns?: string[];
}

export const getStatusColor = (status: ClientStatus): string => {
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

const ClientTableContext = createContext<ClientContextType | undefined>(undefined);

export const ClientTableProvider = ({ children }) => {
    const [clients, setClients] = useState<Client[]>(clientsData);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [note, setNote] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

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

    const fetchClientSummary = async (clientName: string) => {
        try {
            const summary = await fetchSummary(clientName);
            setClients(prevClients =>
                prevClients.map(client =>
                    client.name === clientName ? { ...client, aiSummary: summary } : client
                )
            );
        } catch (error) {
            console.error("Error fetching client summary:", error);
        }
    };

    return (
        <ClientTableContext.Provider
            value={{
                clients,
                setClients,
                openIndex,
                setOpenIndex,
                handleStatusChange,

            }}
        >
            {children}
        </ClientTableContext.Provider>

    );
};

export { ClientTableContext };

export const useClientTable = () => {
  const context = useContext(ClientTableContext);
  if (!context) {
    throw new Error("useClientTable must be used within a ClientTableProvider");
  }
  return context;
};