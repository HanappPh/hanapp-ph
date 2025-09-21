'use client';

import { Button } from '@hanapp-ph/commons';
import { useState } from 'react';

type ServiceOption = 'jobs' | 'services';

interface SignInServiceSelectorProps {
  onSelectionChange?: (selection: ServiceOption | null) => void;
  onCreateAccount?: (selection: ServiceOption | null) => void;
}

export default function ServiceSelector({
  onSelectionChange,
  onCreateAccount,
}: SignInServiceSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(
    null
  );

  const handleSelectionChange = (option: ServiceOption) => {
    const newSelection = selectedOption === option ? null : option;
    setSelectedOption(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleCreateAccount = () => {
    onCreateAccount?.(selectedOption);
  };

  const getButtonStyles = (option: ServiceOption) => {
    const isSelected = selectedOption === option;
    return `w-full py-6 px-6 text-base font-medium border-2 rounded-xl transition-all ${
      isSelected
        ? 'bg-[#F5C45E] text-[#102E50] border-[#F5C45E] hover:bg-[#F5C45E]/90'
        : 'bg-white text-[#102E50] border-white hover:bg-gray-50'
    }`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tagline at top right - positioned to align with brand header */}
      <div className="text-right mb-10 h-24 flex flex-col justify-center">
        <p className="text-2xl font-bold text-[#102E50] leading-tight">
          Find <span className="text-[#F5C45E]">Help</span>. Find{' '}
          <span className="text-[#F5C45E]">Income</span>.
        </p>
        <p className="text-2xl font-bold text-[#102E50] leading-tight">
          Find <span className="text-[#F5C45E]">Peace of Mind</span>.
        </p>
      </div>

      {/* Bordered Container - aligned with form start */}
      <div className="border-2 border-[#102E50] bg-gradient-to-b from-[#102E50] to-[#014182] rounded-2xl p-8 flex flex-col justify-center flex-1">
        {/* Selection Buttons */}
        <div className="space-y-8 mb-16 px-2.5">
          <Button
            variant="outline"
            className={getButtonStyles('jobs')}
            onClick={() => handleSelectionChange('jobs')}
          >
            <div className="text-center">
              <div>I&apos;m here to</div>
              <div className="font-bold">offer jobs</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className={getButtonStyles('services')}
            onClick={() => handleSelectionChange('services')}
          >
            <div className="text-center">
              <div>I&apos;m here to</div>
              <div className="font-bold">provide services</div>
            </div>
          </Button>
        </div>

        {/* Create Account Button */}
        <div className="px-2.5">
          <Button
            className="w-full py-4 px-6 text-base font-semibold bg-[#F5C45E] hover:bg-[#F5C45E]/90 text-[#102E50] rounded-xl shadow-lg transition-all border-0"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
