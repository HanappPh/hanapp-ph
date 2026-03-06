import { Check, type LucideIcon } from 'lucide-react';

interface Step {
  label: string;
  icon: LucideIcon;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  theme?: 'primary' | 'accent';
}

export function FormStepper({
  steps,
  currentStep,
  theme = 'primary',
}: FormStepperProps) {
  const completedClasses =
    theme === 'accent'
      ? 'bg-hanapp-accent border-2 border-hanapp-accent text-gray-900'
      : 'bg-hanapp-primary border-2 border-hanapp-primary text-white';
  const activeClasses =
    theme === 'accent'
      ? 'bg-white border-2 border-hanapp-accent text-gray-900'
      : 'bg-white border-2 border-hanapp-primary text-hanapp-primary';
  const activeTextClass =
    theme === 'accent' ? 'text-gray-900' : 'text-hanapp-primary';
  const connectorClass =
    theme === 'accent' ? 'bg-hanapp-accent' : 'bg-hanapp-primary';
  const progressPercent =
    steps.length > 1
      ? (Math.max(0, Math.min(currentStep, steps.length - 1)) /
          (steps.length - 1)) *
        100
      : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 md:px-6 relative">
      {steps.length > 1 && (
        <>
          <div className="absolute left-6 right-6 md:left-8 md:right-8 top-[22px] h-0.5 bg-gray-300 rounded-full" />
          <div
            className={`absolute left-6 md:left-8 top-[22px] h-0.5 rounded-full transition-all duration-300 ${connectorClass}`}
            style={{
              width: `calc((100% - 3rem) * ${progressPercent / 100})`,
              maxWidth: 'calc(100% - 3rem)',
            }}
          />
        </>
      )}

      <div className="relative z-10 flex items-start justify-between w-full gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="flex flex-col items-center justify-start gap-2 min-w-0 flex-1"
            >
              <div className="flex items-center justify-center bg-white rounded-full">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? completedClasses
                      : isActive
                        ? activeClasses
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
              </div>
              <span
                className={`text-sm font-medium text-center leading-tight whitespace-nowrap ${
                  isActive ? activeTextClass : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
