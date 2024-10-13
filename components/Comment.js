import React, { useState } from 'react';

const Comment = ({ text, initialLikes, postId, commentId, author, created_at, handleCitation }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [clicked, setClicked] = useState(false);

  const handleLike = async () => {
    const initer = likes;
    let newLikes;
    if (!clicked) {
      newLikes = likes + 1;
      setLikes(newLikes);
    } else {
      newLikes = likes - 1;
      setLikes(newLikes);
    }

    setClicked(!clicked);

    try {
      const res = await fetch(`/api/posts/comments?videoId=${postId}&commentId=${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ like: newLikes }),
      });

      if (!res.ok) {
        throw new Error('Failed to update like count');
      }

    } catch (err) {
      console.error(err);
      setLikes(initer);
    }

  };

  const transformText = (text) => {
    const words = text?.split(' ');

    const pattern = /^m\d+$/;
    const mediaNumberExtractionPattern = /(\d+)/g;
    const timePattern = /^m\d+@(\d{1,2}:\d{2})$/;

    return words.map((word, index) => {
      if (pattern.test(word) || timePattern.test(word)) {
        return (
          <React.Fragment key={index}>
            <button key={index} className='comment-citation' onClick={() => handleCitation(word.match(mediaNumberExtractionPattern)[0], word.match(timePattern))}>
              {word}
            </button>{' '}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {word}{' '}
          </React.Fragment>)
      }
    });
  };

  return (
    <div key={commentId + "comment-container"} className="commentContainer">
      <div key={commentId + "comment-header"} className="commentHeader">
        <span key={commentId + "comment-author"} className="commentAuthor">{author}</span>
        <span key={commentId + "comment-timestamp"} className="commentTimestamp">{new Date(created_at).toLocaleString()}</span>
      </div>
      <div key={commentId + "comment-text"} className="commentText">{transformText(text)}</div>
      <div className="likesContainer">
        <button onClick={handleLike} className="likeButton">
          👍 Like
        </button>
        <span className="likesCount">
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  );
};


export default Comment;
