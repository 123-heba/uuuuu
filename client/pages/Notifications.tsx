import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, UserPlus, Camera, Bell, BellRing, Filter, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'trip_share' | 'general';
    title: string;
    message: string;
    user?: {
      id: string;
      name: string;
      avatar?: string;
    };
    trip?: {
      id: string;
      title: string;
      image?: string;
    };
    isRead: boolean;
    createdAt: string;
  };
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'trip_share':
        return <Camera className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionLink = () => {
    switch (notification.type) {
      case 'like':
      case 'comment':
      case 'trip_share':
        return notification.trip ? `/trip/${notification.trip.id}` : '#';
      case 'follow':
        return notification.user ? `/profile/${notification.user.id}` : '#';
      default:
        return '#';
    }
  };

  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Link 
      to={getActionLink()}
      onClick={handleClick}
      className={cn(
        "block p-4 hover:bg-gray-50 transition-colors border-b",
        !notification.isRead && "bg-blue-50 border-l-4 border-l-primary"
      )}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
          {getIcon()}
        </div>

        {/* User Avatar (if applicable) */}
        {notification.user && (
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={cn(
                "text-sm",
                !notification.isRead ? "font-medium" : "font-normal"
              )}>
                <span className="font-medium">{notification.title}</span>
                {notification.message && (
                  <span className="text-muted-foreground ml-1">
                    {notification.message}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Trip thumbnail (if applicable) */}
            {notification.trip?.image && (
              <div className="ml-3 flex-shrink-0">
                <img
                  src={notification.trip.image}
                  alt={notification.trip.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {notification.type === 'follow' && (
            <div className="mt-2">
              <Button size="sm" variant="outline">
                Follow Back
              </Button>
            </div>
          )}
        </div>

        {/* Unread indicator */}
        {!notification.isRead && (
          <div className="flex-shrink-0">
            <Badge variant="default" className="h-2 w-2 p-0 rounded-full">
              <span className="sr-only">Unread</span>
            </Badge>
          </div>
        )}
      </div>
    </Link>
  );
};

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'like' as const,
      title: 'Sarah Johnson liked your trip',
      message: '"Amazing sunset views in Santorini"',
      user: {
        id: 'user1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      trip: {
        id: 'trip1',
        title: 'Amazing sunset views in Santorini',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=100&h=100&fit=crop'
      },
      isRead: false,
      createdAt: '2024-01-16T10:30:00Z'
    },
    {
      id: '2',
      type: 'comment' as const,
      title: 'Alex Martinez commented on your trip',
      message: '"This place looks incredible! Adding it to my bucket list."',
      user: {
        id: 'user2',
        name: 'Alex Martinez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      trip: {
        id: 'trip1',
        title: 'Amazing sunset views in Santorini',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=100&h=100&fit=crop'
      },
      isRead: false,
      createdAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '3',
      type: 'follow' as const,
      title: 'Maria Rodriguez started following you',
      message: 'Check out her amazing photography from Japan!',
      user: {
        id: 'user3',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      isRead: true,
      createdAt: '2024-01-15T16:45:00Z'
    },
    {
      id: '4',
      type: 'trip_share' as const,
      title: 'David Kim shared a new trip',
      message: '"Cultural Journey Through Morocco" - 12 days of incredible experiences',
      user: {
        id: 'user4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      trip: {
        id: 'trip2',
        title: 'Cultural Journey Through Morocco',
        image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=100&h=100&fit=crop'
      },
      isRead: true,
      createdAt: '2024-01-15T14:20:00Z'
    },
    {
      id: '5',
      type: 'like' as const,
      title: 'Emma Wilson and 12 others liked your trip',
      message: '"Street Food Adventure in Thailand"',
      user: {
        id: 'user5',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      trip: {
        id: 'trip3',
        title: 'Street Food Adventure in Thailand',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=100&h=100&fit=crop'
      },
      isRead: true,
      createdAt: '2024-01-15T11:30:00Z'
    },
    {
      id: '6',
      type: 'general' as const,
      title: 'Weekly Travel Roundup',
      message: 'Discover the top 5 trending destinations this week and get inspired for your next adventure!',
      isRead: true,
      createdAt: '2024-01-15T08:00:00Z'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'interactions') return ['like', 'comment'].includes(notification.type);
    if (filter === 'follows') return notification.type === 'follow';
    if (filter === 'trips') return notification.type === 'trip_share';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-8 w-8 text-primary" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">
                  Stay updated with your travel community
                  {unreadCount > 0 && (
                    <span className="ml-2 text-primary font-medium">
                      {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <BellRing className="h-4 w-4" />
                  <span>All</span>
                  <Badge variant="secondary" className="ml-1">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge className="ml-1">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="interactions">
                  Interactions
                </TabsTrigger>
                <TabsTrigger value="follows">
                  Follows
                </TabsTrigger>
                <TabsTrigger value="trips">
                  Trips
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : "When people interact with your trips, you'll see notifications here."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Load older notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;