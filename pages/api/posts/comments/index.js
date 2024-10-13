import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post'; 
import { fetchResponseFromAi } from '../../../../utils/aiUtils';

export default async function handler(req, res) {
  const { videoId,commentId } = req.query;

  await dbConnect();

  switch (req.method){
    case 'GET':
      try {
        const post = await Post.findById(videoId);
        if (!post) {
          return res.status(404).json({ message: `Post not found for videoId ${videoId}` });
        }
        const sortedComments=post.comments.sort((a,b)=>{
          return new Date(b.created_at)-new Date(a.created_at);
        });
        res.status(200).json(sortedComments);
      } catch (error) {
        res.status(400).json({ success: false,error:error.message });
      }
      break;

    case 'POST':
      const { author, text } = req.body;

      if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
      }
      let obj={text};

      try {
        const post = await Post.findById(videoId);

        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

        const aiResponse = await fetchResponseFromAi(text);
        const aiResponseObject=JSON.parse(aiResponse);
        if (aiResponseObject.status ==='allowed') {
          obj.approvedByAi=true;
        }

        if(author) obj.author=author;
        post.comments=[obj,...(post.comments)]; 

        await post.save();
        const uploadedComment=post.comments[0];
        return res.status(201).json({obj:uploadedComment,aiResponseObject});
      } catch (error) {
        return res.status(500).json({ message: 'Server error',error:error.message });
      }
      break;
    case 'PUT':
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
        return res.status(500).json({ message: 'Server error',error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
    
  }
}
