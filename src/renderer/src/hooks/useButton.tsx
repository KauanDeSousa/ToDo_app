import { useState } from 'react';

export function useButton() {
    const [isHoveredDashboard, setIsHoveredDashboard] = useState(false);
    const [isHoveredService, setIsHoveredService] = useState(false);
    const [isHoveredStore, setIsHoveredStore] = useState(false);

    const handleMouseEnter = (app: number) => {
        if (app === 1) return setIsHoveredDashboard(true);

        if (app === 2) return setIsHoveredService(true);

        return setIsHoveredStore(true);
    };

    const handleMouseLeave = (app: number) => {
        if (app === 1) return setIsHoveredDashboard(false);

        if (app === 2) return setIsHoveredService(false);

        return setIsHoveredStore(false);
    };

    return {
        handleMouseEnter,
        handleMouseLeave,
        isHoveredDashboard,
        isHoveredService,
        isHoveredStore,
    };
}
