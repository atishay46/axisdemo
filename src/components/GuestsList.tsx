import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

type GuestType = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  featured?: boolean;
  specialization?: string;
};

const guests: GuestType[] = [
  {
    id: 1,
    name: "Sunita L Williams",
    role: "NASA Astronaut",
    company: "NASA Johnson Space Center",
    avatar: "/sunita-williams.jpg",
    featured: true,
    specialization: "Space Exploration"
  },
  {
    id: 2,
    name: "HC Verma",
    role: "Physicist & Author",
    company: "IIT Kanpur",
    avatar: "/hc-verma.jpg",
    featured: true,
    specialization: "Physics Education"
  },
  {
    id: 3,
    name: "Dr Vijendra Singh Chauhan",
    role: "Scientist",
    company: "ISRO",
    avatar: "/vijendra-chauhan.jpg",
    featured: true,
    specialization: "Space Technology"
  },
  {
    id: 4,
    name: "Shri Nitinji Gadkari",
    role: "Union Minister",
    company: "Government of India",
    avatar: "/nitin-gadkari.jpg",
    specialization: "Infrastructure Development"
  },
  {
    id: 5,
    name: "Mukesh Jain",
    role: "Director",
    company: "DRDO",
    avatar: "/mukesh-jain.jpg",
    specialization: "Defense Research"
  },
  {
    id: 6,
    name: "R. Vijay Bhatkar",
    role: "Computer Scientist",
    company: "C-DAC",
    avatar: "/vijay-bhatkar.jpg",
    specialization: "Supercomputing"
  },
  {
    id: 7,
    name: "Abhi and Niyu",
    role: "Content Creators",
    company: "YouTube",
    avatar: "/abhi-niyu.jpg",
    specialization: "Digital Content"
  }
];

const GuestsList = () => {
  // Separate featured and regular guests
  const featuredGuests = guests.filter(guest => guest.featured);
  const regularGuests = guests.filter(guest => !guest.featured);

  return (
    <div className="space-y-8">
      {/* Featured Guests Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white text-glow-purple">Featured Speakers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuests.map(guest => (
            <div key={guest.id} className="glass-effect p-6 rounded-xl hover:neon-glow-purple transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-axis-neon-purple">
                  <AvatarImage src={guest.avatar} alt={guest.name} />
                  <AvatarFallback className="bg-axis-dark-gray text-axis-neon-purple">
                    {guest.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-xl font-bold text-white">{guest.name}</h4>
                    <Star className="h-4 w-4 ml-2 text-axis-neon-pink" fill="currentColor" />
                  </div>
                  <p className="text-gray-300">{guest.role}</p>
                  <p className="text-sm text-axis-neon-blue">{guest.company}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-black/30 border-axis-neon-purple text-axis-neon-purple">
                {guest.specialization}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Guests Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white text-glow-blue">Also Attending</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {regularGuests.map(guest => (
            <div key={guest.id} className="glass-effect p-4 rounded-lg hover:neon-glow-blue transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border border-axis-neon-blue">
                  <AvatarImage src={guest.avatar} alt={guest.name} />
                  <AvatarFallback className="bg-axis-dark-gray text-axis-neon-blue">
                    {guest.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-md font-semibold text-white">{guest.name}</h4>
                  <p className="text-xs text-gray-400">{guest.role}, {guest.company}</p>
                </div>
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs bg-black/30 border-axis-neon-blue text-axis-neon-blue">
                  {guest.specialization}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestsList;
