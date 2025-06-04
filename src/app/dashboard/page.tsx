import React from 'react';
import NavBar from '../components/navbar';
import ClientTable from '../components/dashboard/clientTable';
import RecentActivity from '../components/dashboard/recentActivity';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <NavBar />
            <main className="flex-grow p-4">
                <ClientTable />
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
