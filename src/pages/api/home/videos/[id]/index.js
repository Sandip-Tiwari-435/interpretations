import dbConnect from '../../../../../lib/dbConnect';
import Post from '../../../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const video = await Post.findById(id);
        if (!video) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(video);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const video = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!video) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(video);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedVideo = await Post.deleteOne({ _id: id });
        if (!deletedVideo) {
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

