import { GuestStats, Step } from './types';
import { manageEventType } from './utils';
export const loadingStepsArr: Step[] = [
  { 
    id: 'pull-data', 
    label: 'Pulling event data', 
    durationMs: 600, 
    status: 'pending'
  },
  { 
    id: 'generate-insights', 
    label: 'Getting our wizard to generate insights', 
    durationMs: 800, 
    status: 'pending' 
  },
  { 
    id: 'get-stats', 
    label: 'Getting your stats', 
    durationMs: 500, 
    status: 'pending' 
  },
  { 
    id: 'generate-sunshine', 
    label: 'Generating sunshine', 
    durationMs: 220, 
    status: 'pending' 
  },
  { 
    id: 'move-rainbow', 
    label: 'Moving a rainbow to your area', 
    durationMs: 250, 
    status: 'pending' 
  },
  { 
    id: 'polish-visuals', 
    label: 'Telling the creator to send the visuals', 
    durationMs: 250, 
    status: 'pending' 
  }
];
// Mock data for demonstration
export const getMockEvents = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return [
    {
      date: today,
      events: [
        {
          id: "event1",
          title: "Tech@NYU x Z Fellows Info Session",
          date: today,
          time: "3:30 PM",
          location: "NYU",
          locationDetail: "NYU Entrepreneurial Institute (Leslie eLab)",
          attendees: 30,
          imageUrl: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/ky/6f6eb772-12cf-4aaa-a094-88c2f958a5e7.png"
        },
        {
          id: "985a5234-03ef-4c8c-acd2-99ae004aa2bf",
          title: "NextJS event",
          date: today,
          time: "5:00 PM",
          location: "21:00:00+00",
          locationDetail: "6 MetroTech Center, Brooklyn, NY 11201",
          attendees: 25,
          imageUrl: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
        },
        {
          id: "event3",
          title: "Evening Networking Event",
          date: today,
          time: "7:00 PM",
          location: "Rooftop Bar",
          locationDetail: "Skyview Rooftop, 42 High St",
          attendees: 50,
          imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      date: tomorrow,
      events: [
        {
          id: "event4",
          title: "Data Science Bootcamp",
          date: tomorrow,
          time: "10:00 AM",
          location: "Tech Hub",
          locationDetail: "Innovation Center, 456 Tech Ave",
          attendees: 40,
          imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "event5",
          title: "Startup Pitch Competition",
          date: tomorrow,
          time: "2:00 PM",
          location: "Venture Building",
          locationDetail: "Venture Building, 789 Funding St",
          attendees: 75,
          imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      date: dayAfterTomorrow,
      events: [
        {
          id: "event6",
          title: "AI Ethics Panel Discussion",
          date: dayAfterTomorrow,
          time: "1:00 PM",
          location: "University Auditorium",
          locationDetail: "Central University, 101 Academic Blvd",
          attendees: 120,
          imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];
};

export const getEmptyMockEvents = () => {
    return [];
    }

export const defaultManagerEvent: manageEventType = {
    event_name: "",
    event_description: "",
    event_date: "",
    end_date: "",
    location_name: "",
    location_address: "",
    image: "",
    capacity: null,
    community_id: "",
    payment_amount: 0,
    payment_currency: "",
    virtual_meeting_url: "",
    approval_required: false,
    hosts_info: [],
    attendees: [],
};

export const testGuestStats: GuestStats = 
    {
      going: 45,
      maybe: 3,
      notGoing: 15,
      capacity: 80
    }

  