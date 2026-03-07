import type { LucideIcon } from 'lucide-react';

export interface Step {
  label: string;
  icon: LucideIcon;
}

export interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  theme?: 'primary' | 'accent';
}
