import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import type { Task } from '@/types/task';

// Dados de exemplo
const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Pesquisar ideias de conteúdo',
        completed: false,
        list: 'Pessoal',
    },
    {
        id: '2',
        title: 'Criar banco de dados de autores convidados',
        completed: false,
        list: 'Trabalho',
    },
    {
        id: '3',
        title: 'Renovar carteira de motorista',
        completed: false,
        date: '22-03-22',
        list: 'Pessoal',
        subtasks: 1,
    },
    {
        id: '4',
        title: 'Consultar contador',
        completed: false,
        list: 'Lista 1',
        subtasks: 3,
    },
    {
        id: '5',
        title: 'Imprimir cartão de visita',
        completed: false,
        list: 'Trabalho',
    },
];

interface TaskListProps {
    onSelectTask: (task: Task) => void;
    selectedTask: Task | null;
}

export function TaskList({ onSelectTask, selectedTask }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>(sampleTasks);

    return (
        <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center">
                    <h1 className="text-2xl font-semibold dark:text-white">Hoje</h1>
                    <span className="ml-4 text-2xl text-gray-500 dark:text-gray-400">5</span>
                </div>
            </div>

            {/* Add task button */}
            <div className="p-4 bg-white dark:bg-gray-800 shadow-sm">
                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Adicionar Nova Tarefa</span>
                </button>
            </div>

            {/* Task list */}
            <div className="flex-1 overflow-y-auto">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            selectedTask?.id === task.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                        }`}
                        onClick={() => onSelectTask(task)}
                    >
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="mt-1 mr-3"
                                checked={task.completed}
                                onChange={() => {
                                    const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t));
                                    setTasks(updatedTasks);
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="dark:text-white">{task.title}</span>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>

                                {(task.date || task.list || task.subtasks) && (
                                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 space-x-2">
                                        {task.date && (
                                            <div className="flex items-center">
                                                <span className="mr-1">📅</span>
                                                <span>{task.date}</span>
                                            </div>
                                        )}

                                        {task.subtasks && (
                                            <div className="flex items-center ml-2">
                                                <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">
                                                    {task.subtasks} {task.subtasks === 1 ? 'Subtarefa' : 'Subtarefas'}
                                                </span>
                                            </div>
                                        )}

                                        {task.list && (
                                            <div className="flex items-center ml-2">
                                                <span
                                                    className={`h-2 w-2 rounded-sm mr-1 ${
                                                        task.list === 'Pessoal'
                                                            ? 'bg-red-400'
                                                            : task.list === 'Trabalho'
                                                              ? 'bg-blue-400'
                                                              : 'bg-yellow-400'
                                                    }`}
                                                ></span>
                                                <span>{task.list}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
