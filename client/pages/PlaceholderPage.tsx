import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, ArrowLeft, MessageSquare } from 'lucide-react';

interface PlaceholderPageProps {
  pageTitle: string;
  description?: string;
}

const PlaceholderPage = ({ 
  pageTitle, 
  description = "This page is currently under development. We're working hard to bring you an amazing experience!" 
}: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Construction className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/feed">
                Explore Feed
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-500 mb-3">
              Want to help us improve? Let us know what you'd like to see on this page!
            </p>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
