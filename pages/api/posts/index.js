import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import { fetchResponseFromAi } from '../../../utils/aiUtils';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const { search, category } = req.query;
      let query = {};

      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (category) {
        query.type = category;
      }
      try {
        const videos = await Post.find(query).sort({ created_at: -1 });
        if (!videos) {
          return res.status(404).json({ message: `Posts not found` });
        }
        res.status(200).json(videos);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      let alreadyPresentPost = null;

      if (req.body.videoUrl) {
        const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const videoIds = req.body.videoUrl.map((url) => {
          const videoId = url.match(videoIdRegex);
          if (videoId && videoId[1]) {
            return videoId[1];
          }
          return null; 
        });
        if (videoIds.includes(null)) {
          return res.status(400).json({ message: "Invalid YT url" }, { success: false });
        }
        console.log("videoids",videoIds);
        if (videoIds?.length === 1) {
    
          console.log("Entered video length",videoIds);
          const foundPosts = await Post.find({ videoUrl: { $in: [videoIds[0]] } });
          alreadyPresentPost = foundPosts[0];
        }
        else alreadyPresentPost = await Post.findOne({ videoUrl: videoIds, photoUrl: req.body.photoUrl, artText: req.body.artText });
        req.body.videoUrl = videoIds;
      }
      else if (req.body?.photoUrl?.length === 1) {
        const foundPosts = await Post.find({ photoUrl: { $in: [req.body.photoUrl[0]] } });
        alreadyPresentPost = foundPosts[0];
      }
      else if (req.body?.artText?.length === 1) {
        const foundPosts = await Post.find({ artText: { $in: [req.body.artText[0]] } });
        alreadyPresentPost = foundPosts[0];
      }
      try {
        if (Array.isArray(req.body.comments) && req.body.comments.length > 0) {
          const aiResponse = await fetchResponseFromAi(req.body.comments[0].text);
          if (aiResponse.includes('allowed')) {
            req.body.comments[0].approvedByAi = true;
          }
        }
        if (alreadyPresentPost) {
          console.log("AlreadyPresent", alreadyPresentPost);
          if(req.body.comments) alreadyPresentPost.comments = [req.body.comments[0], ...(alreadyPresentPost.comments)];
          await alreadyPresentPost.save();
          return res.status(202).json(alreadyPresentPost);
        }

        const video = await Post.create(req.body);
        res.status(201).json(video);
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        const result = await Post.deleteMany();
        res.status(201).json(result.deletedCount);
      } catch (err) {
        res.status(400).json({ success: false, err });
        console.error("Could not delete");
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

