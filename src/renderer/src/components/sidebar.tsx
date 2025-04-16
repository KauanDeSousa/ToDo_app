import { useState } from 'react';
import { Search, Calendar, Layout, Settings, LogOut, Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/theme-context';
import logo from '@/images/icon.png';

export function Sidebar() {
    const [activeItem, setActiveItem] = useState('today');
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="w-full h-full bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
            {/* Logo and system name */}
            <div className="pt-3 px-5 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
                <h1 className="text-2xl">Menu</h1>
                <img src={logo} className="h-10 w-10 object-fill" />
            </div>

            {/* Search */}
            <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="bg-transparent border-none w-full focus:outline-none ml-2 text-sm dark:text-gray-200"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 px-2">
                {/* Tasks section */}
                <div className="py-3">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">TAREFAS</h3>
                    <ul className="space-y-1">
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'upcoming' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('upcoming')}
                        >
                            <span className="mr-2">»</span>
                            <span className="dark:text-gray-200">Próximas</span>
                            <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">
                                12
                            </span>
                        </li>
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'today' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('today')}
                        >
                            <span className="mr-2">≡</span>
                            <span className="dark:text-gray-200">Hoje</span>
                            <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">5</span>
                        </li>
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'calendar' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('calendar')}
                        >
                            <Calendar className="h-4 w-4 mr-2 dark:text-gray-400" />
                            <span className="dark:text-gray-200">Calendário</span>
                        </li>
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'wall' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('wall')}
                        >
                            <Layout className="h-4 w-4 mr-2 dark:text-gray-400" />
                            <span className="dark:text-gray-200">Mural</span>
                        </li>
                    </ul>
                </div>

                {/* Lists section */}
                <div className="py-3 mt-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">LISTAS</h3>
                    <ul className="space-y-1">
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'personal' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('personal')}
                        >
                            <div className="h-3 w-3 bg-red-400 rounded-sm mr-2"></div>
                            <span className="dark:text-gray-200">Pessoal</span>
                            <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">3</span>
                        </li>
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'work' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('work')}
                        >
                            <div className="h-3 w-3 bg-blue-400 rounded-sm mr-2"></div>
                            <span className="dark:text-gray-200">Trabalho</span>
                            <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">6</span>
                        </li>
                        <li
                            className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${
                                activeItem === 'list1' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveItem('list1')}
                        >
                            <div className="h-3 w-3 bg-yellow-400 rounded-sm mr-2"></div>
                            <span className="dark:text-gray-200">Lista 1</span>
                            <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-1.5 rounded-md">3</span>
                        </li>
                        <li className="flex items-center px-2 py-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
                            <Plus className="h-4 w-4 mr-1" />
                            <span>Adicionar Nova Lista</span>
                        </li>
                    </ul>
                </div>

                {/* Tags section */}
                <div className="py-3 mt-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">ETIQUETAS</h3>
                    <div className="flex flex-wrap gap-2 px-2 py-1">
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md">Etiqueta 1</span>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md">Etiqueta 2</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
                            + Adicionar Etiqueta
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom actions */}
            <div className="bg-white dark:bg-gray-800 shadow-inner">
                <div className="px-4 py-3">
                    {/* Theme toggle button */}
                    <button
                        className="flex items-center px-2 py-1.5 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md mb-2"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? (
                            <>
                                <Sun className="h-4 w-4 mr-2" />
                                <span className="dark:text-gray-200">Modo Claro</span>
                            </>
                        ) : (
                            <>
                                <Moon className="h-4 w-4 mr-2" />
                                <span>Modo Escuro</span>
                            </>
                        )}
                    </button>
                    <button className="flex items-center px-2 py-1.5 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                        <Settings className="h-4 w-4 mr-2 dark:text-gray-400" />
                        <span className="dark:text-gray-200">Configurações</span>
                    </button>
                    <button className="flex items-center px-2 py-1.5 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                        <LogOut className="h-4 w-4 mr-2 dark:text-gray-400" />
                        <span className="dark:text-gray-200">Sair</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
