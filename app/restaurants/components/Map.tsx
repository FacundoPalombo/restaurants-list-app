"use client";

import useRenderMonkeyPatch from "@/app/hooks/useRenderMonkeyPatch";
import { Restaurant } from "@/app/lib/definitions";
import { LatLng, LatLngExpression, LeafletMouseEventHandlerFn } from "leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  MarkerProps,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Link from "next/link";
import { RestaurantContext } from "./RestaurantChooser";

type MapProps = {
  restaurants: Restaurant[];
  setRestaurant: Function;
};

export default function Map({ restaurants, setRestaurant }: MapProps) {
  const [position, setPosition] = useState<LatLngExpression>([
    40.416729, -3.703339,
  ]);

  //! This is a monkeypatch that waits to first react-render to execute the initialization of react-leaflet
  // is a monkeypatch that needs react-leaflet for rendering, because client components, besides being "client", also executes code on server
  // and breaks down...
  const ready = useRenderMonkeyPatch();

  // Height should be calculated with absolute values for map rendering. see  https://react-leaflet.js.org/docs/v3/start-setup/
  const mapHeight = window.innerHeight - 132;

  return (
    ready && (
      <section className="relative overflow-hidden w-full h-full rounded-2xl">
        <div className="absolute top-0 left-0 rounded-2xl overflow-hidden w-full">
          <MapContainer
            style={{ height: mapHeight }}
            center={position}
            zoom={15}
            scrollWheelZoom={false}
          >
            <ChangeView center={position} zoom={15} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {restaurants.map((props) => (
              <RestaurantMarker {...props} setRestaurant={setRestaurant} />
            ))}
          </MapContainer>
        </div>
      </section>
    )
  );
}

// Component MapView for changing the position and zoom dynamically
function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function RestaurantMarker({
  _id,
  latlng,
  name,
  address,
  setRestaurant,
}: Restaurant & { setRestaurant: Function }) {
  const currentRestaurantId = useContext(RestaurantContext);

  const markerRef = useRef<typeof Marker>(null);

  const handleMarkerClick: LeafletMouseEventHandlerFn = (e) => {
    const restaurantId = e?.target?.options?.children?.key;
    console.log(restaurantId);
    setRestaurant(restaurantId);
  };

  useEffect(() => {
    // Validate if current restaurant has changed
    if (
      currentRestaurantId &&
      markerRef?.current?.options?.children?.key === currentRestaurantId
    ) {
      console.log("marker", markerRef);
      markerRef.current.openPopup();
    }
  }, [currentRestaurantId]);

  return (
    <Marker
      key={_id}
      ref={markerRef}
      eventHandlers={{ click: handleMarkerClick }}
      riseOnHover={true}
      position={[latlng.lat, latlng.lng]}
    >
      <Popup key={_id}>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">
            <b>{name}</b>, {address}
          </h2>
          <Link
            className="rounded-xl px-2 py-1 border text-lg font-semibold border-black w-max"
            href={`/restaurants/${_id}`}
          >
            Ver el restaurante
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}
