import { Card, CardContent } from '@hanapp-ph/commons';
import { Star, MessageSquare } from 'lucide-react';

interface statsProps {
  totalEarnings: number;
  rating: number;
  responseRate: number;
  searchVisibility: number;
  profileViews: number;
}

export function DashboardStats({
  totalEarnings,
  rating,
  responseRate,
  searchVisibility,
  profileViews,
}: statsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Earnings */}
        <Card className="bg-[#F5C45E] border-0 col-span-1 md:col-span-5 shadow-md">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center h-full">
            <div>
              <div className="text-lg text-[#102E50] mb-2">Total Earnings</div>
              {/* 2.75rem in between 4xl and 5xl */}
              <div className="text-4xl md:text-[2.75rem] lg:text-6xl font-bold text-[#102E50]">
                {totalEarnings.toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating and Response Rate */}
        <Card className="bg-white border-0 shadow-md md:col-span-3">
          <CardContent className="p-6 text-[#102E50]">
            <div className="mb-4">
              <div className="sm:text-sm lg:text-md mb-2">Rating</div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400 -translate-y-1" />
                <span className="text-2xl font-bold">{rating}</span>
              </div>
            </div>
            <div>
              <div className="sm:text-sm lg:text-md mb-2">Response Rate</div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 fill-amber-400 text-amber-400 -translate-y-1" />
                <span className="text-2xl font-bold">{responseRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Visibility and Profile Views*/}
        <Card className="bg-white border-0 shadow-md md:col-span-3">
          <CardContent className="p-6 text-[#102E50]">
            <div className="mb-4">
              <div className="sm:text-sm lg:text-md mb-2">
                Search visibility
              </div>
              <div className="text-2xl font-bold">{searchVisibility}</div>
            </div>
            <div>
              <div className="sm:text-sm lg:text-md mb-2">Profile views</div>
              <div className="text-2xl font-bold">{profileViews}</div>
            </div>
          </CardContent>
        </Card>

        {/* See more stats */}
        <div className="flex items-center text-center">
          See more of your stats &gt;
        </div>
      </div>
    </section>
  );
}
