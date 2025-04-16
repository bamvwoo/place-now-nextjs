import NaverMap from "@/components/home/NaverMap";
import { IPlace } from "@/models/Place";
import { useEffect, useState } from "react";

export default function Home() {

    const [nearbyPlaces, setNearbyPlaces] = useState<IPlace[]>([]);

    useEffect(() => {

    }, []);

    return (
        <>
            <NaverMap nearbyPlaces={nearbyPlaces} setNearbyPlaces={setNearbyPlaces} />
        </>
    );
}