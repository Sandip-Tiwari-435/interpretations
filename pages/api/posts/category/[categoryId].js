import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  const { categoryId } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const postByType = await Post.find({ type: categoryId }).sort({created_at:-1});
        if (postByType) {
          return res.status(200).json(postByType);
        }
        return res.status(400).json({ success: false, message: "No posts found for this category" });

      } catch (error) {
        return res.status(400).json({ success: false, message: "No posts found for this category",error:error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

