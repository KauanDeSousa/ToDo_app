import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Button({ className, children, ...props }: ComponentProps<'button'>) {
    return (
        <button
            className={twMerge(
                'w-full h-[50px] bg-standard rounded-xl flex items-center justify-between px-5 transition-all ease-in-out duration-300',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
