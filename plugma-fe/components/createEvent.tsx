'use client'
import React, {useState, useEffect} from 'react'
import {supabase} from '@/lib/supabaseClient'


type createEventType = {
    eventTitle : string,
    eventDescritption: string,
    creatorID: string, // get this from supabase
    eventDate: Date, // we will check on express middleware if this is a valid date
    eventEndDate: Date,
    eventTags: string,
    eventPrivate: boolean,
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
    eventDescritption: '',
    creatorID: '',
    eventDate: new Date(),
    eventEndDate: new Date(),
    eventTags: '',
    eventPrivate: false,
    eventLocationName: '',
    eventLocationAddress: '',
    virtualMeetingURL: '',
    paymentAmount: 0,
    paymentCurrency: 'USD',
    updatedAt: new Date(),
    createdAt: new Date(),
    capacity: undefined,
}

const createEvent = () => {
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
        <div>createEvent</div>
    )
}

export default createEvent