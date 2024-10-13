// models/Video.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: [{ type: String }],
  photoUrl: [{ type: String }],
  type: { type: String, required: true },
  artText: [
    {
      type: String,
    }
  ],
  comments: [
    {
      text: String,
      author: { type: String, default: 'Anonymous' },
      likes: { type: Number, default: 0 },
      approvedByAi: { type: Boolean, required: true, default: false },
      created_at: { type: Date, default: Date.now },
    }
  ],
  created_at: { type: Date, default: Date.now },
});

PostSchema.index({ 'comments._id': 1 });
PostSchema.index({ '_id': 1 });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);

