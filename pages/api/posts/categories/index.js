import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const typesWithCount = await Post.aggregate([
                    {
                        $group: {
                            _id: "$type", // Group by the 'type' field
                            count: { $sum: 1 }, // Count the number of posts in each type
                        },
                    },
                    {
                        $sort: { count: -1 }, // Sort by count in descending order
                    },
                ]);

                // Map the result to return only the types in the required format
                const sortedTypes = typesWithCount.map((type) => ({
                    type: type._id, // '_id' will hold the distinct 'type' value
                    count: type.count,
                }));

                res.status(200).json(sortedTypes); // Return the sorted types as JSON
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

