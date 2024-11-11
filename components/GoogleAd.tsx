'use client'
import { useEffect } from "react";
export default function GoogleAd({
    slotId
}:{slotId:string}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error: ", e);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
