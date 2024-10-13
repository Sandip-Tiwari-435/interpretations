import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import { checkYouTubeVideoExists, getYouTubeVideoTitle } from '../../../utils/generic';
import { isValidObjectId } from 'mongoose';

const handleYouTubeVideo = async (id, res) => {
    try {
        const isValid = await checkYouTubeVideoExists(id);

        if (isValid) {
            const postByYTVideoId = await Post.findOne({ videoUrl: id, photoUrl: [] });

            if (postByYTVideoId) {
                return res.status(200).json(postByYTVideoId);
            } else {
                const title = await getYouTubeVideoTitle(id);
                const newPost = await Post.create({ title, type: 'videos', videoUrl: id });
                return res.status(201).json(newPost);
            }
        } else {
            return res.status(400).json({ message: "Invalid YouTube video ID" });
        }
    } catch (error) {
        console.error("Error handling YouTube video:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                if (isValidObjectId(id)) {
                    const postById = await Post.findById(id);
                    if (postById)
                        return res.status(200).json(postById);

                }
                else {
                    return handleYouTubeVideo(id, res);
                }
                return res.status(400).json({ success: false, message: "No posts could be found or created for this category" });

            } catch (error) {
                console.log(error.message);
                return res.status(400).json({ success: false, message: "Error while finding or creating post" });
            }
            break;

        case 'PUT':
            try {
                const post = await Post.findById(id);
                if (req.body.artText) post.artText=[...post.artText,req.body.artText];
                if (req.body.photoUrl) post.photoUrl=[...post.photoUrl,req.body.photoUrl];
                if (req.body.videoUrl) post.videoUrl=[...post.videoUrl,req.body.videoUrl];

                await post.save();
                res.status(200).json({success:true, message:"Medias successfully added to post",post});
                
            } catch (error) {
                res.status(404).json({success:true, message:"Error while updating post",error:error.message});
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}

