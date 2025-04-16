import { ElectronAPI } from '@electron-toolkit/preload';
import { LogDebugAndError, OpenApp } from '@shared/types';

declare global {
    interface Window {
        // electron: ElectronAPI
        context: {
            minimizeWindow: () => void;
            toggleMaximizeWindow: () => void;
            closeWindow: () => void;
            on: (channel: string, callback: (...args: any[]) => void) => void;
            off: (channel: string) => void;
        };
    }
}
