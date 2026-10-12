import React from 'react';

interface ButtonProps {
    label?: string;
    uppercase?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    uppercase = false,
    fullWidth = false, 
    onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                `h-9 grid place-items-center cursor-pointer border border-line hover:border-ink hover:bg-ink hover:text-paper transition-colors"
                 ${uppercase ? 'uppercase' : ''}
                 ${fullWidth ? 'w-full' : 'min-w-9'}`}
        >
            {label && (
                <span className="text-sm px-3">
                    {label}
                </span>
            )}

            {icon && (
                <span>
                    {icon}
                </span>
            )}
        </button>
    );
};