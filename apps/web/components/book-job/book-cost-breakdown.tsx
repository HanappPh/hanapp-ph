import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@hanapp-ph/commons';

import { Service } from './book-select-services';
interface CostBreakdownCardProps {
  selectedServices: Service[];
  customServices: Service[];
  total: number;
}

export function CostBreakdownCard({
  selectedServices,
  customServices,
  total,
}: CostBreakdownCardProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg text-hanapp-secondary">
          Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedServices.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-hanapp-primary">
              Selected Services
            </p>
            {selectedServices.map(s => (
              <div
                key={s.id}
                className="flex justify-between text-sm text-hanapp-secondary"
              >
                <span>{s.name}</span>
                <span className="font-medium">₱{s.rate}</span>
              </div>
            ))}
          </div>
        )}

        {customServices.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-hanapp-primary">
              Custom Services
            </p>
            {customServices.map(s => (
              <div
                key={s.id}
                className="flex justify-between text-sm text-hanapp-secondary"
              >
                <span>{s.name || 'Unnamed Service'}</span>
                <span className="font-medium">
                  ₱{Number(s.rate).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-hanapp-secondary">Total</span>
          <span className="text-2xl font-bold text-hanapp-primary">
            ₱{total.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Prices include all agreed-upon services. Payment will be processed
          after you review the terms.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-hanapp-primary text-white hover:bg-hanapp-secondary text-md"
          size="lg"
        >
          Process Booking
        </Button>
      </CardFooter>
    </Card>
  );
}
