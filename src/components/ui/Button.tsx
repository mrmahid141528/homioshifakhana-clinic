import { ButtonHTMLAttributes, ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'whatsapp';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = "font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary-dark-green text-white hover:bg-teal-800",
        whatsapp: "bg-accent-gold text-white hover:bg-yellow-600 shadow-lg",
    };

    const width = fullWidth ? "w-full" : "w-auto";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${width} ${className}`}
            {...props}
        >
            {variant === 'whatsapp' && <MessageCircle size={20} />}
            {children}
        </button>
    );
}
