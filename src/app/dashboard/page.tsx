'use client';

import React from 'react';
import IdeaBox from '../components/dashboard/IdeaBox';
import RecentActivity from '../components/dashboard/recentActivity';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-4">
                <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-900 text-white rounded shadow-lg">
                    <IdeaBox />
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
