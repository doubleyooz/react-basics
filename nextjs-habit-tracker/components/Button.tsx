import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    uppercase?: boolean;
    className?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    noBorder?: boolean;
    variant?: 'inkSoft' | 'default' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    className = '',
    uppercase = false,
    fullWidth = false,
    variant = 'default',
    size = 'medium',
    noBorder = false,
    type = 'button',
    ...rest
    }) => {
    const classes = [
        'grid place-items-center cursor-pointer',
        'border border-line',
        'hover:border-ink hover:text-paper',
        'transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-line',
        uppercase ? 'uppercase' : '',
        fullWidth ? 'w-full' : (
            size === 'small' ? 'w-fit min-w-8' :
            size === 'medium' ? 'w-fit min-w-9' :
            size === 'large' ? 'w-fit min-w-10' : ''
        ),
        noBorder ? 'border-none' : '',
        size === 'small' ? 'h-8 text-xs' : '',
        size === 'medium' ? 'h-9 text-sm' : '',
        size === 'large' ? 'h-10 text-base' : '',
        variant === 'inkSoft' ? 'aria-pressed:bg-inkSoft aria-pressed:text-paper hover:bg-inkSoft' : '', // inkSoft already gets hover:bg-ink above
        variant === 'default' ? 'aria-pressed:bg-ink aria-pressed:text-paper hover:bg-ink' : '',
        variant === 'secondary' ? 'hover:text-black' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');



      return (
        <button type={type} className={classes} {...rest}>
            {label && <span className="px-3">{label}</span>}
            {icon && <span>{icon}</span>}
        </button>
    );
};