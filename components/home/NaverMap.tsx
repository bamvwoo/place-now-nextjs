import { Location, useLocation } from "@/contexts/LocationContext";
import { IPlace } from "@/models/Place";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
    mapRef: React.RefObject<naver.maps.Map | null>;
    nearbyPlaces: IPlace[];
    setNearbyPlaces: React.Dispatch<React.SetStateAction<IPlace[]>>;
};

export default function NaverMap({ mapRef, nearbyPlaces, setNearbyPlaces }: Props) {

    const locationMarkerRef = useRef<naver.maps.Marker | null>(null);

    const { location, subscribe } = useLocation();

    useEffect(() => {
        if (!naver) return;

        if (!mapRef.current) {
            mapRef.current = new naver.maps.Map("mainMap", {
                center: new naver.maps.LatLng(location.lat, location.lng),
                zoom: 17,
                disableKineticPan: false
            });
        }

        if (mapRef.current && !locationMarkerRef.current) {
            locationMarkerRef.current = new naver.maps.Marker({
                position: new naver.maps.LatLng(location.lat, location.lng),
                map: mapRef.current
                /*
                icon: {
                    content: `<img src="${markerImage}" width="300" height="300" />`,
                    size: new naver.maps.Size(300, 300),
                    anchor: new naver.maps.Point(150, 150)
                }
                */
            });
        }

        const unsubscribe = subscribe({
            onChange: (location: Location) => {
                if (mapRef.current) {
                    mapRef.current.setCenter(new naver.maps.LatLng(location.lat, location.lng));
                }

                if (mapRef.current && locationMarkerRef.current) {
                    locationMarkerRef.current.setPosition(new naver.maps.LatLng(location.lat, location.lng));
                }
            }
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.destroy();
                mapRef.current = null;
            }

            if (locationMarkerRef.current) {
                locationMarkerRef.current.setMap(null);
                locationMarkerRef.current = null;
            }

            unsubscribe();
        }
    }, []);

    return (
        <>
            <Wrapper id="mainMap" />
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;