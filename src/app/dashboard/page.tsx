'use client';

import React from 'react';
import NavBar from '../components/navbar';
import ClientTable from '../components/dashboard/clientTable';

import RecentActivity from '../components/dashboard/recentActivity';
// import { ClientProvider } from '../context/clientTableContext';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

        <main className="flex-grow p-4">
            <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-900 text-white rounded shadow-lg">

                <ClientTable />
            </div>
        </main>
        
            <main className="flex-grow p-4">
                <RecentActivity />
            </main>

            <footer className="text-center p-4">
                <p className="text-sm text-gray-500">© Isa Media Inc</p>
            </footer>
        </div>
    );

};

export default Dashboard;
