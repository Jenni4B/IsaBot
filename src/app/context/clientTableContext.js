'use client';

import React, { createContext, useContext, useState } from 'react';
import { fetchSummary } from '../hooks/fetchSummary';

// ---- Status options and helpers ----
export const statusOptions = ['Active', 'Due', 'Overdue', 'Onboarding'];

export const getStatusColor = (status) => {
  switch (status) {
    case 'Onboarding':
      return 'text-blue-500';
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

// ---- Initial dummy data ----
const clientsData = [
  {
    name: 'Emily Carter',
    lastCheckIn: 'June 3',
    status: 'Active',
    checkIns: [
      "I'm staying consistent this week — finished scripting early.",
      'Feeling confident about my next recording!',
    ],
  },
  {
    name: 'Marcus Liu',
    lastCheckIn: 'May 20',
    status: 'Overdue',
    checkIns: [
      'I missed my session again — things are chaotic.',
      'Still behind but trying to get back into it.',
    ],
  },
];

// ---- Context setup ----
const ClientTableContext = createContext();

export const ClientTableProvider = ({ children }) => {
  const [clients, setClients] = useState(clientsData);
  const [openIndex, setOpenIndex] = useState(null);
  const [note, setNote] = useState('');

  const fetchClientSummary = async (index) => {
    const checkIns = clients[index]?.checkIns ?? [];
    if (!checkIns.length) {
      console.warn('No check-ins available for this client.');
      return;
    }

    try {
      const summary = await fetchSummary(checkIns);
      const updated = [...clients];
      updated[index].aiSummary = summary;
      setClients(updated);
    } catch (err) {
      console.error('Error fetching AI summary:', err);
    }
  };

  return (
    <ClientTableContext.Provider
      value={{
        clients,
        setClients,
        openIndex,
        setOpenIndex,
        fetchClientSummary,
        note,
        setNote,
      }}
    >
      {children}
    </ClientTableContext.Provider>
  );
};

export const useClientTable = () => {
  const context = useContext(ClientTableContext);
  if (!context) {
    throw new Error('useClientTable must be used within a ClientTableProvider');
  }
  return context;
};
