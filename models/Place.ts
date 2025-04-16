import mongoose, { Document, Schema, Types, model, models } from 'mongoose';

interface IPlaceLocation {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
}

const placeLocationSchema = new Schema<IPlaceLocation>({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
}, { _id: false });

interface IPlaceLocationInfo {
    postCode: string;
    sido: string;
    sigungu: string;
    address: string;
    buildingName?: string;
}

const placeLocationInfoSchema = new Schema<IPlaceLocationInfo>({
    postCode: { type: String, required: true },
    sido: { type: String, required: true },
    sigungu: { type: String, required: true },
    address: { type: String, required: true },
    buildingName: { type: String },
}, { _id: false });

interface IPlaceImage {
    url: string;
    fileName: string;
    thumbnail?: boolean;
}

const placeImagesSchema = new Schema<IPlaceImage>({
    url: { type: String, required: true },
    fileName: { type: String, required: true },
    thumbnail: { type: Boolean, default: false },
}, { _id: false });

export interface IPlace extends Document {
    name: string;
    location: IPlaceLocation;
    locationInfo: IPlaceLocationInfo;
    images: IPlaceImage[];
    description?: string;
    keywords: string;
    enabled: boolean;
    approved: boolean;
    admin?: Types.ObjectId;
    creator: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const placeSchema = new Schema<IPlace>(
    {
        name: { type: String, required: true, unique: true },
        location: { type: placeLocationSchema, required: true },
        locationInfo: { type: placeLocationInfoSchema, required: true },
        images: { type: [placeImagesSchema], default: [] },
        description: { type: String },
        keywords: { type: String, required: true },
        enabled: { type: Boolean, default: true },
        approved: { type: Boolean, default: false },
        admin: { type: Schema.Types.ObjectId, ref: 'User' },
        creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
);

placeSchema.index({ location: '2dsphere' });

// Hot reload 방지
const Place = models.Place || model<IPlace>('Place', placeSchema);
export default Place;