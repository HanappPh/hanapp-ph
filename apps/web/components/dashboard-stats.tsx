import { Button, Card, CardContent } from '@hanapp-ph/commons';
import { Star } from 'lucide-react';

export function DashboardStats() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Earnings */}
        <Card className="bg-[#F5C45E] border-0 col-span-1 md:col-span-2">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center h-full">
            <div>
              <div className="text-lg text-[#102E50] mb-2">Total Earnings</div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#102E50]">
                ₱ 12,450.00
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating and Response Rate */}
        <Card className="bg-white border-0 shadow-md">
          <CardContent className="p-6 text-[#102E50]">
            <div className="mb-4">
              <div className="sm:text-sm lg:text-md mb-2">Rating</div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-2xl font-bold">4.8</span>
              </div>
            </div>
            <div>
              <div className="sm:text-sm lg:text-md mb-2">Response Rate</div>
              <div className="text-2xl font-bold">98%</div>
            </div>
          </CardContent>
        </Card>

        {/* Search Visibility and Profile Views*/}
        <Card className="bg-white border-0 shadow-md">
          <CardContent className="p-6 text-[#102E50]">
            <div className="mb-4">
              <div className="sm:text-sm lg:text-md mb-2">
                Search visibility
              </div>
              <div className="text-2xl font-bold">11</div>
            </div>
            <div>
              <div className="sm:text-sm lg:text-md mb-2">Profile views</div>
              <div className="text-2xl font-bold">4</div>
            </div>
          </CardContent>
        </Card>

        {/* See More Stats Button at Bottom Right */}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          className="bg-white border-0 shadow-md px-6 py-3 rounded font-semibold text-[#102E50] hover:bg-gray-100 transition"
          type="button"
        >
          See more of your stats &gt;
        </Button>
      </div>
    </section>
  );
}
