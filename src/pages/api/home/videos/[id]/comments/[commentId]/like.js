import dbConnect from '../../../../../../../lib/dbConnect';
import Post from '../../../../../../../models/Post';

export default async function handler(req, res) {
  const { id: videoId, commentId } = req.query; 

  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const video = await Post.findById(videoId);

      if (!video) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = video.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      console.log("Likes received in like file",req.body.like);
      comment.likes = req.body.like;

      await video.save();

      return res.status(200).json({ message: 'Like count updated', comment });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
