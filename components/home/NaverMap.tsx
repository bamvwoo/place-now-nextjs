import { useEffect, useRef, useState } from "react";

export default function NaverMap() {
    const mapRef = useRef<string | HTMLElement>(null);

    const [ location, setLocation ] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if (!window.naver || !mapRef.current) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });

                const mapOptions: naver.maps.MapOptions = {
                    center: new window.naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 17,
                    disableKineticPan: false
                };

                const map = new window.naver.maps.Map(mapRef.current, mapOptions);
            });

            navigator.geolocation.watchPosition((position) => {
                console.log("Current position:", position.coords.latitude, position.coords.longitude);
            });
        }
    }, []);

    return (
      <div 
        ref={mapRef}
        style={{ width: '500px', height: '400px', border: '1px solid #ccc' }}
      />
    );
}