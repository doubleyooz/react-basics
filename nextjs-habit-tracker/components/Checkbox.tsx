import React from 'react';

export interface CheckBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  noBorder?: boolean;
  done?: boolean;
  variant?: 'inkSoft' | 'default' | 'secondary';
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  icon,
  className = '',
  done = false,
  variant = 'default',
  noBorder = false,
  ...rest
}) => {
  const classes = [
    'h-6 w-6 grid place-items-center cursor-pointer relative',
    'border',
    'hover:border-ink hover:text-paper',
    'transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-line',
    noBorder ? 'border-none' : '',
    variant === 'default' ?
      done ? "bg-moss border-moss hover:border-moss hover:bg-moss hover:brightness-125"
        : "border-inkSoft/60 bg-transparent hover:bg-inkSoft/60 hover:border-inkSoft/60"
      : "",
    variant === 'inkSoft' ?
      done ? "bg-inkSoft border-inkSoft hover:border-inkSoft hover:bg-inkSoft hover:brightness-125"
        : "border-ink/60 bg-transparent hover:bg-ink/60 hover:border-ink/60"
      : "",

    variant === 'secondary' ? 'hover:text-black' : '',

    className,
  ]
    .filter(Boolean)
    .join(' ');


  return (
    <button type="button" className={classes} role="checkbox" {...rest}>
      {done && (
        <span className="tick-check absolute inset-0 bg-paper" />
      )}
    </button>

  );
};
