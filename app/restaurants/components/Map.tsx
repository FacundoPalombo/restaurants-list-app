"use client";

import { Restaurant } from "@/app/lib/definitions";
import { LatLngExpression, LeafletMouseEventHandlerFn } from "leaflet";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { RestaurantContext } from "./RestaurantContainer";
import Button from "@/app/components/Button";
import { MapSkeleton } from "./Skeleton";

type MapProps = {
  restaurants: Restaurant[];
  setRestaurant: Function;
};

export const INITIAL_POSITION: LatLngExpression = [40.416729, -3.703339];

// #region Map
export default function Map({ restaurants, setRestaurant }: MapProps) {
  const [selectedRestaurant, currentPosition] = useContext(RestaurantContext);

  //! This is a monkeypatch that waits to first react-render to execute the initialization of react-leaflet
  // is a monkeypatch that needs react-leaflet for rendering, because client components, besides being "client", also executes code on server
  // and breaks down...
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Height should be calculated with absolute values for map rendering. see  https://react-leaflet.js.org/docs/v3/start-setup/
  return (
    isReady && (
      <Suspense fallback={<MapSkeleton />}>
        <section className="relative overflow-hidden w-full h-full rounded-2xl">
          <div className="relative rounded-2xl overflow-hidden w-[100vw]">
            <MapContainer
              style={{ height: global?.window?.innerHeight - 132 }}
              center={INITIAL_POSITION}
              zoom={17}
              scrollWheelZoom={true}
            >
              <ChangeView center={currentPosition} zoom={17} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {restaurants.map((props) => (
                <RestaurantMarker
                  {...props}
                  setRestaurant={setRestaurant}
                  key={props._id}
                />
              ))}
            </MapContainer>
          </div>
        </section>
      </Suspense>
    )
  );
}

// #region ChangeView

function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  map.setView(center, 17);
  return null;
}

// #region Marker
function RestaurantMarker({
  _id,
  latlng,
  name,
  address,
  setRestaurant,
}: Restaurant & { setRestaurant: Function }) {
  const [position, setPosition] = useState<LatLngExpression>(INITIAL_POSITION);

  const [currentRestaurantId, currentPosition] = useContext(RestaurantContext);

  // ops!
  const markerRef = useRef<any>(null);

  const handleMarkerClick: LeafletMouseEventHandlerFn = (e) => {
    const restaurantId = e?.target?.options?.children?.key;
    setRestaurant(restaurantId);
  };

  useEffect(() => {
    // Validate if current restaurant has changed
    if (
      currentRestaurantId &&
      markerRef?.current?.options?.children?.key === currentRestaurantId
    ) {
      const lat = markerRef.current.latlng?.lat;
      const lng = markerRef.current.latlng?.lng;

      const newPosition: LatLngExpression = [lat, lng];

      setPosition(newPosition);

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
          <Button type="link" tipology="cartoon" href={`/restaurants/${_id}`}>
            Ver el restaurante
          </Button>
        </div>
      </Popup>
    </Marker>
  );
}
