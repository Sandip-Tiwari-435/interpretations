import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const post = await Post.find({}); // fetch all posts
        res.status(200).json(post);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        switch (req.body.type) {
          case 'video':
            const video = await fetch(`http://localhost:3000/api/posts/videos`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(req.body),
            });
            res.status(201).json(video);
            break;
          default:
            const post = await Post.create(req.body); // create new post
            res.status(201).json(post);
            break;
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

