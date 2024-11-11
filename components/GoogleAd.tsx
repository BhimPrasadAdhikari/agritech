'use client'
import { useEffect, useState } from "react";

export default function GoogleAd({ slotId }: { slotId: string | undefined }) {
  const [isAdReady, setIsAdReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        // Delay the ad rendering until the adsbygoogle array is ready
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdReady(true); // Mark ad as ready to be displayed
      } catch (e) {
        console.error("Adsense error: ", e);
      }
    }
  }, []);

  if (!slotId) {
    // If no slot ID is provided, do not render the ad
    return null;
  }

  return isAdReady ? (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}
      data-ad-slot={slotId} // Use dynamic ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  ) : null; // Only show the ad when it's ready
}
