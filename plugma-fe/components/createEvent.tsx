'use client'
import React, {useState, useEffect} from 'react'
import {supabase} from '@/lib/supabaseClient'
import { send } from 'process'
import { Input } from './ui/input'
import { Label } from './ui/label'


type createEventType = {
    eventTitle : string,
    eventDescription: string,
    creatorID: string, // get this from supabase
    eventDate: Date, // we will check on express middleware if this is a valid date
    eventEndDate: Date,
    eventTags: string,
    eventPrivate: boolean,
    eventReqApproval: boolean,
    eventLocationName: string,
    eventLocationAddress: string,
    virtualMeetingURL: string,
    paymentAmount: number,
    paymentCurrency: string,
    updatedAt: Date,
    createdAt: Date,
    capacity: number | undefined, // Due to impl of DB to be udefined which becomes NULL as inf capacity
}

const defaultEvent: createEventType = {
    eventTitle: '',
    eventDescription: '',
    creatorID: '',
    eventDate: new Date(),
    eventEndDate: new Date(),
    eventTags: '',
    eventPrivate: false,
    eventReqApproval: false,
    eventLocationName: '',
    eventLocationAddress: '',
    virtualMeetingURL: '',
    paymentAmount: 0,
    paymentCurrency: 'USD',
    updatedAt: new Date(),
    createdAt: new Date(),
    capacity: undefined,
}

const CreateEventForm = () => {
    const [eventInfo, setEventInfo] = useState<createEventType>(defaultEvent)

    const sendEventInfo = async () => {
        /// Call my express API to create event at api/events/create not via supabase
        const success = await fetch('/api/events/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventInfo),
        })
        return success
        
    }
    return (
        <div className='flex flex-row items-center justify-between'>
            <div className='w-[40%]'>

            </div>
            <div className=''>
                <form className=''
                    onSubmit={(e)=>{
                        e.preventDefault();
                        sendEventInfo();
                    }}>
                    <Input type="text" placeholder="Event Title" value={eventInfo.eventTitle} onChange={(e) => setEventInfo({...eventInfo, eventTitle: e.target.value})} />
                    <Input type="text" placeholder="Event Description" value={eventInfo.eventDescription} onChange={(e) => setEventInfo({...eventInfo, eventDescription: e.target.value})} />
                    <Input type="text" placeholder="Event Location Name" value={eventInfo.eventLocationName} onChange={(e) => setEventInfo({...eventInfo, eventLocationName: e.target.value})} />
                    <Input type="text" placeholder="Event Location Address" value={eventInfo.eventLocationAddress} onChange={(e) => setEventInfo({...eventInfo, eventLocationAddress: e.target.value})} />
                    <>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input 
                    type="datetime-local" 
                    id="eventDate" 
                    // Ensure that date > yesterday
                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                    value={eventInfo.eventDate.toISOString().slice(0, 16)} 
                    onChange={(e) => setEventInfo({...eventInfo, eventDate: new Date(e.target.value)})} />
                    </>
                </form>
            </div>
        </div>
    )
}

export default CreateEventForm