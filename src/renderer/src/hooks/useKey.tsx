import React, { useRef, useEffect } from 'react';

export function useKey(key, cb, shouldHandle = true) {
    const callbackRef = useRef(cb);
    const lastKeyDownTimeRef = useRef(Date.now());

    useEffect(() => {
        callbackRef.current = cb;
    }, [cb]);

    useEffect(() => {
        function keyPress(event) {
            const currentTime = Date.now();
            const timeSinceLastKeyDown = currentTime - lastKeyDownTimeRef.current;
            lastKeyDownTimeRef.current = currentTime;

            if (event.key === key && shouldHandle) {
                const isBarcodeReader = timeSinceLastKeyDown < 90;

                if (isBarcodeReader) return;

                callbackRef.current(event);
            }
        }

        document.addEventListener('keydown', keyPress);

        return () => {
            document.removeEventListener('keydown', keyPress);
        };
    }, [key, shouldHandle]);
}
