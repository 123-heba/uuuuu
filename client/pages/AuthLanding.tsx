import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Globe,
  Camera,
  Users,
  Heart,
  Eye,
  EyeOff,
  User,
  UserPlus
} from 'lucide-react';

const AuthLanding = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Register form state - all required fields
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect authenticated users to feed or intended page
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = (location.state as any)?.from?.pathname || '/feed';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  const handleSignInChange = (field: string, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!signInData.email.trim() || !signInData.password.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create user for sign in (simulated)
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Registered User',
        email: signInData.email,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'user' as const,
        isVerified: true
      };

      login(user);
      const from = (location.state as any)?.from?.pathname || '/feed';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('An error occurred during sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!registerData.firstName.trim() || !registerData.lastName.trim() ||
        !registerData.email.trim() || !registerData.password.trim() ||
        !registerData.confirmPassword.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create user with register data
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${registerData.firstName} ${registerData.lastName}`,
        email: registerData.email,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'user' as const,
        isVerified: false
      };

      login(user);
      const from = (location.state as any)?.from?.pathname || '/feed';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if forms are valid
  const isSignInValid = signInData.email.trim() && signInData.password.trim();
  const isRegisterValid = registerData.firstName.trim() && registerData.lastName.trim() &&
                         registerData.email.trim() && registerData.password.trim() &&
                         registerData.confirmPassword.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white rounded-full"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left text-white space-y-8">
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fac285223133d4c4690a07a25427a1573%2F7ae77806540645af89506e260a82309c?format=webp&width=800"
                alt="RAHALA"
                className="h-16 w-16 rounded-full object-cover filter brightness-0 invert"
              />
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  RAHALA
                </h1>
                <p className="text-blue-100 text-lg mt-2">The Social Travel Platform for Adventurers</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-blue-100 leading-relaxed">
                Join a community of passionate travelers sharing their experiences, discovering new destinations, and inspiring each other to embark on the next adventure.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Camera className="h-5 w-5" />
                  </div>
                  <span>Share your trips</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span>Discover new destinations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <span>Connect with travelers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Heart className="h-5 w-5" />
                  </div>
                  <span>Get inspired</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-blue-200 text-sm">Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">120K+</div>
                  <div className="text-blue-200 text-sm">Trips Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">195+</div>
                  <div className="text-blue-200 text-sm">Countries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Welcome to your journey
                </CardTitle>
                <p className="text-gray-600">Sign in or create a new account to start exploring</p>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>

                  {/* Sign In Tab */}
                  <TabsContent value="signin" className="space-y-4">
                    <div className="text-center mb-4 p-3 bg-blue-50 rounded-lg border">
                      <p className="text-sm text-blue-700">
                        🔐 <strong>Sign In:</strong> Enter your credentials to access your account
                      </p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email *</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your@email.com"
                          className="h-11"
                          value={signInData.email}
                          onChange={(e) => handleSignInChange('email', e.target.value)}
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-11 pr-10"
                            value={signInData.password}
                            onChange={(e) => handleSignInChange('password', e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Form Validation Message */}
                      {!isSignInValid && (
                        <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-600">
                            Please fill in all required fields
                          </p>
                        </div>
                      )}

                      {/* Sign In Button */}
                      <Button
                        type="submit"
                        className="w-full h-12 text-lg"
                        disabled={!isSignInValid || isSubmitting}
                      >
                        {isSubmitting ? (
                          'Signing in...'
                        ) : (
                          <>
                            <User className="h-5 w-5 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>

                      {/* Form Progress */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>
                            {Object.values(signInData).filter(value => value.trim()).length}/2
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(Object.values(signInData).filter(value => value.trim()).length / 2) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register" className="space-y-4">
                    <div className="text-center mb-4 p-3 bg-green-50 rounded-lg border">
                      <p className="text-sm text-green-700">
                        ✨ <strong>Create Account:</strong> Join the travel community and explore the world
                      </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-firstName">First Name *</Label>
                          <Input
                            id="register-firstName"
                            placeholder="John"
                            className="h-11"
                            value={registerData.firstName}
                            onChange={(e) => handleRegisterChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-lastName">Last Name *</Label>
                          <Input
                            id="register-lastName"
                            placeholder="Doe"
                            className="h-11"
                            value={registerData.lastName}
                            onChange={(e) => handleRegisterChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email *</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          className="h-11"
                          value={registerData.email}
                          onChange={(e) => handleRegisterChange('email', e.target.value)}
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password *</Label>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter a strong password"
                            className="h-11 pr-10"
                            value={registerData.password}
                            onChange={(e) => handleRegisterChange('password', e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            className="h-11 pr-10"
                            value={registerData.confirmPassword}
                            onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Password Match Validation */}
                      {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                        <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-600">
                            Passwords do not match
                          </p>
                        </div>
                      )}

                      {/* Form Validation Message */}
                      {!isRegisterValid && (
                        <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-600">
                            Please fill in all required fields
                          </p>
                        </div>
                      )}

                      {/* Register Button */}
                      <Button
                        type="submit"
                        className="w-full h-12 text-lg"
                        disabled={!isRegisterValid || registerData.password !== registerData.confirmPassword || isSubmitting}
                      >
                        {isSubmitting ? (
                          'Creating account...'
                        ) : (
                          <>
                            <UserPlus className="h-5 w-5 mr-2" />
                            Sign Up
                          </>
                        )}
                      </Button>

                      {/* Form Progress */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>
                            {Object.values(registerData).filter(value => value.trim()).length}/5
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(Object.values(registerData).filter(value => value.trim()).length / 5) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
