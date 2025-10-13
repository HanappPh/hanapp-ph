import { Badge, Card, CardContent } from '@hanapp-ph/commons';
import { CheckCircle } from 'lucide-react';

export function BookingsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-4">
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
