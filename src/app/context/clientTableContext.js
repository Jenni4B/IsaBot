// import React, { createContext, useContext, useState } from 'react';

// // Initial client data as plain JavaScript objects
// const clientsData = [
//   {
//     name: 'Emily Carter',
//     lastCheckIn: 'June 3',
//     status: 'Active',
//     checkIns: [
//       "I'm staying consistent this week — finished scripting early.",
//       "Feeling confident about my next recording!",
//     ],
//   },
//   {
//     name: 'Marcus Liu',
//     lastCheckIn: 'May 20',
//     status: 'Overdue',
//     checkIns: [
//       "I missed my session again — things are chaotic.",
//       "Still behind but trying to get back into it.",
//     ],
//   },
// ];

// // Create context without type arguments
// const ClientContext = createContext(undefined);

// export const ClientProvider = ({ children }) => {
//   const [clients, setClients] = useState(clientsData);
//   return (
//     <ClientContext.Provider value={{ clients, setClients }}>
//       {children}
//     </ClientContext.Provider>
//   );
// };

// export const useClients = () => {
//   const context = useContext(ClientContext);
//   if (!context) {
//     throw new Error('useClients must be used within a ClientProvider');
//   }
//   return context;
// };
