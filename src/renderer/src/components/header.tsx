import {
    FiMinus,
    FiSquare, // Ícone de maximizar
    FiX, // Ícone de fechar
} from 'react-icons/fi';

import logo from '@/images/icon.png';

export function Header() {
    return (
        <header
            className="bg-gray-100 text-white h-8 w-full flex items-center justify-between px-2 select-none dark:bg-gray-900"
            style={{
                ['-webkit-app-region' as any]: 'drag',
            }}
        >
            <div className="flex gap-2 items-center">
                <img src={logo} className="h-4 w-4 object-fill" />
                <p className="text-sm">ToDo</p>
            </div>
            <nav
                className="flex items-center gap-1"
                style={{
                    ['-webkit-app-region' as any]: 'no-drag',
                }}
            >
                <button className="p-1 hover:bg-gray-200  dark:hover:bg-gray-700 rounded" onClick={window.context.minimizeWindow}>
                    <FiMinus size={14} color="white" />
                </button>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onClick={window.context.toggleMaximizeWindow}>
                    <FiSquare size={14} />
                </button>
                <button className="p-1 hover:bg-red-500 hover:bg-opacity-80 rounded group" onClick={window.context.closeWindow}>
                    <FiX size={16} className="group-hover:text-white" />
                </button>
            </nav>
        </header>
    );
}
