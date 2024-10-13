import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const AddMedia = ({ postId, handleAddMediaSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [artText, setArtText] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!artText && !photoUrl && !videoUrl) return;
        try {
            setIsSubmitting(true);
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({artText,photoUrl,videoUrl})
            });
            const obj = await res.json();
            if (res.ok) {
                handleAddMediaSubmit(obj.post);
            }
        } catch (error) {
            console.error("Error while updating post",error.message);
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    }

    return (
        <>
            <button className='guidelines-button' onClick={() => setIsModalOpen(true)}>
                + Add
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal-content-custom-guidelines"
                overlayClassName="modal-overlay-custom"
                contentLabel="Guidelines"
            >
                <div>
                    <h2 className="modal-title-custom">Add Media</h2>
                    <p>Something that completes, enhances, or goes well with the existing media</p>
                    <form onSubmit={(e) => handleSubmit(e)} className="post-form-container-custom">
                        <label>Text:</label>
                        <textarea
                            value={artText}
                            onChange={(e) => setArtText(e.target.value)}
                            placeholder="Art Text..."
                            rows="3"
                            className="textarea-art-text"
                        />

                        <label>Image Url:</label>
                        <input
                            type="url"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            className='input-width-full'
                        />

                        <label>Video Url:</label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder='YT video url'
                            className='input-width-full'
                        />

                        <button type="submit" className="submit-button-custom">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AddMedia;