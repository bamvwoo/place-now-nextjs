import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/database';
import Place from '@/models/Place';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    const methodHandlers: Record<string, () => Promise<void>> = {
        GET: () => handleGet(req, res)
    };

    const method = req.method?.toUpperCase();

    if (method && methodHandlers[method]) {
        return methodHandlers[method]();
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { lat, lng, radius = 300 } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({ error: 'lat/lng is required' });
    }

    try {
        const nearbyPlaces = await Place.find({
            enabled: true,
            approved: true,
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng as string), parseFloat(lat as string)],
                    },
                    $maxDistance: parseInt(radius as string), // default: 1000 meters
                },
            },
        });

        res.status(200).json(nearbyPlaces);
    } catch (error) {
        res.status(500).json({ error: '불러오는 중 오류 발생' });
    }
}