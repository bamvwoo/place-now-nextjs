import { Location, useLocation } from "@/contexts/LocationContext";
import { IPlace } from "@/models/Place";
import { useEffect, useRef } from "react";
import { renderToString } from 'react-dom/server';
import styled from "styled-components";
import LocationMarker from "./LocationMarker";
import PlaceMarker from "./PlaceMarker";
import { createRoot } from "react-dom/client";

export default function NaverMap() {

    const mapRef = useRef<naver.maps.Map | null>(null);
    const locationMarkerRef = useRef<naver.maps.Marker | null>(null);
    const nearbyRangeRef = useRef<naver.maps.Circle | null>(null);

    const { location, subscribe } = useLocation();

    const getMarkerContent = (children: React.ReactNode) => {
        const container = document.createElement('div');

        const root = createRoot(container);
        root.render(children);

        return container;
    };

    useEffect(() => {
        if (!naver) return;

        if (!mapRef.current) {
            // #. 네이버 맵 생성
            mapRef.current = new naver.maps.Map("mainMap", {
                center: new naver.maps.LatLng(location.lat, location.lng),
                zoom: 17,
                disableKineticPan: false
            });
        }


        if (mapRef.current && !locationMarkerRef.current) {
            // #. 현재 위치 마커 생성
            locationMarkerRef.current = new naver.maps.Marker({
                position: new naver.maps.LatLng(location.lat, location.lng),
                map: mapRef.current,
                icon: {
                    content: getMarkerContent(<LocationMarker />),
                    size: new naver.maps.Size(200, 200),
                    anchor: new naver.maps.Point(100, 100)
                }
            });

            // #. 현재 위치 기준 반경 300m 원 생성
            nearbyRangeRef.current = new naver.maps.Circle({
                map: mapRef.current,
                center: new naver.maps.LatLng(location.lat, location.lng),
                radius: 300,
                strokeColor: "#3399ff",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#cce6ff",
                fillOpacity: 0.3
            });
        }

        const unsubscribe = subscribe({
            onChange: (newLocation: Location, nearbyPlaces: IPlace[]) => {
                if (mapRef.current) {
                    if (!location.lat && !location.lng) {
                        mapRef.current.setCenter(new naver.maps.LatLng(newLocation.lat, newLocation.lng));
                    }

                    // #. 현재 위치 마커 위치 변경
                    if (locationMarkerRef.current) {
                        locationMarkerRef.current.setPosition(new naver.maps.LatLng(newLocation.lat, newLocation.lng));
                    }

                    // #. 현재 위치 기준 반경 300m 원 중심 위치 변경
                    if (nearbyRangeRef.current) {
                        nearbyRangeRef.current.setCenter(new naver.maps.LatLng(newLocation.lat, newLocation.lng));
                    }

                    for (const nearbyPlace of nearbyPlaces) {
                        const lat = nearbyPlace.location.coordinates[1];
                        const lng = nearbyPlace.location.coordinates[0];

                        const nearbyPlaceMarker = new naver.maps.Marker({
                            position: new naver.maps.LatLng(lat, lng),
                            map: mapRef.current,
                            icon: {
                                content: getMarkerContent(<PlaceMarker place={nearbyPlace} />)
                            }
                        });

                        naver.maps.Event.addListener(nearbyPlaceMarker, 'click', (e) => {
                            console.log(nearbyPlace);
                        });
                    }
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