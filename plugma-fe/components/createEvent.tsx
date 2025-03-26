'use client'
import React, {useState, useEffect} from 'react'
import {supabase} from '@/lib/supabaseClient'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import  EventFormTypeSelector  from './event-form/EventFormTypeSelector'
import  EventDateTimeFields  from './event-form/EventDateTimeFields'
import  EventLocationField  from './event-form/EventLocationSelector'
import  EventOptionsFields  from './event-form/EventOptions'
import { ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/providers/AuthProvider'
import { commInfo } from '@/lib/types'
import { LocationInput } from './ui/LocationInput'
import { Location } from './ui/LocationInput'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Textarea } from './ui/textarea'



type createEventType = {
  approval_required: boolean, 
  capacity : number, 
  community_name : string, 
  creator_id : string, 
  end_date : Date, 
  event_date : Date, 
  event_description : string, 
  event_name : string, 
  event_tags : string[], 
  is_private : boolean, 
  is_virtual : boolean, 
  location_address : string, 
  location_name : string, 
  payment_amount : number, 
  payment_currency : string, 
  timezone: string, 
  virtual_meeting_url: string | null,
  image: string,
}

const defaultEvent: createEventType = {
  approval_required: false, 
  capacity : 0, 
  community_name : "Personal", 
  creator_id : "", 
  end_date : new Date(), 
  event_date : new Date(), 
  event_description : "", 
  event_name : "", 
  event_tags : [], 
  is_private : false, 
  is_virtual : false, 
  location_address : "", 
  location_name : "", 
  payment_amount : 0, 
  payment_currency : "USD", 
  timezone: "UTC", 
  virtual_meeting_url: null,
  image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
}

const CreateEventForm = () => {
    const {user , loading} = useAuth();
    const [eventInfo, setEventInfo] = useState<createEventType>(defaultEvent)
    const [ourNewPage, setOurNewPage] = useState<string>("/create");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    
    const [validCommunities, setValidCommunities] = useState<commInfo[]>([{
      community_id: "1",
      creator_id: "1",
      name: "Personal",
      description: "Personal Community",
    }]); // Error checking is done on Express so
    const sendEventInfo = async () => {
        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", "plugma"); // your unsigned preset
      
          try {
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/djcvob55d/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );
      
            const uploadData = await uploadResponse.json();
            let imageUrl = "";
            if (uploadData.secure_url) {
              imageUrl = uploadData.secure_url;
              setEventInfo({
                ...eventInfo,
                image: imageUrl
              })
              console.log("Image uploaded successfully:", imageUrl);
            } else {
              console.error("Cloudinary upload failed:", uploadData);
              return;
            }
          } catch (err) {
            console.error("Image upload error:", err);
            return;
          }
        }
        console.log("eventInfo", eventInfo);
        // /// Call my express API to create event at api/events/create not via supabase
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
        })
        console.log(response)

        if (response.status  != 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseJson = await response.json();
        console.log("Response JSON", responseJson);
        setOurNewPage(`/event/${responseJson.data}`);
        router.push(`/event/${responseJson.data}`);
        return "success";
        
    }

    useEffect(() => {
        const fetchUser = async () => {
            if(user){
              setEventInfo({
                ...eventInfo,
                creator_id: user.id
              })

              //TODO: FETCH ALL affiliated communities
              const params = new URLSearchParams({
                user_id: user.id
              });
              console.log("Fetching all communities for user", user.id);
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getallcomms/?${params.toString()}`);
              if(response.status == 200){
                console.log("Fetched all communities for user", user.id, response);
                const data = await response.json();
                console.log("Data", data);
                setValidCommunities(data);
              }
              return;
            }else{
              router.push("/sign-in")
            }
        };
        const moveToNewPage = () => {
          if(ourNewPage != "/create"){
            router.push(ourNewPage);
          }
        }
        moveToNewPage();
        //console.log("User", user);
        fetchUser();
        //console.log("Valid Communities", validCommunities);
    }, [user]);

    
    
      const handleInputChange = (field: string, value: any) => {
        setEventInfo({
          ...eventInfo,
          [field]: value,
        });
      };
    
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageFile(file);
          const previewUrl = URL.createObjectURL(file);
          handleInputChange("image", previewUrl); // for preview only
        }
      };

      const setCommunityName = (communityName: string) => {
        // if community name is not in valid communities, add it to valid communities
        if(!validCommunities.map(community => community.name).includes(communityName)){
          setValidCommunities([...validCommunities, {
            community_id: communityName,
            creator_id: "1",
            name: communityName,
            description: "New Community",
        }]);
        }
        setEventInfo({
          ...eventInfo,
          community_name: communityName
        })
      }

      const setLocation= (location: Location) => {
        setSelectedLocation(location);
        setEventInfo({
          ...eventInfo,
          location_address: location.display_name      
        })
        
      }

    return (
        <div className="min-h-screen bg-[#F1F0FB] pb-16">

  
        {/* Main Content */}
        <main className="max-w-[80vw] mx-auto px-4 py-12 items-center">
          <div className="flex flex-col lg:flex-row gap-8 w-full items-center">
            {/* Left Column - Event Preview */}
            <div className="md:w-[2/9] lg:sticky top-24 self-start">
              <img src={eventInfo.image || 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} className='rounded-lg
               lg:w-[500px] lg:h-[300px] md:w-[420px] object-cover shadow-lg' alt='Event Preview
              ' />
            </div>
  
            {/* Right Column - Event Form */}
            <div className="w-full">
              <form 
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEventInfo();
                }}
              >
                <div className='flex justify-start w-full'>
                  <EventFormTypeSelector 
                  onCommunityChange={setCommunityName}
                  validCommunities={validCommunities.map(community => community.name)}            
                  />
                </div>
                {/* Event Image Upload */}
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <ImageIcon className="text-gray-400 mr-4" size={20} />
                    <span className="font-medium">Event Image</span>
                  </div>
                  
                  <div className="flex items-center">
                    {eventInfo.image ? (
                      <div className="relative group">
                        <img 
                          src={eventInfo.image} 
                          alt="Event preview" 
                          className="w-40 h-24 object-cover rounded-md" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleInputChange("image", "")}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                        <ImageIcon className="text-gray-400 mb-2" size={24} />
                        <span className="text-sm text-gray-500">Upload Image</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                    <div className="ml-4 text-sm text-gray-500">
                      <p>Recommended size: 1200 x 630 pixels</p>
                      <p>Max size: 2MB</p>
                    </div>
                  </div>
                </div>
  
                {/* Event Name */}
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <Label htmlFor="eventTitle" className="text-gray-500 mb-2 block ">Event Title</Label>
                  <Input 
                    id="eventTitle"
                    type="text" 
                    placeholder="Enter your event title" 
                    value={eventInfo.event_name} 
                    onChange={(e) => handleInputChange("event_name", e.target.value)}
                    className="text-lg "
                  />
                </div>
  
                {/* Event Description */}
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <Label htmlFor="eventDescription" className="text-gray-500 mb-2 block">Event Description</Label>
                  <Textarea 
                    id="eventDescription"
                    placeholder="Describe your event" 
                    value={eventInfo.event_description} 
                    onChange={(e) => handleInputChange("event_description", e.target.value)}
                  />
                </div>
  
                {/* Date and Time */}
                <EventDateTimeFields 
                  startDate={eventInfo.event_date}
                  endDate={eventInfo.end_date}
                  onStartDateChange={(date) => handleInputChange("event_date", date)}
                  onEndDateChange={(date) => handleInputChange("end_date", date)}
                />
  
                {/* Location TODO: TURN INTO PROPER THING W PROPER VALIDATION*/}
                {/* <Input type="text" placeholder="Add Event Location" value={eventInfo.location_address} onChange={(e) => handleInputChange("location_address", e.target.value)} /> */}
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <Label>Location</Label>
                  <Separator className='my-5'/>
                  <Input 
                    id="locationName"
                    type="text" 
                    placeholder="Where is your event?" 
                    value={eventInfo.location_name} 
                    onChange={(e) => handleInputChange("location_name", e.target.value)}
                    className=''
                  />
                  <Separator className='my-5'/>
                  <LocationInput
                    onLocationSelect={setLocation}
                  />
                </div>
  
                {/* Event Options */}
                <EventOptionsFields 
                  requireApproval={eventInfo.approval_required}
                  onRequireApprovalChange={(value) => handleInputChange("approval_required", value)}
                  capacity={eventInfo.capacity === undefined ? undefined : eventInfo.capacity}
                  onCapacityChange={(value) => handleInputChange("capacity", value)}
                />
  
                {/* Create Event Button */}
                <Button 
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600"
                  size="lg"
                >
                  Create Event
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    )
}

export default CreateEventForm;