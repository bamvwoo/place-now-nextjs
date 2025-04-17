import NaverMap from "@/components/home/NaverMap";
import { Location, useLocation } from "@/contexts/LocationContext";
import { IPlace } from "@/models/Place";
import { useEffect, useRef, useState } from "react";

export default function Home() {

    const mapRef = useRef<naver.maps.Map | null>(null);

    const [nearbyPlaces, setNearbyPlaces] = useState<IPlace[]>([]);

    const { updateLocation, subscribe } = useLocation();

    useEffect(() => {
        const unsubscribe = subscribe({
            onChange: async (location: Location) => {
                const response = await fetch(`/api/places/nearby?lat=${location.lat}&lng=${location.lng}`);
                const data = await response.json();

                setNearbyPlaces(data);
            }
        });

        if (navigator.geolocation) {
            const handlePositionChange = (position: GeolocationPosition) => {
                updateLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            };

            navigator.geolocation.getCurrentPosition(handlePositionChange);
            navigator.geolocation.watchPosition(handlePositionChange);
        }

        return () => {
            unsubscribe();

            if (navigator.geolocation) {
                navigator.geolocation.clearWatch(0);
            }
        };
    }, []);

    return (
        <>
            <NaverMap mapRef={mapRef} nearbyPlaces={nearbyPlaces} setNearbyPlaces={setNearbyPlaces} />
        </>
    );
}