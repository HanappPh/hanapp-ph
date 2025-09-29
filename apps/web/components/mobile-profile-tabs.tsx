type MobileProfileTabsProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean | ((prev: boolean) => boolean)) => void;
  tabTextColor?: string;
  tabHoverBg?: string;
  tabSelectedBg?: string;
  tabSelectedTextColor?: string;
};

export function MobileProfileTabs({
  selectedTab,
  setSelectedTab,
  showDropdown,
  setShowDropdown,
  tabTextColor,
  tabHoverBg,
  tabSelectedBg,
  tabSelectedTextColor,
}: MobileProfileTabsProps) {
  return (
    <div className="w-full max-w-md mt-2 px-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-1">
        <div className="relative">
          <button
            className="flex items-center gap-2 font-semibold text-[#102E50] focus:outline-none"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            {selectedTab}
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#102E50"
              className={`inline-block transition-transform duration-200 ${showDropdown ? 'rotate-90' : ''}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md z-10">
              {['Profile', 'Payment', 'Billing', 'Addresses'].map(tab => {
                const isSelected = selectedTab === tab;
                const baseClass =
                  'w-full text-left px-4 py-2 transition-colors duration-150 font-semibold';
                const style = isSelected
                  ? {
                      backgroundColor: tabSelectedBg || undefined,
                      color: tabSelectedTextColor || undefined,
                    }
                  : {
                      color: tabTextColor || undefined,
                    };
                return (
                  <button
                    key={tab}
                    className={baseClass}
                    style={style}
                    onMouseEnter={e => {
                      if (!isSelected && tabHoverBg) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = tabHoverBg;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = '';
                      }
                    }}
                    onClick={() => {
                      setSelectedTab(tab);
                      setShowDropdown(false);
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button className="flex items-center text-xs text-[#102E50] font-semibold gap-1 hover:underline">
          Edit
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#102E50"
            className="inline-block ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 20h9"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
            />
          </svg>
        </button>
      </div>
      {/* Profile Information Section */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs py-2">
        <div>
          Email
          <br />
          <span className="font-medium text-[#0B2C4A]">andrevel@gmail.com</span>
        </div>
        <div>
          Member Since
          <br />
          <span className="font-medium text-[#0B2C4A]">May 2023</span>
        </div>
        <div>
          Phone
          <br />
          <span className="font-medium text-[#0B2C4A]">+63 0956 056 0560</span>
        </div>
        <div className="col-span-2">
          Location
          <br />
          <span className="font-medium text-[#0B2C4A]">Bacoor, Cavite</span>
        </div>
      </div>
    </div>
  );
}
