import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface TextFieldProps {
    title: string;
    register: UseFormRegisterReturn;
    error?: FieldError | string;
    required?: boolean;
    type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search';
    placeholder?: string;
    disabled?: boolean;
    helperText?: string;
    className?: string;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextField: React.FC<TextFieldProps> = ({
    title,
    register,
    error,
    required = false,
    type = 'text',
    placeholder,
    disabled = false,
    helperText,
    className = '',
    variant = 'default',
    size = 'md',
    icon,
    maxLength,
    multiline = false,
    rows = 3,
    minRows = 2,
    maxRows = 10,
    resize = 'vertical',
}) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const hasError = !!errorMessage;

    // Size classes for input
    const inputSizeClasses = {
        sm: 'px-3 py-2 h-9 text-sm',
        md: 'px-4 py-3 h-11 text-base',
        lg: 'px-5 py-4 h-13 text-lg',
    };

    // Size classes for textarea
    const textareaSizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
    };

    // Resize classes
    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
    };

    // Variant classes
    const variantClasses = {
        default: 'bg-white border-2 border-gray-300 focus:border-primary-500 focus:bg-white',
        filled: 'bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white',
        outlined: 'bg-transparent border-2 border-gray-400 focus:border-primary-500',
    };

    // Base input/textarea classes
    const baseClasses = `
    w-full rounded-xl transition-all duration-300 ease-in-out
    placeholder:text-gray-400 text-gray-900
    focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-primary-500/20
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
    ${hasError
            ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/20'
            : ''
        }
    ${variantClasses[variant]}
  `;

    const inputClasses = `${baseClasses} ${inputSizeClasses[size]}`;
    const textareaClasses = `${baseClasses} ${textareaSizeClasses[size]} ${resizeClasses[resize]} leading-relaxed`;

    return (
        <div className={`flex flex-col w-full max-w-sm ${className}`}>
            {/* Label */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                    <label className="font-semibold text-gray-700 text-sm">
                        {title}
                    </label>
                    {required && (
                        <span className="text-red-500 text-sm font-medium" aria-label="required">
                            *
                        </span>
                    )}
                </div>
                {maxLength && (
                    <span className="text-xs text-gray-400">
                        {register.name && typeof register.value === 'string' ? `${register.value.length}/${maxLength}` : `0/${maxLength}`}
                    </span>
                )}
            </div>

            {/* Input Container */}
            <div className="relative">
                {icon && !multiline && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                        {icon}
                    </div>
                )}

                {icon && multiline && (
                    <div className="absolute left-3 top-3 text-gray-400 pointer-events-none z-10">
                        {icon}
                    </div>
                )}

                {multiline ? (
                    <textarea
                        {...register}
                        disabled={disabled}
                        maxLength={maxLength}
                        placeholder={placeholder || title}
                        rows={rows}
                        style={{
                            minHeight: `${minRows * 1.5}rem`,
                            maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
                        }}
                        className={`
              ${textareaClasses}
              ${icon ? 'pl-10' : ''}
            `}
                        aria-invalid={hasError}
                        aria-describedby={
                            errorMessage ? `${register.name}-error` :
                                helperText ? `${register.name}-helper` : undefined
                        }
                    />
                ) : (
                    <input
                        {...register}
                        type={type}
                        disabled={disabled}
                        maxLength={maxLength}
                        placeholder={placeholder || title}
                        className={`
              ${inputClasses}
              ${icon ? 'pl-10' : ''}
            `}
                        aria-invalid={hasError}
                        aria-describedby={
                            errorMessage ? `${register.name}-error` :
                                helperText ? `${register.name}-helper` : undefined
                        }
                    />
                )}

                {/* Status Icons */}
                <div className={`absolute right-3 ${multiline ? 'top-3' : 'top-1/2 transform -translate-y-1/2'}`}>
                    {hasError && (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Helper Text / Error Message */}
            <div className="mt-1 min-h-[1.25rem]">
                {errorMessage && (
                    <span
                        id={`${register.name}-error`}
                        className="text-red-500 text-xs font-medium flex items-center gap-1"
                        role="alert"
                    >
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorMessage}
                    </span>
                )}

                {!errorMessage && helperText && (
                    <span
                        id={`${register.name}-helper`}
                        className="text-gray-500 text-xs"
                    >
                        {helperText}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TextField;

// Usage Examples:

/*
// Basic usage
<TextField
  title="Email"
  register={register('email')}
  error={errors.email}
  required
  type="email"
/>

// With icon and helper text
<TextField
  title="Search"
  register={register('search')}
  type="search"
  icon={<SearchIcon />}
  helperText="Search for articles, videos, or categories"
  variant="filled"
/>

// Different sizes and variants
<TextField
  title="Large Input"
  register={register('large')}
  size="lg"
  variant="outlined"
  maxLength={100}
/>

// With custom styling
<TextField
  title="Custom Field"
  register={register('custom')}
  className="w-80"
  placeholder="Enter custom value..."
  disabled={isLoading}
/>
*/