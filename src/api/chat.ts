export async function handleChat(message: string) {
  try {
    const lowerMessage = message.toLowerCase();
    
    // Event details
    if (lowerMessage.includes('when') || lowerMessage.includes('date') || lowerMessage.includes('time')) {
      return {
        message: "AXIS 2025 will be held on March 15-17, 2025, at the International Space Convention Center. The event starts at 9:00 AM each day."
      };
    }
    
    // Location
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('place')) {
      return {
        message: "The event will take place at the International Space Convention Center, located in the heart of the city. Detailed directions and parking information will be provided in your registration confirmation."
      };
    }
    
    // Speakers
    if (lowerMessage.includes('speaker') || lowerMessage.includes('presenter') || lowerMessage.includes('who')) {
      return {
        message: "AXIS 2025 features an impressive lineup of speakers including space industry leaders, astronauts, and innovators. Key speakers include Dr. Sarah Chen (NASA), Elon Musk (SpaceX), and Dr. James Wilson (ESA)."
      };
    }
    
    // Registration
    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('ticket')) {
      return {
        message: "You can register for AXIS 2025 through our registration page. We offer Standard Pass ($499) and Premium Pass ($899) options. Early bird discounts are available until December 31, 2024."
      };
    }
    
    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return {
        message: "I can help you with information about event dates, location, speakers, registration, and more. What would you like to know?"
      };
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return {
        message: "You're welcome! Is there anything else you'd like to know about AXIS 2025?"
      };
    }
    
    // Default response
    return {
      message: "Hello! I'm the AXIS AI Assistant. I can help you with information about event dates, location, speakers, registration, and more. What would you like to know?"
    };
  } catch (error) {
    console.error('Chat API error:', error);
    throw new Error('Internal server error');
  }
} 