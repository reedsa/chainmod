"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/firebase";
import { logEvent, type Analytics } from "firebase/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics as Analytics, "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
