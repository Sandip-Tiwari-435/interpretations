import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';

Modal.setAppElement('#__next');

const PostFormModal = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('uncategorised');
  const [customCategory, setCustomCategory] = useState('');
  const [title, setTitle] = useState('');
  const [artText, setArtText] = useState(['']);
  const [videoUrl, setVideoUrl] = useState(['']);
  const [imageUrl, setImageUrl] = useState(['']);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/posts/categories');
      const categoriesData = await res.json();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, [router.asPath]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const handleAddVideoUrl = () => {
    if (videoUrl.at(-1) != '') {
      setVideoUrl([...videoUrl, '']);
    }
  };

  const handleDeleteVideoUrl = (e, index) => {
    e.preventDefault();
    const newVideoUrls = [...videoUrl];
    newVideoUrls.splice(index, 1);
    setVideoUrl(newVideoUrls);
  };

  // Handle video URL input change
  const handleVideoUrlChange = (e, index) => {
    const newVideoUrls = [...videoUrl];
    newVideoUrls[index] = e.target.value;
    setVideoUrl(newVideoUrls);
  };

  // Add new image URL field
  const handleAddImageUrl = () => {
    if (imageUrl.at(-1) != '')
      setImageUrl([...imageUrl, '']);

  };

  const handleDeleteImageUrl = (e, index) => {
    e.preventDefault();
    const newImageUrls = [...imageUrl];
    newImageUrls.splice(index, 1);
    setImageUrl(newImageUrls);
  };

  // Handle image URL input change
  const handleImageUrlChange = (e, index) => {
    const newImageUrls = [...imageUrl];
    newImageUrls[index] = e.target.value;
    setImageUrl(newImageUrls);
  };

  const handleAddArtText = () => {
    if (artText.at(-1) != '')
      setArtText([...artText, '']);
  };

  const handleDeleteArtText = (e, index) => {
    e.preventDefault();
    const newArtTexts = [...artText];
    newArtTexts.splice(index, 1);
    setArtText(newArtTexts);
  };

  const handleArtTextChange = (e, index) => {
    const newArtTexts = [...artText];
    newArtTexts[index] = e.target.value;
    setArtText(newArtTexts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const postData = {
        type: category === 'custom' ? customCategory.toLowerCase() : category.toLowerCase(),
        title,
        artText: artText[0] ? artText : [],
        videoUrl: videoUrl[0] ? videoUrl : [],
        photoUrl: imageUrl[0] ? imageUrl : [],
        comments: [{ text: comment, author }],
      };
      const res = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const obj = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        setCustomCategory('');
        setCategory('uncategorised');
        setComment('');
        setErrorMessage('');
        setArtText(['']);
        setVideoUrl(['']);
        setImageUrl(['']);
        setTitle('');
        router.push(`/watch?v=${obj._id}`);
      } else {
        throw new Error(obj.message || 'Something went wrong');
      }

    } catch (error) {
      setErrorMessage(error.message);
    } finally {

      setIsSubmitting(false);
    }

  };

  return (
    <>
      {/* Floating button at bottom-right */}
      <button className="floating-button-custom" onClick={() => setIsModalOpen(true)}>
        +
      </button>

      {/* Modal for the post submission form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content-custom"
        overlayClassName="modal-overlay-custom"
        contentLabel="Submit a Post"
      >
        <div className='modal-heading-custom'>
          <h2 className="modal-title-custom">Submit a Post</h2>
          <button className="close-button-custom" onClick={() => setIsModalOpen(false)}>
            X
          </button>
        </div>
        {errorMessage !== '' && (
          <span className="error-message">{errorMessage}</span>
        )}
        <form onSubmit={handleSubmit} className="post-form-container-custom">
          {/* Post Category */}
          <label>Post Category:</label>
          <select className="select-post-category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.type} value={category.type}>{`${category.type.charAt(0).toUpperCase() + category.type.slice(1)}`}</option>
            ))}
            <option key="custom" value="custom">Custom</option>
          </select>

          {/* Custom Category Field */}
          {category === 'custom' && (
            <>
              <label>Custom Category:</label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className='input-width-full'
                required
              />
            </>
          )}

          {/* Title */}
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input-width-full'
            required
          />

          <>
            <div className='modal-heading-custom'>
              <label>Art Text (Optional):</label>
              <button key='text-add' className='add-url-button-custom' type="button" onClick={handleAddArtText}>+</button>
            </div>
            {artText?.map((t, index) => (
              <div key={'art-text' + index} className='modal-heading-custom'>
                <textarea
                  value={t}
                  onChange={(e) => handleArtTextChange(e, index)}
                  placeholder="Art Text"
                  rows="3"
                  className="textarea-art-text"
                />
                {index != 0 &&
                  <button key={'art-text-delete-button' + index} onClick={(e) => handleDeleteArtText(e, index)}>Delete</button>
                }
              </div>
            ))}
          </>

          <>
            <div className='modal-heading-custom'>
              <label>Video URLs (Optional):{errorMessage === 'Invalid YT Url' && (
                <span className="error-message">{errorMessage}</span>
              )}</label>
              <button key='video-add' className='add-url-button-custom' type="button" onClick={handleAddVideoUrl}>+</button>
            </div>
            {videoUrl.map((url, index) => (
              <div key={'video' + index} className='modal-heading-custom'>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleVideoUrlChange(e, index)}
                  className='input-width-full'
                  key={'video' + index}
                />
                {index != 0 &&
                  <button key={'video-delete-button' + index} onClick={(e) => handleDeleteVideoUrl(e, index)}>Delete</button>
                }
              </div>
            ))}
          </>
          <>
            <div className='modal-heading-custom'>
              <label>Image URLs (Optional):</label>
              <button key='image-add' className='add-url-button-custom' type="button" onClick={handleAddImageUrl}>+</button>
            </div>
            {imageUrl.map((url, index) => (
              <div key={'image' + index} className='modal-heading-custom'>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(e, index)}
                  className='input-width-full'
                  key={'image' + index}
                />
                {index != 0 &&
                  <button key={'image-delete-button' + index} onClick={(e) => handleDeleteImageUrl(e, index)}>Delete</button>
                }
              </div>
            ))}
          </>

          <label>I know you wanna say something:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your legendary interpretation..."
            rows="3"
            className="textarea"
            required
          />
          <input
            key={'pen-name-form-modal'}
            placeholder='Your pen name... (Optional)'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='input-width-full'
          />

          <button type="submit" className="submit-button-custom">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default PostFormModal;