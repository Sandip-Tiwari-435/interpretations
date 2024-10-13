import React from 'react';
import Modal from 'react-modal';

const MediaViewer = ({ isMediaOpen, textToShow, imgToShow, vidToShow, toggleMediaOpen, timeToSeekTo }) => {
    return (
        <>
            <Modal
                isOpen={isMediaOpen}
                key={'media-viewer'}
                onRequestClose={() => toggleMediaOpen()}
                className="modal-content-custom-mediaviewer"
                overlayClassName="modal-overlay-custom"
                contentLabel="Guidelines"
            >
                <div className='image-collage mediaviewer'>
                    {vidToShow &&

                        <iframe style={{ width: '100%' }} key={vidToShow} src={`https://www.youtube.com/embed/${vidToShow}?autoplay=1&cc_load_policy=1&cc_lang_pref=en&showinfo=0&loop=1&controls=0&playlist=${vidToShow}&start=${timeToSeekTo}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    }
                    {imgToShow &&
                        <img
                            src={imgToShow}
                            alt={imgToShow}
                            style={{ width: '100%' }}
                        />
                    }
                    {textToShow &&
                        <h1 className='art-text-media-viewer'>{textToShow}</h1>
                    }
                    {
                        !imgToShow && !vidToShow && !textToShow &&
                        <img
                            src={'/images/deadpool.gif'}
                            alt={imgToShow}
                            style={{ width: '100%' }}
                        />
                    }
                </div>
                <div className='close-comment-status-button' onClick={toggleMediaOpen}>X</div>

            </Modal>
        </>
    );
};

export default MediaViewer;