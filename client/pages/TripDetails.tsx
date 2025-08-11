import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommentSection from '@/components/CommentSection';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Star, 
  Camera,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TripDetails = () => {
  const { tripId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(342);

  // Mock trip data
  const trip = {
    id: tripId,
    title: 'Hidden Gems of Northern Thailand',
    description: 'Discovered some incredible off-the-beaten-path locations in Chiang Rai province. The local villages, temples, and mountain views were absolutely breathtaking. This trip changed my perspective on slow travel and showed me the beauty of connecting with local communities. Every moment was a new adventure, from exploring ancient temples to hiking through lush jungles and meeting incredible people along the way.',
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=1200&h=800&fit=crop'
    ],
    location: { country: 'Thailand', city: 'Chiang Rai' },
    category: 'Culture',
    rating: 4.9,
    duration: '8 days',
    author: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    likes: 342,
    comments: 67,
    createdAt: '2024-01-16',
    highlights: [
      'Visited 5 local temples',
      'Hiked through mountain villages',
      'Tried authentic northern Thai cuisine',
      'Met local artisans and learned traditional crafts'
    ],
    tags: ['Culture', 'Adventure', 'Food', 'Local Experience', 'Photography']
  };

  const mockComments = [
    {
      id: '1',
      content: 'This looks absolutely amazing! Thailand has been on my bucket list forever. Your photos are stunning!',
      author: {
        id: 'user2',
        name: 'Alex Martinez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isVerified: true
      },
      createdAt: '2024-01-17T10:30:00Z',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '2',
          content: 'You should definitely visit! The people there are so welcoming.',
          author: {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            isVerified: true
          },
          createdAt: '2024-01-17T11:00:00Z',
          likes: 3,
          isLiked: false
        }
      ]
    },
    {
      id: '3',
      content: 'I was just in Chiang Rai last month! Did you visit the White Temple?',
      author: {
        id: 'user3',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      createdAt: '2024-01-17T09:15:00Z',
      likes: 8,
      isLiked: true
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trip.title,
        text: trip.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/feed">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للخلاصة
          </Link>
        </Button>

        {/* Main Trip Card */}
        <Card className="overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={trip.images[0]}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Badge variant="secondary" className="bg-black/50 text-white border-0 mb-2">
                {trip.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.location.city}, {trip.location.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{trip.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={trip.author.avatar} alt={trip.author.name} />
                  <AvatarFallback>{trip.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      to={`/profile/${trip.author.id}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {trip.author.name}
                    </Link>
                    {trip.author.isVerified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(trip.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2",
                    isLiked && "text-red-500 border-red-500"
                  )}
                  onClick={handleLike}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span>{likesCount}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  مشاركة
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">حول هذه الرحلة</h2>
              <p className="text-gray-700 leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">أبرز لحظات الرحلة</h3>
              <ul className="space-y-2">
                {trip.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">العلامات</h3>
              <div className="flex flex-wrap gap-2">
                {trip.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Images */}
            {trip.images.length > 1 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">المزيد من الصور</h3>
                <div className="grid grid-cols-2 gap-4">
                  {trip.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${trip.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments Section */}
        <CommentSection tripId={trip.id!} initialComments={mockComments} />
      </div>
    </div>
  );
};

export default TripDetails;
