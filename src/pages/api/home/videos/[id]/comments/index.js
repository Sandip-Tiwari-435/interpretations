import dbConnect from '../../../../../../lib/dbConnect';
import Post from '../../../../../../models/Post'; 

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  // Handle PUT request to add a new comment
  switch (req.method){
    case 'GET':
      try {
        const video = await Post.findById(id); // fetch all comments
        if (!video) {
          return res.status(404).json({ message: 'Post not found' });
        }
        const sortedComments=video.comments.sort((a,b)=>{
          return new Date(b.created_at)-new Date(a.created_at);
        });
        res.status(200).json(sortedComments);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
      }

      try {
        // Find the video by its ID
        const video = await Post.findById(id);

        if (!video) {
          return res.status(404).json({ message: 'Post not found' });
        }

        // Append the new comment to the comments array
        video.type='video';
        video.comments.push({ text, likes: 0 }); // You can initialize likes with 0

        // Save the updated video back to the database
        await video.save();

        // Return the updated video data
        return res.status(200).json(video);
      } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
      }
      break;
    default:
      // If the method is not PUT, return a 405 Method Not Allowed
      return res.status(405).json({ message: 'Method not allowed' });
    
  }
}
