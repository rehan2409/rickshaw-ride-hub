import { useState } from 'react';
import { Car, Users, Shield, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import heroImage from '@/assets/hero-rickshaw.jpg';

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center p-4">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              RickshawGo
            </span>
          </div>
          <Button onClick={() => setShowAuth(true)} variant="hero">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Ratnagiri's Premier{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    RickshawGo
                  </span>
                  {' '}Service
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with verified auto-rickshaw drivers across Ratnagiri. From Railway Station to Ganpatipule Beach - safe, affordable rides.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" variant="hero" onClick={() => setShowAuth(true)}>
                  Book a Ride
                </Button>
                <Button size="xl" variant="outline" onClick={() => setShowAuth(true)}>
                  Drive with Us
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary fill-current" />
                  <span className="text-sm font-medium">4.8 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">2K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">150+ Drivers</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Auto Rickshaw" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose RickshawGo in Ratnagiri?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate Ratnagiri's beautiful locations with trusted local drivers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-elevated">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track your ride in real-time with live location updates and estimated arrival times
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elevated">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  All drivers are verified with proper documentation and background checks
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elevated">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Quick Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Book rides instantly with our smart matching algorithm and get connected fast
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Explore Ratnagiri?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join hundreds of satisfied passengers and drivers across Ratnagiri
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="outline" className="bg-background text-foreground hover:bg-background/90" onClick={() => setShowAuth(true)}>
                Start Riding
              </Button>
              <Button size="xl" variant="outline" className="bg-background text-foreground hover:bg-background/90" onClick={() => setShowAuth(true)}>
                Start Driving
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                RickshawGo
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RickshawGo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}