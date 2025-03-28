import dynamic from "next/dynamic";
import { Suspense } from "react";

const QRCheckIn = dynamic(() => import("@/components/QRCheckin"), {
  ssr: false, // Ensures it only renders on the client
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QRCheckIn />
    </Suspense>
  );
}
