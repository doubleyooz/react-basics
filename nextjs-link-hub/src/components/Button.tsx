import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
    href?: string;
    target?: string;
    as?: 'button' | 'a';
    loadingText?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        loading = false,
        disabled = false,
        fullWidth = false,
        leftIcon,
        rightIcon,
        children,
        className = '',
        href,
        target,
        as,
        loadingText,
        rounded = 'md',
        onClick,
        ...props
    }, ref) => {

        // Determine if it should render as link
        const isLink = as === 'a' || href;
        const Component = isLink ? 'a' : 'button';

        // Size classes
        const sizeClasses = {
            xs: 'px-2.5 py-1.5 text-xs font-medium h-7 gap-1',
            sm: 'px-3 py-2 text-sm font-medium h-8 gap-1.5',
            md: 'px-4 py-2.5 text-sm font-semibold h-10 gap-2',
            lg: 'px-6 py-3 text-base font-semibold h-11 gap-2',
            xl: 'px-8 py-4 text-lg font-semibold h-14 gap-2.5',
        };

        // Rounded classes
        const roundedClasses = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-lg',
            lg: 'rounded-xl',
            full: 'rounded-full',
        };

        // Variant classes
        const variantClasses = {
            primary: `
        bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg
        hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5
        focus:ring-4 focus:ring-blue-500/30 focus:from-blue-700 focus:to-purple-700
        active:from-blue-800 active:to-purple-800 active:translate-y-0
        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none
      `,
            secondary: `
        bg-gray-100 text-gray-900 border-2 border-gray-200 shadow-sm
        hover:bg-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5
        focus:ring-4 focus:ring-gray-500/20 focus:bg-gray-200 focus:border-gray-400
        active:bg-gray-300 active:translate-y-0
        disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none
      `,
            outline: `
        bg-transparent text-blue-600 border-2 border-blue-600 shadow-sm
        hover:bg-blue-600 hover:text-white hover:shadow-md hover:-translate-y-0.5
        focus:ring-4 focus:ring-blue-500/30 focus:bg-blue-50
        active:bg-blue-700 active:text-white active:translate-y-0
        disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none
      `,
            ghost: `
        bg-transparent text-gray-700 border-2 border-transparent
        hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-0.5
        focus:ring-4 focus:ring-gray-500/20 focus:bg-gray-50
        active:bg-gray-200 active:translate-y-0
        disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none
      `,
            danger: `
        bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg
        hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-0.5
        focus:ring-4 focus:ring-red-500/30 focus:from-red-600 focus:to-red-700
        active:from-red-700 active:to-red-800 active:translate-y-0
        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none
      `,
            success: `
        bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg
        hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-0.5
        focus:ring-4 focus:ring-green-500/30 focus:from-green-600 focus:to-green-700
        active:from-green-700 active:to-green-800 active:translate-y-0
        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none
      `,
            warning: `
        bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg
        hover:from-yellow-600 hover:to-orange-600 hover:shadow-xl hover:-translate-y-0.5
        focus:ring-4 focus:ring-yellow-500/30 focus:from-yellow-600 focus:to-orange-600
        active:from-yellow-700 active:to-orange-700 active:translate-y-0
        disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none
      `,
        };

        // Base classes
        const baseClasses = `
      inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-offset-2 focus:ring-offset-white
      select-none relative overflow-hidden
      ${loading || disabled ? 'pointer-events-none' : 'cursor-pointer'}
      ${fullWidth ? 'w-full' : ''}
    `;

        // Combine all classes
        const buttonClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${roundedClasses[rounded]}
      ${variantClasses[variant]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

        // Loading spinner component
        const LoadingSpinner = () => (
            <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        // Button content
        const buttonContent = (
            <>
                {/* Loading state */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-inherit">
                        <LoadingSpinner />
                        {loadingText && <span className="ml-2">{loadingText}</span>}
                    </div>
                )}

                {/* Normal content */}
                <div className={`flex items-center justify-center gap-inherit ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    {leftIcon && !loading && (
                        <span className="flex-shrink-0">
                            {leftIcon}
                        </span>
                    )}

                    <span className={fullWidth ? 'flex-1 text-center' : ''}>
                        {children}
                    </span>

                    {rightIcon && !loading && (
                        <span className="flex-shrink-0">
                            {rightIcon}
                        </span>
                    )}
                </div>
            </>
        );

        // Handle click with loading state
        const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (loading || disabled) {
                e.preventDefault();
                return;
            }
            onClick?.(e as any);
        };

        // Render as link
        if (isLink) {
            return (
                <a
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    href={disabled || loading ? undefined : href}
                    target={target}
                    className={buttonClasses}
                    onClick={handleClick}
                    aria-disabled={disabled || loading}
                    tabIndex={disabled || loading ? -1 : 0}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {buttonContent}
                </a>
            );
        }

        // Render as button
        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                type="button"
                disabled={disabled || loading}
                className={buttonClasses}
                onClick={handleClick}
                aria-disabled={disabled || loading}
                {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            >
                {buttonContent}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
