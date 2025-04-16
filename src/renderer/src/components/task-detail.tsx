import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import type { Task } from '@/types/task';

interface TaskDetailProps {
    task: Task;
}

export function TaskDetail({ task }: TaskDetailProps) {
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('11-05-22');

    return (
        <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Task title */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Tarefa:</h2>
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full text-lg font-medium focus:outline-none bg-transparent dark:text-white"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Descrição</h2>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[80px] p-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 bg-white dark:bg-gray-700 dark:text-white"
                            placeholder="Adicionar descrição..."
                        />
                    </div>

                    {/* List */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Lista</h2>
                        <div className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700">
                            <div className="flex items-center">
                                <span
                                    className={`h-3 w-3 rounded-sm mr-2 ${
                                        task.list === 'Pessoal' ? 'bg-red-400' : task.list === 'Trabalho' ? 'bg-blue-400' : 'bg-yellow-400'
                                    }`}
                                ></span>
                                <span className="dark:text-white">{task.list}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Due date */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Data de vencimento</h2>
                        <div className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700">
                            <span className="dark:text-white">{dueDate}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Etiquetas</h2>
                        <div className="flex items-center space-x-2">
                            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded-md">
                                Etiqueta 1
                            </span>
                            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                                + Adicionar Etiqueta
                            </button>
                        </div>
                    </div>

                    {/* Subtasks */}
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 mb-2">Subtarefas:</h2>
                        <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-4">
                            <Plus className="h-4 w-4 mr-2" />
                            <span>Adicionar Nova Subtarefa</span>
                        </button>

                        {task.subtasks && task.subtasks > 0 && (
                            <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                                <div className="flex items-center mb-2">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="dark:text-white">Subtarefa</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between p-6 bg-white dark:bg-gray-800 shadow-inner">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                    Excluir Tarefa
                </button>
                <button className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500">Salvar alterações</button>
            </div>
        </div>
    );
}
