import { Badge } from '@hanapp-ph/commons';

interface BookingStatusBadgeProps {
  status:
    | 'Pending'
    | 'Accepted'
    | 'Paid'
    | 'Completed'
    | 'Rejected'
    | 'Cancelled';
}
export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  let className = 'px-2 py-1 rounded-full font-semibold text-xs ';

  switch (status) {
    case 'Accepted':
      className += 'bg-blue-600 text-white';
      break;

    case 'Paid':
      className += 'bg-transparent border border-green-700 text-green-700';
      break;

    case 'Pending':
      className += 'bg-transparent border border-blue-600 text-blue-600';
      break;

    case 'Completed':
      className += 'bg-green-200 text-green-800';
      break;

    case 'Rejected':
      className += 'bg-red-600 text-white';
      break;

    case 'Cancelled':
      className += 'bg-gray-200 text-gray-800';
      break;

    default:
      className += 'bg-gray-200 text-gray-800';
      break;
  }

  return <Badge className={className}>{status}</Badge>;
}
