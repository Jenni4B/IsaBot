import React from 'react';
import NavBar from '../components/navbar';
import Card from '../components/card';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow p-4">
            <Card />
        </main>
        <footer className="text-center p-4">
            <p className="text-sm text-gray-500">© Isa Media Inc</p>
        </footer>
        </div>
    );

};

export default Dashboard;
