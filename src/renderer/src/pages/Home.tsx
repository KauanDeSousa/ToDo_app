import { Header } from '@renderer/components/header';
import { Sidebar } from '@/components/sidebar';
import { TaskList } from '@/components/task-list';
import { TaskDetail } from '@/components/task-detail';
import type { Task } from '@/types/task';
import { useState } from 'react';
import { ThemeProvider } from '@renderer/context/theme-context';

export function Home() {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    return (
        <ThemeProvider>
            <main>
                <Header />
                <div className="flex w-full bg-gray-100 dark:bg-gray-900" style={{ height: 'calc(100vh - 2rem)' }}>
                    {/* Sidebar - 30% width */}
                    <div className="w-[30%] h-full p-1">
                        <div className="h-full rounded-lg overflow-hidden shadow-lg">
                            <Sidebar />
                        </div>
                    </div>

                    {/* Main content area - 70% width */}
                    <div className="flex flex-1 w-[70%] p-1 pl-0">
                        <div className="flex w-full rounded-lg overflow-hidden shadow-lg">
                            {/* Task list panel - takes full width when no task selected, or 50% when task is selected */}
                            <div className={`h-full ${selectedTask ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
                                <TaskList onSelectTask={setSelectedTask} selectedTask={selectedTask} />
                            </div>

                            {/* Task detail panel - 50% width when visible */}
                            {selectedTask && (
                                <div className="w-1/2 h-full transition-all duration-300 border-l border-gray-100 dark:border-gray-700">
                                    <TaskDetail task={selectedTask} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </ThemeProvider>
    );
}
