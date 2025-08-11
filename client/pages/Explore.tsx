import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TripCard from '@/components/TripCard';
import UserCard from '@/components/UserCard';
import { 
  Search,
  MapPin,
  Filter,
  TrendingUp,
  Globe,
  Star,
  Users,
  Camera,
  Mountain,
  Waves,
  Building,
  Utensils,
  Calendar
} from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('destinations');

  const categories = [
    { id: 'all', label: 'All', icon: Globe, count: 2340 },
    { id: 'adventure', label: 'Adventure', icon: Mountain, count: 456 },
    { id: 'beach', label: 'Beach', icon: Waves, count: 342 },
    { id: 'city', label: 'City', icon: Building, count: 567 },
    { id: 'food', label: 'Food', icon: Utensils, count: 234 },
    { id: 'culture', label: 'Culture', icon: Calendar, count: 298 }
  ];

  const destinations = [
    {
      id: '1',
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      tripsCount: 234,
      rating: 4.8,
      description: 'Tropical paradise with stunning temples and rice terraces',
      category: 'beach',
      trending: true
    },
    {
      id: '2', 
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
      tripsCount: 189,
      rating: 4.9,
      description: 'Iconic white-washed buildings and breathtaking sunsets',
      category: 'culture',
      trending: true
    },
    {
      id: '3',
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      tripsCount: 156,
      rating: 4.7,
      description: 'Ancient temples and traditional Japanese culture',
      category: 'culture',
      trending: false
    },
    {
      id: '4',
      name: 'Banff, Canada',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tripsCount: 132,
      rating: 4.8,
      description: 'Majestic mountains and pristine alpine lakes',
      category: 'adventure',
      trending: false
    },
    {
      id: '5',
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop',
      tripsCount: 145,
      rating: 4.9,
      description: 'Ancient Incan citadel in the Andes Mountains',
      category: 'adventure',
      trending: true
    },
    {
      id: '6',
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
      tripsCount: 198,
      rating: 4.6,
      description: 'Modern city with luxury shopping and architecture',
      category: 'city',
      trending: false
    }
  ];

  const featuredTrips = [
    {
      id: '1',
      title: 'Hidden Temples of Angkor Wat',
      description: 'Exploring the lesser-known temples and discovering incredible sunrise views away from the crowds.',
      images: ['https://images.unsplash.com/photo-1539179355541-6bd0c40b8105?w=800&h=600&fit=crop'],
      location: { country: 'Cambodia', city: 'Siem Reap' },
      category: 'Culture',
      rating: 4.9,
      duration: '5 days',
      author: { 
        id: 'user1', 
        name: 'Emma Chen', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 425,
      comments: 78,
      isLiked: false,
      createdAt: '2024-01-14'
    },
    {
      id: '2',
      title: 'Northern Lights Adventure in Iceland',
      description: 'Epic road trip through Iceland chasing the Northern Lights and exploring ice caves.',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
      location: { country: 'Iceland', city: 'Reykjavik' },
      category: 'Adventure',
      rating: 4.8,
      duration: '12 days',
      author: { 
        id: 'user2', 
        name: 'Marcus Rodriguez', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' 
      },
      likes: 567,
      comments: 89,
      isLiked: true,
      createdAt: '2024-01-12'
    }
  ];

  const topTravelers = [
    {
      id: 'user1',
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Temple enthusiast and cultural explorer',
      location: 'Singapore',
      tripsCount: 45,
      followersCount: 3200,
      isFollowing: false,
      isVerified: true
    },
    {
      id: 'user2',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Adventure photographer and mountain climber',
      location: 'Denver, USA',
      tripsCount: 67,
      followersCount: 5400,
      isFollowing: false,
      isVerified: true
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fac285223133d4c4690a07a25427a1573%2F7ae77806540645af89506e260a82309c?format=webp&width=800"
              alt="RAHALA"
              className="h-12 w-12 rounded-full object-cover mr-4"
            />
            <h1 className="text-4xl font-bold text-gray-900">Explore the World</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations, get inspired by fellow travelers, and plan your next adventure
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search destinations, cities, or countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="trips">Featured Trips</TabsTrigger>
            <TabsTrigger value="travelers">Top Travelers</TabsTrigger>
          </TabsList>

          {/* Destinations Tab */}
          <TabsContent value="destinations">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      activeCategory === category.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div className={`p-2 rounded-full ${
                          activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100'
                        }`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{category.label}</h4>
                      <p className="text-xs text-gray-500">{category.count} trips</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {activeCategory === 'all' ? 'Popular Destinations' : `${categories.find(c => c.id === activeCategory)?.label} Destinations`}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{filteredDestinations.length} destinations found</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      {destination.trending && (
                        <Badge className="absolute top-3 right-3 bg-red-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/50 rounded-lg p-2 text-white">
                          <h4 className="font-semibold text-lg">{destination.name}</h4>
                          <p className="text-sm opacity-90">{destination.description}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{destination.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Camera className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{destination.tripsCount} trips</span>
                          </div>
                        </div>
                        <Button size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Explore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Featured Trips Tab */}
          <TabsContent value="trips">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Featured Travel Experiences</h3>
              <p className="text-gray-600">Discover amazing trips shared by our community</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </TabsContent>

          {/* Top Travelers Tab */}
          <TabsContent value="travelers">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Top Travelers</h3>
              <p className="text-gray-600">Follow inspiring travelers and get exclusive insights</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTravelers.map((traveler) => (
                <UserCard key={traveler.id} user={traveler} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;
