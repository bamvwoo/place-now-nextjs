import { IPlace } from "@/models/Place";

export default function PlaceMarker({ place }: { place: IPlace }) {
    const { name } = place;

    return (
        <div>
            <h3>{name}</h3>
        </div>
    );
}