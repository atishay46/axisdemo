import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarDays, Clock, MapPin, Users, Sparkles, Rocket, CircleUserRound, Microscope, LineChart } from 'lucide-react';

const timelineEvents = [
  {
    day: 'Management & Analytics',
    date: 'March 22, 2025',
    events: [
      {
        time: '08:00 - 09:30',
        title: 'Model United Nations',
        location: 'Main Hall',
        description: 'Check-in, badge collection, and welcome refreshments',
        icon: <Users className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '10:00 - 11:30',
        title: 'Analytico',
        location: 'Galaxy Stage',
        description: 'Future of Space Exploration: Pushing Boundaries',
        icon: <Rocket className="h-6 w-6 text-axis-neon-purple" />
      },
      {
        time: '12:00 - 13:30',
        title: 'Laser Litt',
        location: 'Stellar Hall',
        description: 'Connect with industry leaders and fellow attendees',
        icon: <Users className="h-6 w-6 text-axis-neon-pink" />
      },
      {
        time: '14:00 - 15:30',
        title: '221 B Baker Street',
        location: 'Nova Theater',
        description: 'Breakthrough technologies in space transportation',
        icon: <Rocket className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '16:00 - 17:30',
        title: 'Wallstreet',
        location: 'Innovation Hub',
        description: 'Emerging companies revolutionizing the space industry',
        icon: <LineChart className="h-6 w-6 text-axis-neon-purple" />
      },
      {
        time: '18:30 - 20:30',
        title: 'Who\'s the Boss',
        location: 'Cosmic Lounge',
        description: 'Cocktails, hors d\'oeuvres, and entertainment',
        icon: <Sparkles className="h-6 w-6 text-axis-neon-pink" />
      }
    ]
  },
  {
    day: 'Igniting Minds',
    date: 'March 23, 2025',
    events: [
      {
        time: '09:00 - 10:30',
        title: 'Kartavya',
        location: 'Terra Lab',
        description: 'Design principles for sustainable living in space',
        icon: <Microscope className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '11:00 - 12:30',
        title: 'Techno.docx',
        location: 'Galaxy Stage',
        description: 'Machine learning applications for cosmic discovery',
        icon: <CircleUserRound className="h-6 w-6 text-axis-neon-purple" />
      },
      {
        time: '13:00 - 14:30',
        title: 'Brainstorm',
        location: 'Stellar Hall',
        description: 'Topic-focused discussions with field experts',
        icon: <Users className="h-6 w-6 text-axis-neon-pink" />
      },
      {
        time: '15:00 - 16:30',
        title: 'Toycathon',
        location: 'Nova Theater',
        description: 'Commercial opportunities and challenges',
        icon: <Rocket className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '17:00 - 18:30',
        title: 'Hands-on Tech Demo',
        location: 'Innovation Hub',
        description: 'Interactive showcase of space technologies',
        icon: <Sparkles className="h-6 w-6 text-axis-neon-purple" />
      },
      {
        time: '19:30 - 22:30',
        title: 'Gala Dinner',
        location: 'Celestial Ballroom',
        description: 'Formal dinner with keynote speech and awards',
        icon: <Sparkles className="h-6 w-6 text-axis-neon-pink" />
      }
    ]
  },
  {
    day: 'Software & Electronics',
    date: 'March 23, 2025',
    events: [
      {
        time: '09:00 - 10:30',
        title: 'Cryptocrux',
        location: 'Terra Lab',
        description: 'Mining asteroids and planetary bodies',
        icon: <Microscope className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '11:00 - 12:30',
        title: 'Electroblitz',
        location: 'Galaxy Stage',
        description: 'Technologies for deep space communication',
        icon: <Rocket className="h-6 w-6 text-axis-neon-purple" />
      },
      {
        time: '13:00 - 14:30',
        title: 'Insomnia',
        location: 'Stellar Hall',
        description: 'Final networking opportunity',
        icon: <Users className="h-6 w-6 text-axis-neon-pink" />
      },
      {
        time: '15:00 - 16:30',
        title: 'Web Reshape',
        location: 'Nova Theater',
        description: 'Industry leaders discuss next steps in space exploration',
        icon: <LineChart className="h-6 w-6 text-axis-neon-blue" />
      },
      {
        time: '17:00 - 18:00',
        title: 'AI Hackathon',
        location: 'Galaxy Stage',
        description: 'Final remarks and AXIS 2026 preview',
        icon: <Sparkles className="h-6 w-6 text-axis-neon-purple" />
      }
    ]
  }
];

const EventTimeline = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col space-y-12">
        {timelineEvents.map((day, dayIndex) => (
          <div key={dayIndex} className="glass-effect rounded-xl p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple mr-4">
                <CalendarDays className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{day.day}</h3>
                <p className="text-gray-400">{day.date}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {day.events.map((event, eventIndex) => (
                <div 
                  key={eventIndex}
                  className={cn(
                    "relative pl-10 py-4 border-l-2 hover:border-l-4 transition-all duration-300",
                    eventIndex === 0 ? "border-l-axis-neon-blue hover:border-l-axis-neon-blue" : 
                    eventIndex === 1 ? "border-l-axis-neon-purple hover:border-l-axis-neon-purple" : 
                    "border-l-axis-neon-pink hover:border-l-axis-neon-pink"
                  )}
                >
                  <div className="absolute left-[-9px] top-5 w-4 h-4 rounded-full bg-black border-2 border-axis-neon-blue"></div>
                  
                  <div className="glass-effect rounded-lg p-4 hover:neon-glow-blue transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start mb-2 md:mb-0">
                        <div className="mr-4">
                          {event.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">{event.title}</h4>
                          <p className="text-gray-300">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start md:items-end mt-2 md:mt-0 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
