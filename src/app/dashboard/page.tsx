'use client';

import React from 'react';
import IdeaBox from '../components/dashboard/IdeaBox';
import TaskList from '../components/dashboard/taskList/taskList';
import ContentPipeline from '../components/dashboard/contentPipeline/contentPipeline';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow p-4">

                <div className="max-w-5xl mx-auto mt-12 p-6 bg-transparent rounded shadow-none">

                    <div className="flex flex-row gap-8">

                        <div className="flex-1 bg-gray-900 text-white rounded shadow-lg p-6">
                            <TaskList />
                        </div>

                        <div className="flex-1 bg-gray-900 text-white rounded shadow-lg p-6">
                            <ContentPipeline />
                        </div>

                    </div>
                    <div className="mt-8 bg-gray-900 text-white rounded shadow-lg p-6">
                        <IdeaBox />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
