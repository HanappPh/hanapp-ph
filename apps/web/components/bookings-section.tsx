import { Badge, Card, CardContent } from '@hanapp-ph/commons';
import { CheckCircle } from 'lucide-react';

export function BookingsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your bookings</h2>

      <div className="space-y-4">
        {/* Pending Booking */}
        <Card className="bg-orange-200 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Laundry - Booking Request</div>
                  <div className="text-sm text-muted-foreground">
                    Marina Santos • 5 mins ago
                  </div>
                </div>
              </div>
              {/* <div className="bg-orange-100 text-orange-700 hover:bg-orange-100 px-3 py-2 rounded-lg font-medium">Pending</div> */}
              <Badge className="bg-orange-500 text-white border-0 px-3 py-1">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Completed Booking */}
        <Card className="bg-green-200 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-700" />
                <div>
                  <div className="font-medium">Babysitting Completed</div>
                  <div className="text-sm text-muted-foreground">
                    Jeremy Lee • 5 hours ago
                  </div>
                </div>
              </div>
              <Badge className="bg-green-700 text-white border-0 px-3 py-1">
                ₱850.00
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
