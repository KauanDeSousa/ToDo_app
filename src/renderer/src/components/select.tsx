import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
    return (
        <div className={twMerge('flex flex-col gap-4 w-full h-max', className)}>
            <select
                className={twMerge(
                    'h-[52px] max-w-[183.3px] rounded-xl border-1 font-semibold border-input-border bg-[rgb(248, 249, 250)] outline-none text-input text-[10px] pl-4 pr-2 caret-standard',
                    className
                )}
                {...props}
            >
                {children}
            </select>
        </div>
    );
}
