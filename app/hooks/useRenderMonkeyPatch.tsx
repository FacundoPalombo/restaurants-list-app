"use client";

import { useEffect, useState } from "react";

//! This is a monkeypatch hook that waits to first react-render to execute the initialization of react-leaflet
// is a monkeypatch that needs react-leaflet for rendering, because client components, besides being "client", also executes code on server
// and breaks down...
export default function useRenderMonkeyPatch() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady;
}
