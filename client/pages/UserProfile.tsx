import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TripCard from '@/components/TripCard';
import UserCard from '@/components/UserCard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin,
  Calendar,
  Camera,
  Users,
  Heart,
  Star,
  Share2,
  MoreHorizontal,
  Compass,
  Trophy,
  Globe,
  UserPlus,
  UserCheck,
  MessageCircle
} from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('trips');
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserProfile = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on userId
      const mockUser = {
        id: userId,
        name: userId === 'sarah-johnson' ? 'Sarah Johnson' : 'Alex Thompson',
        username: `@${userId}`,
        avatar: userId === 'sarah-johnson' 
          ? 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
        bio: userId === 'sarah-johnson' 
          ? 'Passionate traveler exploring the world one destination at a time. Adventure seeker, culture enthusiast, and photographer. Currently on a mission to visit all 7 continents! 🌍✈️'
          : 'Digital nomad and travel photographer. Always seeking the next adventure and perfect shot. Love connecting with fellow travelers and sharing stories from the road.',
        location: userId === 'sarah-johnson' ? 'San Francisco, CA' : 'London, UK',
        website: userId === 'sarah-johnson' ? 'sarahtravels.com' : 'alexexplores.com',
        joinDate: '2022-03-15',
        isVerified: true,
        stats: {
          trips: userId === 'sarah-johnson' ? 47 : 32,
          followers: userId === 'sarah-johnson' ? 12500 : 8900,
          following: userId === 'sarah-johnson' ? 340 : 567,
          likes: userId === 'sarah-johnson' ? 25600 : 18300,
          countries: userId === 'sarah-johnson' ? 32 : 28
        }
      };

      setProfileUser(mockUser);
      setIsFollowing(Math.random() > 0.5); // Random following status
      setLoading(false);
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Show loading spinner while fetching data
  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect to own profile if viewing self
  if (isAuthenticated && currentUser && userId === currentUser.id) {
    return <Navigate to="/profile" replace />;
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // Here you would typically make an API call to follow/unfollow
  };

  // Mock user trips
  const userTrips = [
    {
      id: '1',
      title: 'Sunrise at Machu Picchu',
      description: 'An incredible journey to Peru and the ancient citadel of Machu Picchu.',
      images: ['https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop'],
      location: { country: 'Peru', city: 'Cusco' },
      category: 'Adventure',
      rating: 4.9,
      duration: '8 days',
      author: profileUser,
      likes: 456,
      comments: 67,
      isLiked: false,
      createdAt: '2024-01-10'
    }
  ];

  const achievements = [
    { icon: Globe, title: 'World Explorer', description: 'Visited 30+ countries', earned: true },
    { icon: Trophy, title: 'Top Contributor', description: 'Most liked trips this month', earned: true },
    { icon: Camera, title: 'Photography Master', description: 'Amazing photo quality', earned: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cover Photo & Profile Info */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 md:h-80 bg-gradient-to-r from-primary to-accent rounded-b-2xl overflow-hidden">
            <img
              src={profileUser.coverImage}
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
                  <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
                  <AvatarFallback className="text-2xl">{profileUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                  {profileUser.isVerified && (
                    <Badge className="bg-blue-500">Verified</Badge>
                  )}
                </div>
                <p className="text-gray-600">{profileUser.username}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(profileUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button onClick={handleFollowToggle}>
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed max-w-2xl">{profileUser.bio}</p>
              {profileUser.website && (
                <a href={`https://${profileUser.website}`} className="text-primary hover:underline mt-2 inline-block">
                  {profileUser.website}
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-6 mt-6 py-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profileUser.stats.trips}</div>
                <div className="text-sm text-gray-600">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profileUser.stats.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profileUser.stats.following}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profileUser.stats.likes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{profileUser.stats.countries}</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="trips">Travel Stories</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Trips */}
            <TabsContent value="trips">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{profileUser.name}'s Travel Stories</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
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
                    <Card key={index} className="border-primary bg-primary/5">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-full bg-primary text-white">
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{achievement.title}</h4>
                            <p className="text-gray-600">{achievement.description}</p>
                            <Badge className="mt-2">Earned</Badge>
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

export default UserProfile;
