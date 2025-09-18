import React, { useEffect, useRef, useState } from 'react';
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Search, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MapExplorer = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const googleMapsKey = 'AIzaSyAydJVxh0doIQOfAYMM8gZQ2DqgmZthQgM'; // Google Maps API key
  const [isLoaded, setIsLoaded] = useState(false);

  // Bhubaneswar coordinates and ward data
  const bhubaneswarCenter: [number, number] = [85.8245, 20.2961];
  
  // Sample ward data for Bhubaneswar
  const wards = [
    { id: 1, name: "Ward 1 - Saheed Nagar", issues: 12, lat: 20.3019, lng: 85.8449 },
    { id: 2, name: "Ward 2 - Jayadev Vihar", issues: 8, lat: 20.2906, lng: 85.8243 },
    { id: 3, name: "Ward 3 - Khandagiri", issues: 15, lat: 20.2542, lng: 85.7785 },
    { id: 4, name: "Ward 4 - Patia", issues: 6, lat: 20.3497, lng: 85.8181 },
    { id: 5, name: "Ward 5 - Chandrasekharpur", issues: 10, lat: 20.3176, lng: 85.8048 },
    { id: 6, name: "Ward 6 - Old Town", issues: 18, lat: 20.2394, lng: 85.8336 },
    { id: 7, name: "Ward 7 - Unit-8", issues: 7, lat: 20.2625, lng: 85.8354 },
    { id: 8, name: "Ward 8 - Kalinga Nagar", issues: 9, lat: 20.2847, lng: 85.7784 }
  ];

  const initializeMap = (apiKey: string) => {
    if (!mapContainer.current) return;

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Create global callback function
    (window as any).initMap = () => {
      setIsLoaded(true);
      
      const mapOptions: google.maps.MapOptions = {
        center: { lat: bhubaneswarCenter[1], lng: bhubaneswarCenter[0] },
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9f3ff" }]
          }
        ]
      };

      map.current = new google.maps.Map(mapContainer.current!, mapOptions);

      // Add ward markers
      wards.forEach((ward) => {
        const marker = new google.maps.Marker({
          position: { lat: ward.lat, lng: ward.lng },
          map: map.current!,
          title: ward.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#1A73E8',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${ward.name}</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
                Active Issues: <span style="font-weight: 600; color: #dc2626;">${ward.issues}</span>
              </p>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button style="padding: 4px 12px; background: #1A73E8; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                  View Issues
                </button>
                <button style="padding: 4px 12px; background: #2ECC71; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                  Report Issue
                </button>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
      });
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    // Auto-initialize map on component mount
    initializeMap(googleMapsKey);
    
    return () => {
      // Clean up Google Maps instance
      if (map.current) {
        // Google Maps doesn't have a remove method like Mapbox
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="btn-framer-ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                Bhubaneswar Map Ward wise
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Explore civic issues across Bhubaneswar municipality ward-wise. 
                Click on ward markers to view active issues and report new ones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Search and Filters */}
              <div className="glass-effect p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ward name or area..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">All Wards</Button>
                    <Button variant="outline" size="sm">High Issues</Button>
                    <Button variant="outline" size="sm">Low Issues</Button>
                  </div>
                </div>
              </div>

              {/* Interactive Map with 100px border */}
              <div className="border-[100px] border-background/20 rounded-[200px] overflow-hidden shadow-2xl">
                <div 
                  ref={mapContainer} 
                  className="w-full h-[600px] rounded-[100px] overflow-hidden shadow-lg"
                />
              </div>

              {/* Ward Summary */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wards.map((ward, index) => (
                  <motion.div
                    key={ward.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="glass-effect p-6 rounded-2xl hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                  >
                    <h3 className="font-bold text-lg mb-2">{ward.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Active Issues: <span className="font-semibold text-destructive">{ward.issues}</span>
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapExplorer;
