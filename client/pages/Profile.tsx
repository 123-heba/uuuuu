import { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TripCard from '@/components/TripCard';
import UserCard from '@/components/UserCard';
import EditProfileDialog from '@/components/EditProfileDialog';
import { useAuth } from '@/contexts/AuthContext';
import {
  Settings,
  MapPin,
  Calendar,
  Camera,
  Users,
  Heart,
  Star,
  Edit3,
  Compass,
  Trophy,
  Globe,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trips');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Mock followers/following (defined first to avoid circular dependency)
  const followers = [
    {
      id: 'follower1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'London, UK',
      tripsCount: 23,
      followersCount: 1200,
      isFollowing: true
    },
    {
      id: 'follower2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Singapore',
      tripsCount: 34,
      followersCount: 2800,
      isFollowing: false
    }
  ];

  // Mock user trips
  const userTrips = [
    {
      id: '1',
      title: 'Sunrise at Machu Picchu',
      description: 'An incredible journey to Peru and the ancient citadel of Machu Picchu. The sunrise views were absolutely breathtaking!',
      images: ['https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop'],
      location: { country: 'Peru', city: 'Cusco' },
      category: 'Adventure',
      rating: 4.9,
      duration: '8 days',
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      likes: 456,
      comments: 67,
      isLiked: false,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Cherry Blossoms in Kyoto',
      description: 'Perfect timing for the cherry blossom season in Japan. The temples and gardens were incredibly beautiful.',
      images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop'],
      location: { country: 'Japan', city: 'Kyoto' },
      category: 'Culture',
      rating: 4.8,
      duration: '10 days',
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      likes: 234,
      comments: 34,
      isLiked: true,
      createdAt: '2024-01-05'
    }
  ];

  // Extended user data with profile-specific information
  const currentUser = {
    id: user.id,
    name: user.name,
    username: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
    avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    bio: 'Passionate traveler exploring the world one destination at a time. Adventure seeker, culture enthusiast, and photographer. Currently on a mission to visit all 7 continents! 🌍✈️',
    location: 'San Francisco, CA',
    website: 'example.com',
    joinDate: '2022-03-15',
    isVerified: user.isVerified || false,
    stats: {
      trips: userTrips.length,
      followers: followers.length,
      following: followers.length,
      likes: userTrips.reduce((total, trip) => total + trip.likes, 0),
      countries: new Set(userTrips.map(trip => trip.location.country)).size
    }
  };

  const achievements = [
    { icon: Globe, title: 'World Explorer', description: 'Visited 30+ countries', earned: true },
    { icon: Trophy, title: 'Top Contributor', description: 'Most liked trips this month', earned: true },
    { icon: Camera, title: 'Photography Master', description: 'Amazing photo quality', earned: true },
    { icon: Star, title: 'Adventure Seeker', description: 'Completed 10 adventure trips', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cover Photo & Profile Info */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 md:h-80 bg-gradient-to-r from-primary to-accent rounded-b-2xl overflow-hidden">
            <img
              src={currentUser.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2">
                  <Button size="sm" className="rounded-full h-8 w-8 p-0">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                  {currentUser.isVerified && (
                    <Badge className="bg-blue-500">Verified</Badge>
                  )}
                </div>
                <p className="text-gray-600">{currentUser.username}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{currentUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(currentUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <EditProfileDialog />
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed max-w-2xl">{currentUser.bio}</p>
              {currentUser.website && (
                <a href={`https://${currentUser.website}`} className="text-primary hover:underline mt-2 inline-block">
                  {currentUser.website}
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-6 mt-6 py-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentUser.stats.trips}</div>
                <div className="text-sm text-gray-600">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentUser.stats.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentUser.stats.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentUser.stats.likes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentUser.stats.countries}</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* My Trips */}
            <TabsContent value="trips">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">My Travel Stories</h3>
                  <Button asChild>
                    <Link to="/create-trip">
                      <Camera className="h-4 w-4 mr-2" />
                      Share New Trip
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Followers */}
            <TabsContent value="followers">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{currentUser.stats.followers.toLocaleString()} Followers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {followers.map((follower) => (
                    <UserCard key={follower.id} user={follower} variant="compact" />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Following */}
            <TabsContent value="following">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{currentUser.stats.following} Following</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {followers.map((follower) => (
                    <UserCard key={follower.id} user={follower} variant="compact" />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Travel Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`${achievement.earned ? 'border-primary bg-primary/5' : 'border-gray-200 opacity-60'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${achievement.earned ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{achievement.title}</h4>
                            <p className="text-gray-600">{achievement.description}</p>
                            {achievement.earned && (
                              <Badge className="mt-2">Earned</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;