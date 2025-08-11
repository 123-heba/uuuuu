import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TripCard from '@/components/TripCard';
import UserCard from '@/components/UserCard';
import { 
  MapPin,
  TrendingUp,
  Users,
  PlusCircle,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading more content
    setTimeout(() => {
      setIsLoadingMore(false);
      // In a real app, you'd fetch more trips here
    }, 1000);
  };

  const categories = [
    'Adventure', 'Beach', 'Culture', 'Nature', 'City', 'Food', 'History', 'Photography'
  ];

  // Mock trip data for the feed
  const feedTrips = [
    {
      id: '1',
      title: 'Hidden Gems of Northern Thailand',
      description: 'Discovered some incredible off-the-beaten-path locations in Chiang Rai province. The local villages, temples, and mountain views were absolutely breathtaking. This trip changed my perspective on slow travel.',
      images: ['https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop'],
      location: { country: 'Thailand', city: 'Chiang Rai' },
      category: 'Culture',
      rating: 4.9,
      duration: '8 days',
      author: { 
        id: 'user1', 
        name: 'Sarah Johnson', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 342,
      comments: 67,
      isLiked: false,
      createdAt: '2024-01-16'
    },
    {
      id: '2',
      title: 'Epic Road Trip Across Iceland',
      description: 'Three weeks driving around the Ring Road and exploring the Westfjords. Every day brought new waterfalls, glaciers, and volcanic landscapes. Iceland truly is the land of fire and ice!',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
      location: { country: 'Iceland', city: 'Reykjavik' },
      category: 'Adventure',
      rating: 4.8,
      duration: '21 days',
      author: { 
        id: 'user2', 
        name: 'Alex Martinez', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 289,
      comments: 45,
      isLiked: true,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      title: 'Street Food Adventure in Vietnam',
      description: 'Spent two weeks eating my way through Vietnam from Hanoi to Ho Chi Minh City. Every meal was an adventure and the local flavors are incredible. Must-try: Pho, Banh Mi, and fresh spring rolls!',
      images: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=800&h=600&fit=crop'],
      location: { country: 'Vietnam', city: 'Hanoi' },
      category: 'Food',
      rating: 4.7,
      duration: '14 days',
      author: { 
        id: 'user3', 
        name: 'Maria Rodriguez', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 198,
      comments: 32,
      isLiked: false,
      createdAt: '2024-01-14'
    },
    {
      id: '4',
      title: 'Sunrise at Angkor Wat',
      description: 'Finally made it to Cambodia and witnessed one of the most spectacular sunrises of my life at Angkor Wat. The ancient temples and rich history of this place is absolutely mind-blowing.',
      images: ['https://images.unsplash.com/photo-1539179355541-6bd0c40b8105?w=800&h=600&fit=crop'],
      location: { country: 'Cambodia', city: 'Siem Reap' },
      category: 'History',
      rating: 4.9,
      duration: '5 days',
      author: { 
        id: 'user4', 
        name: 'David Kim', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 425,
      comments: 78,
      isLiked: true,
      createdAt: '2024-01-13'
    }
  ];

  // Mock suggested users
  const suggestedUsers = [
    {
      id: 'suggested1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'Barcelona, Spain',
      tripsCount: 45,
      followersCount: 3200,
      isFollowing: false
    },
    {
      id: 'suggested2',
      name: 'James Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Tokyo, Japan',
      tripsCount: 38,
      followersCount: 2800,
      isFollowing: false
    },
    {
      id: 'suggested3',
      name: 'Luna Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Rio de Janeiro, Brazil',
      tripsCount: 52,
      followersCount: 4100,
      isFollowing: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Post Button */}
            <Card>
              <CardContent className="p-4">
                <Button className="w-full" asChild>
                  <Link to="/create-trip">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Share Your Trip
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setActiveCategory(activeCategory === category ? '' : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feed Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Travel Feed</h1>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Trip Posts */}
            <div className="space-y-6">
              {(() => {
                const filteredTrips = feedTrips.filter(trip => {
                  // Filter by search query
                  if (searchQuery && !trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                      !trip.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
                      !trip.location.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
                      !trip.location.country.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return false;
                  }
                  // Filter by category
                  if (activeCategory && trip.category !== activeCategory) {
                    return false;
                  }
                  return true;
                });

                if (filteredTrips.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🗺️</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No trips found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search or filters to find more adventures.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  );
                }

                return filteredTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ));
              })()}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? 'Loading...' : 'Load More Adventures'}
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Suggested Users & Trending */}
          <div className="lg:col-span-1 space-y-6">
            {/* Suggested Travelers */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Suggested Travelers</h3>
                </div>
                <div className="space-y-4">
                  {suggestedUsers.map((user) => (
                    <UserCard key={user.id} user={user} variant="compact" />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/explore">
                    Discover More
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Trending Destinations */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Trending Destinations</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Bali, Indonesia', posts: 234 },
                    { name: 'Santorini, Greece', posts: 189 },
                    { name: 'Kyoto, Japan', posts: 156 },
                    { name: 'Machu Picchu, Peru', posts: 145 },
                    { name: 'Banff, Canada', posts: 132 }
                  ].map((destination, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{destination.name}</p>
                        <p className="text-xs text-muted-foreground">{destination.posts} posts</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;