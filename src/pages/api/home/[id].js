import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(post);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!post) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(post);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedPost = await Post.deleteOne({ _id: id });
        if (!deletedPost) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

