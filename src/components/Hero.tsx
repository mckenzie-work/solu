import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Camera } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            Capture Your
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Perfect Moments
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional photography services for weddings, events, and special occasions. 
            Book your session today and create memories that last forever.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/booking">
              <Button size="lg" className="group">
                Book a Session
                <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="group">
                View Gallery
                <Camera className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Professional Quality</h3>
              <p className="text-muted-foreground text-center">
                High-end equipment and expert techniques for stunning results
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Flexible Scheduling</h3>
              <p className="text-muted-foreground text-center">
                Book sessions at your convenience with our easy booking system
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Quick Delivery</h3>
              <p className="text-muted-foreground text-center">
                Receive your edited photos within 48 hours of your session
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;