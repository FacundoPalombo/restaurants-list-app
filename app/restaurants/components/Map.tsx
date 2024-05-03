"use client";

import useRenderMonkeyPatch from "@/app/hooks/useRenderMonkeyPatch";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Map() {
  const position: LatLngExpression = [51.505, -0.09];

  //! This is a monkeypatch that waits to first react-render to execute the initialization of react-leaflet
  // is a monkeypatch that needs react-leaflet for rendering, because client components, besides being "client", also executes code on server
  // and breaks down...
  const ready = useRenderMonkeyPatch();

  // Height should be calculated with absolute values for map rendering. see  https://react-leaflet.js.org/docs/v3/start-setup/
  // const mapHeight = window.innerHeight - 52;

  return (
    ready && (
      <div
        id="map"
        className={`block absolute top-4 left-4 w-full h-full -z-10`}
      >
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}></Marker>
        </MapContainer>
      </div>
    )
  );
}
