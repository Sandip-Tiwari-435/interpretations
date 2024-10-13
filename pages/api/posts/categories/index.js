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
                            _id: "$type", 
                            count: { $sum: 1 }, 
                        },
                    },
                    {
                        $sort: { count: -1 }, 
                    },
                ]);

                const sortedTypes = typesWithCount.map((type) => ({
                    type: type._id, 
                    count: type.count,
                }));

                res.status(200).json(sortedTypes); 
            } catch (error) {
                res.status(400).json({ success: false,error:error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

