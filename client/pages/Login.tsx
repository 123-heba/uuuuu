import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Eye,
  EyeOff,
  MapPin,
  ArrowLeft,
  Camera,
  Users,
  Globe,
  Heart,
  Shield
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
    loginAsAdmin: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: add actual authentication here

    console.log('Login attempt:', formData);

    if (formData.loginAsAdmin) {
      navigate('/admin');
    } else {
      navigate('/feed');
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-accent relative">
      {/* Background pattern omitted for brevity */}

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Branding section here (same as your code) */}

          {/* Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Sign In to Your Account
                </CardTitle>
                <p className="text-gray-600">Enter your credentials to continue your journey</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="h-11 pr-10"
                        required
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.remember}
                          onCheckedChange={(checked) => handleChange('remember', checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                      </div>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
                      <Checkbox
                        id="adminLogin"
                        checked={formData.loginAsAdmin}
                        onCheckedChange={(checked) => handleChange('loginAsAdmin', checked as boolean)}
                      />
                      <Label htmlFor="adminLogin" className="text-sm text-red-700 font-medium">
                        Login as Administrator
                      </Label>
                      <Shield className="h-4 w-4 text-red-600" />
                    </div>
                  </div>

                  <Button type="submit" className={`w-full h-11 ${formData.loginAsAdmin ? 'bg-red-600 hover:bg-red-700' : ''}`}>
                    {formData.loginAsAdmin ? (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Access Admin Dashboard
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-2" />
                        Continue Your Journey
                      </>
                    )}
                  </Button>

                  {/* The rest of your social login and sign-up links... */}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
