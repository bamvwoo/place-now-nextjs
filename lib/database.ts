import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

let cached = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: (process.env.MONGODB_DATABASE as string)
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}