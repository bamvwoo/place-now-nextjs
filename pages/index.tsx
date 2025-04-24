import NaverMap from "@/components/home/NaverMap";
import { useLocation } from "@/contexts/LocationContext";
import { useEffect } from "react";

export default function Home() {

    const { updateLocation } = useLocation();

    useEffect(() => {
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
            if (navigator.geolocation) {
                navigator.geolocation.clearWatch(0);
            }
        };
    }, []);

    return (
        <>
            <NaverMap />
        </>
    );
}