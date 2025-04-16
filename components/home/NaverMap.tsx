import useLocation, { Location } from "@/hooks/useLocation";
import { IPlace } from "@/models/Place";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
    nearbyPlaces: IPlace[];
    setNearbyPlaces: React.Dispatch<React.SetStateAction<IPlace[]>>;
};

export default function NaverMap({ nearbyPlaces, setNearbyPlaces }: Props) {
    const mapRef = useRef<naver.maps.Map | null>(null);
    const markerRef = useRef<naver.maps.Marker | null>(null);

    const { updateLocation } = useLocation();

    const fetchNearbyPlaces = async (location: Location) => {
        const response = await fetch(`/api/places/nearby?lat=${location.latitude}&lng=${location.longitude}`);
        const data = await response.json();

        setNearbyPlaces(data);
    };

    useEffect(() => {
        if (!naver) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newLocation: Location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                updateLocation(newLocation);

                fetchNearbyPlaces(newLocation);

                // 맵 초기화
                if (!mapRef.current) {
                    mapRef.current = new naver.maps.Map("mainMap", {
                        center: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        zoom: 17,
                        disableKineticPan: false
                    });
                }

                // 마커 초기화
                if (mapRef.current && !markerRef.current) {
                    markerRef.current = new naver.maps.Marker({
                        position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
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
            });

            navigator.geolocation.watchPosition((position) => {
                const newLocation: Location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                updateLocation(newLocation);

                fetchNearbyPlaces(newLocation);

                if (mapRef.current) {
                    mapRef.current.setCenter(new naver.maps.LatLng(newLocation.latitude, newLocation.longitude));
                }

                if (markerRef.current) {
                    markerRef.current.setPosition(new naver.maps.LatLng(newLocation.latitude, newLocation.longitude));
                }
            });
        }
    }, []);

    return (
        <Wrapper id="mainMap" />
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;