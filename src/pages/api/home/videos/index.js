import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const videos = await Post.find({}); 
        res.status(200).json(videos);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const videoId = req.body.videoUrl.match(videoIdRegex);
        if (videoId && videoId[1]) {
          req.body.videoUrl = videoId[1];
        }
        req.body.type = 'video';
        const video = await Post.create(req.body); 
        res.status(201).json(video);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const result = await Post.deleteMany();
        res.status(201).json(result.deletedCount);
      } catch (err) {
        res.status(400).json({ success: false });
        console.error("Could not delete");
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

