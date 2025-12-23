import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Loader2 } from 'lucide-react';
export default function Auth() {
  const {
    user,
    signIn,
    signUp
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const {
      error
    } = await signIn(email, password);
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link.');
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  };
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('displayName') as string;
    const {
      error
    } = await signUp(email, password, displayName);
    if (error) {
      if (error.message.includes('User already registered')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(error.message);
      }
    } else {
      setMessage('Check your email for a confirmation link to complete your signup.');
    }
    setLoading(false);
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Test credentials section */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="backdrop-blur-sm bg-card/80 border border-border/50 rounded-lg p-3 text-xs shadow-soft max-w-[200px]">
          <p className="font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            🧪 Test Credentials
          </p>
          <div className="space-y-1 text-muted-foreground/80">
            <p><span className="font-medium text-foreground/70">Email:</span> test@mindmate.com</p>
            <p><span className="font-medium text-foreground/70">Password:</span> test123</p>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-calm-blue-light rounded-full blur-xl opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-warm-purple-light rounded-full blur-lg opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-calm-green-light rounded-full blur-lg opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-gentle-fade">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Heart className="h-10 w-10 text-primary animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 text-primary opacity-20 animate-ping"></div>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
              MindMate
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Your mental wellbeing companion
          </p>
          <div className="w-16 h-1 bg-gradient-mood mx-auto mt-4 rounded-full"></div>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 border-0 shadow-glow transition-gentle hover:shadow-soft">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold bg-gradient-mood bg-clip-text text-transparent">Welcome to MindMate!</CardTitle>
            <CardDescription className="text-base mt-2 text-muted-foreground/80">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 h-12 rounded-lg">
                <TabsTrigger value="signin" className="transition-gentle data-[state=active]:bg-gradient-card data-[state=active]:shadow-soft">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="transition-gentle data-[state=active]:bg-gradient-card data-[state=active]:shadow-soft">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-6 mt-6">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="signin-email" className="text-sm font-semibold text-foreground">Email Address</Label>
                    <Input 
                      id="signin-email" 
                      name="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      className="h-12 transition-gentle focus:ring-calm-blue focus:border-calm-blue border-muted-foreground/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signin-password" className="text-sm font-semibold text-foreground">Password</Label>
                    <Input 
                      id="signin-password" 
                      name="password" 
                      type="password" 
                      placeholder="Your password" 
                      required 
                      className="h-12 transition-gentle focus:ring-calm-blue focus:border-calm-blue border-muted-foreground/20"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-mood hover:bg-gradient-hero transition-bounce text-white font-semibold shadow-soft hover:shadow-glow" 
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 mt-6">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="signup-name" className="text-sm font-semibold text-foreground">Display Name</Label>
                    <Input 
                      id="signup-name" 
                      name="displayName" 
                      type="text" 
                      placeholder="Your name" 
                      className="h-12 transition-gentle focus:ring-calm-blue focus:border-calm-blue border-muted-foreground/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-foreground">Email Address</Label>
                    <Input 
                      id="signup-email" 
                      name="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      className="h-12 transition-gentle focus:ring-calm-blue focus:border-calm-blue border-muted-foreground/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-password" className="text-sm font-semibold text-foreground">Password</Label>
                    <Input 
                      id="signup-password" 
                      name="password" 
                      type="password" 
                      placeholder="Create a password (min. 6 characters)" 
                      required 
                      minLength={6} 
                      className="h-12 transition-gentle focus:ring-calm-blue focus:border-calm-blue border-muted-foreground/20"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-mood hover:bg-gradient-hero transition-bounce text-white font-semibold shadow-soft hover:shadow-glow" 
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {error && <Alert className="mt-6 border-destructive/50 bg-destructive/5 text-destructive animate-gentle-fade">
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>}

            {message && <Alert className="mt-6 border-calm-green/50 bg-calm-green-light/30 text-calm-green animate-gentle-fade">
                <AlertDescription className="font-medium">{message}</AlertDescription>
              </Alert>}
          </CardContent>
        </Card>
      </div>
    </div>;
}