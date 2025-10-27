'use client';

import {
  Bell,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  type: 'booking' | 'message' | 'payment' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Accepted',
    message:
      'Your house cleaning service booking has been accepted by Clean Express.',
    time: '5 minutes ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'Maria Santos sent you a message regarding your tutoring session.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your payment of ₱450 for laundry service has been processed.',
    time: '3 hours ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Upcoming Service',
    message:
      'Reminder: Your home repair service is scheduled for tomorrow at 1:00 PM.',
    time: '5 hours ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'booking',
    title: 'Booking Completed',
    message:
      'Your pet grooming service has been marked as completed. Please leave a review.',
    time: '1 day ago',
    isRead: true,
  },
];

export function NotificationsDialog({
  isOpen,
  onClose,
}: NotificationDialogProps) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-5 h-5 text-hanapp-primary" />;
      case 'message':
        return <Bell className="w-5 h-5 text-hanapp-primary" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-hanapp-primary" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-hanapp-primary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-hanapp-primary" />;
    }
  };

  const handleViewAll = () => {
    onClose();
    router.push('/notifications');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed top-16 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-[600px] flex flex-col border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-hanapp-secondary">
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notificationsData.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-hanapp-secondary">
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer - View All */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleViewAll}
            className="w-full py-2 text-center text-sm font-medium text-hanapp-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
}
