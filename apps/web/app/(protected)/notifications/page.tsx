'use client';

import { Bell, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: number;
  type: 'booking' | 'message' | 'payment' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const allNotifications: Notification[] = [
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
  {
    id: 6,
    type: 'message',
    title: 'New Message',
    message: 'John Doe replied to your inquiry about handyman services.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 7,
    type: 'booking',
    title: 'Booking Cancelled',
    message: 'Your plumbing service booking for Jan 25 has been cancelled.',
    time: '3 days ago',
    isRead: true,
  },
  {
    id: 8,
    type: 'reminder',
    title: 'Service Reminder',
    message: 'You have a tutoring session scheduled in 2 hours.',
    time: '1 week ago',
    isRead: true,
  },
  {
    id: 9,
    type: 'payment',
    title: 'Refund Processed',
    message: 'Your refund of ₱800 has been processed successfully.',
    time: '1 week ago',
    isRead: true,
  },
  {
    id: 10,
    type: 'booking',
    title: 'New Booking Request',
    message: 'You have a new booking request for garden maintenance.',
    time: '2 weeks ago',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

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

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const filteredNotifications =
    filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-hanapp-secondary mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with your bookings and messages
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-hanapp-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Notifications
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-hanapp-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-hanapp-primary hover:text-hanapp-secondary font-medium text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No notifications
              </h3>
              <p className="text-gray-500">
                {filter === 'unread'
                  ? "You're all caught up! No unread notifications."
                  : 'You have no notifications at the moment.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 ${
                  index !== filteredNotifications.length - 1
                    ? 'border-b border-gray-200'
                    : ''
                } hover:bg-gray-50 cursor-pointer transition-colors ${
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
                        <span className="w-2 h-2 bg-hanapp-primary rounded-full flex-shrink-0 mt-1" />
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
