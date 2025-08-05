// Global type definitions for the Vaulted application

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BannerProps extends ComponentProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  external?: boolean;
}

// Database types (extend as needed based on Prisma schema)
export interface DatabaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

// UI Component types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}