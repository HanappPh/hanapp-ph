import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface SelectValueProps {}

export function Select({ children, className = '', ...props }: SelectProps) {
  return (
    <select className={className} {...props}>
      {children}
    </select>
  );
}

export function SelectTrigger({
  children,
  className = '',
}: SelectTriggerProps) {
  return <div className={className}>{children}</div>;
}

export function SelectContent({ children }: SelectContentProps) {
  return <div>{children}</div>;
}

export function SelectItem({ value, children }: SelectItemProps) {
  return <option value={value}>{children}</option>;
}

export function SelectValue(_props: SelectValueProps) {
  return null; // This would be handled by the select's value
}
