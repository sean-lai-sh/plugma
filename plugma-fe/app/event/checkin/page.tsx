"use client";

import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import  { useRouter } from "next/router";

export default function QRCheckIn() {
  console.log("QRCheckIn");
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [qrDataURL, setQRDataURL] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const userId = searchParams.get("user_id");
  const eventId = searchParams.get("event_id");

  const qrURL = `/event/checkin?user_id=${userId}&event_id=${eventId}`;

  async function handleCheckIn() {
    if (!userId || !eventId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("attendees")
      .update({
        checked_in_at: new Date().toISOString(),
        attended: true,
      })
      .eq("id", userId)
      .eq("event_id", eventId)
      .select();

    if (!error) setCheckedIn(true);
    setLoading(false);
  }

  useEffect(() => {
    if (userId && eventId && !checkedIn) {
      handleCheckIn();
    }
  }, [userId, eventId]);

  useEffect(() => {
    if (scanMode && userId && eventId) {
      QRCode.toDataURL(qrURL)
        .then((url) => setQRDataURL(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [scanMode, userId, eventId]);

  return (
    <Card className="w-full h-screen mx-auto items-center py-32">
      <CardHeader>
        <CardTitle className="text-center text-5xl">Event Check-In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {checkedIn ? (
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-green-700">You're checked in!</p>
          </div>
        ) : scanMode && qrDataURL ? (
          <div className="flex flex-col items-center space-y-4">
            <img src={qrDataURL} alt="QR Code" className="w-44 h-44" />
            <p className="text-sm text-muted-foreground">Scan this at the door to check in</p>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Button onClick={() => setScanMode(true)}>Generate QR Code</Button>   
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <p className="text-sm">Processing check-in...</p>
          </div>
        )}
        <div className="w-full flex justify-center">
          <a href={`/event/${eventId}`}>
            <Button onClick={() => redirect(`/event/${eventId}`)}>Go Back</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
