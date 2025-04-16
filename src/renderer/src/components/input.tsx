import { ComponentProps } from 'react';
import { GiCloudUpload } from 'react-icons/gi';
import { twMerge } from 'tailwind-merge';

interface InputTextProps extends ComponentProps<'input'> {
    fileName?: string;
}

export function InputText({ className, children, type = 'text', fileName = '', ...props }: InputTextProps) {
    const isFileInput = type === 'file';

    return (
        <div className={twMerge('flex flex-col gap-4 w-full h-max', className)}>
            <label className="text-xs text-label">{children}</label>
            {isFileInput ? (
                <div className="relative">
                    <input type="file" className="absolute inset-0 z-10 opacity-0 cursor-pointer" {...props} />
                    <div
                        className={`flex  bg-white items-center justify-between h-[52px] px-4 rounded-xl border-1 border-input-border text-input text-xs caret-standard cursor-pointer
                            ${props.disabled ? 'bg-disabled cursor-not-allowed' : 'hover:border-primary hover:bg-hover'}`}
                    >
                        <span>{fileName || props.placeholder}</span>
                        <span className="text-primary font-medium">
                            <GiCloudUpload className="w-6 h-6 text-standard" />
                        </span>
                    </div>
                </div>
            ) : (
                <input
                    className={`h-[52px] rounded-xl border-1 border-input-border bg-[rgb(248, 249, 250)] outline-none text-input text-xs px-4 caret-standard ${props.disabled ? 'disabled-input' : ''}`}
                    {...props}
                    type={type}
                />
            )}
        </div>
    );
}
