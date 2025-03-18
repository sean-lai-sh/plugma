import {supabase} from "@/lib/supabaseClient";


export async function createUserEvents(
    _event_name: string,  
    _event_description: string, 
    _event_date: string, 
    _end_date: string, 
    _is_private: boolean = false, 
    _is_virtual: boolean = false, 
    _approval_required: boolean = false,
    _payment_amount: number = 0,
    _payment_currency: string = "USD",
    _location_address?: string, 
    _location_coordinates?: string, 
    _location_name?: string, 
    _virtual_meeting_url?: string,
    _capacity?: number,
    _creator_id?: string, 
){
    try{
        if(!_creator_id) {
            const { data: { user } } = await supabase.auth.getUser()
            if(user) {
                _creator_id = user.id;
            } else {
                console.error("User not authenticated");
                return 500; // User not authenticated
            }
        }
        let { data, error } = await supabase
        .rpc('create_event', {
            _approval_required, 
            _capacity, 
            _creator_id, 
            _end_date, 
            _event_date, 
            _event_description, 
            _event_name, 
            _is_private, 
            _is_virtual, 
            _location_address, 
            _location_coordinates, 
            _location_name, 
            _payment_amount, 
            _payment_currency, 
            _virtual_meeting_url
        })
        if (error) console.error(error)
        else console.log(data)
    }catch(error){
        console.error("Unexpected error creating event:", error);
    }
    return null;
}