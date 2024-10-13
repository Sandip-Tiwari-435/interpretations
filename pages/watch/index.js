import React, { useState, useRef, useEffect } from 'react';
import Comment from '../../components/Comment';
import ToggleSwitch from '../../components/ToggleSwitch';
import Tooltip from '../../components/Tooltip';
import NoPosts from '../../components/NoPosts';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import MediaViewer from '../../components/MediaViewer';
import { getSeconds } from '../../utils/generic';
import AddMedia from '../../components/AddMedia';
import NoComments from '../../components/NoComments';

export async function getServerSideProps(context) {
    const v = context.query.v;
    const resPost = await fetch(`${process.env.DOMAIN}/api/posts/${v}`);
    const post = await resPost.json();

    if (resPost.ok) {
        return { props: { post } };
    }
}

const PostDetail = ({ post }) => {
    const [comments, setComments] = useState();
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [showApprovedComments, setShowApprovedComments] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [statusComment, setStatusComment] = useState('');
    const [closeStatusComment, setCloseStatusComment] = useState(true);
    const [reason, setReason] = useState('');
    const [flashTextVar, setFlashTextVar] = useState(0);
    const [vidToShow, setVidToShow] = useState();
    const [imgToShow, setImgToShow] = useState();
    const [textToShow, setTextToShow] = useState();
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const [mediaLister, setMediaLister] = useState([]);
    const [timeToSeekTo, setTimeToSeekTo] = useState(0);

    let mediaList = [];
    const flashTextList = process.env.NEXT_PUBLIC_FLASH_IN_TEXT_AREA?.split("|");

    const iframeRef = useRef(null);
    const router = useRouter();
    const { v } = router.query;

    const makeMediaList = (objPost) => {
        mediaList = mediaList.concat(
            objPost.videoUrl.map((vi) => ({ type: "video", src: vi })),
            objPost.photoUrl.map((p) => ({ type: "photo", src: p })),
            objPost.artText.map((t) => ({ type: "text", src: t }))
        );
        setMediaLister(mediaList);
        setComments(objPost.comments);
    }

    useEffect(() => {
        makeMediaList(post);

        const updateVariable = () => {
            setFlashTextVar(prev => (prev + 1) % flashTextList?.length);
        };

        const intervalId = setInterval(updateVariable, 5000);

        return () => clearInterval(intervalId);
    }, [v]);

    const onLoadFocus = (e) => {
        e.target.focus();
    }

    const showMedia = (e) => {
        e.preventDefault();
        if (e.target.tagName === 'IFRAME')
            setVidToShow(e.target.src);
        else if (e.target.tagName === 'IMG') setImgToShow(e.target.src);
        else setTextToShow(e.target.innerText);

        setIsMediaOpen(!isMediaOpen);
    }

    const handleCitation = (n, timeToSeekTo) => {
        toggleMediaOpen();

        if (mediaLister[n - 1]?.type === 'video') {
            if (timeToSeekTo && timeToSeekTo[1]) setTimeToSeekTo(getSeconds(timeToSeekTo[1]));
            setVidToShow(mediaLister[n - 1].src);
            var framesRaw = document.getElementsByTagName("iframe");
            var frames = Array.prototype.slice.call(framesRaw);
            frames.map((frame) => {
                frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            })
        }
        if (mediaLister[n - 1]?.type === 'photo') setImgToShow(mediaLister[n - 1].src);
        if (mediaLister[n - 1]?.type === 'text') setTextToShow(mediaLister[n - 1].src);
    }
    const toggleMediaOpen = () => {
        setVidToShow('');
        setTimeToSeekTo(0);
        setImgToShow('');
        setTextToShow('');
        setIsMediaOpen(!isMediaOpen);
    }

    const handleToggleChange = () => {
        setShowApprovedComments(!showApprovedComments);
    };

    const handleAddMediaSubmit = (post) => {
        makeMediaList(post);
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/posts/comments?videoId=${post?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment, author: author, likes: 0 }),
            });
            const obj = await res.json();
            if (res.ok) {
                if (obj.aiResponseObject.status === 'allowed') {
                    setStatusComment("approved");
                    setShowApprovedComments(true);
                } else {
                    setStatusComment("unapproved");
                    setShowApprovedComments(false);
                }
                setHasSubmitted(true);
                setReason(obj.aiResponseObject.message);

                setComments([obj.obj, ...comments]);
                setComment('');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
            setCloseStatusComment(false);
        }
    };

    const filteredComments = comments?.filter(c => c.approvedByAi === showApprovedComments);

    if (post === undefined) return <Loader />;
    return (
        <div className="container" key={post?._id + '-container'}>
            <MediaViewer isMediaOpen={isMediaOpen} textToShow={textToShow} imgToShow={imgToShow} vidToShow={vidToShow} toggleMediaOpen={toggleMediaOpen} timeToSeekTo={timeToSeekTo} />
            {post ? (<><h1>{post.title}</h1>
                <div className={`image-collage ${mediaLister.length > 2 ? "grid" : ""}`}>
                    {
                        mediaLister && mediaLister.map((p, index) =>
                            <div className={`collage-item${mediaLister.length < 3 ? '-no-hover-zoom' : ''}`} key={post._id + '-collage-item' + index}>
                                <div className="overlay">m{index + 1}</div>
                                {console.log(process.env.NEXT_PUBLIC_MAIN_POST_YT_SRC_TEMPLATE)}
                                {p.type === 'video' &&
                                    <iframe tabindex="0" ref={iframeRef} key={post._id + index} src={process.env.NEXT_PUBLIC_MAIN_POST_YT_SRC_TEMPLATE?.replaceAll("vidToShow",p.src)} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen onLoad={onLoadFocus}></iframe>
                                }
                                {p.type === 'photo' &&
                                    <img
                                        src={p.src}
                                        alt={post.title}
                                        style={{ width: '100%' }}
                                        onClick={showMedia}
                                    />
                                }
                                {p.type === 'text' &&
                                    <div className='art-text-card' onClick={showMedia}>{p.src}</div>
                                }

                            </div>
                        )

                    }

                </div>
                <div className='add-media'>Help others better understand the art by uploading complementary media <AddMedia postId={post?._id} handleAddMediaSubmit={handleAddMediaSubmit} /> </div>
                <div className='modal-heading-custom'>
                    <h2>Interpretations</h2>
                    <div className='modal-heading-custom-comments-heading'>
                        <ToggleSwitch isToggled={showApprovedComments} onToggleChange={handleToggleChange} />
                        <small>Approved By AI</small>
                    </div>
                </div>
                <div className={`caution-message ${filteredComments?.length === 0 && 'no-display'}`} key={'caution-msg'}><span className='caution-heading'>⚠Caution:</span> Reading the below interpretations might cause you to lose your original perspective on the art</div>

                {!closeStatusComment && hasSubmitted ? (<div key={post._id + '-status-comment'} className={`modal-heading-custom ${statusComment === 'unapproved' ? 'error-message' : 'success-message'}`}>
                    <div>Your latest comment was {statusComment} {statusComment === 'unapproved' ? `by our not-good-for-anything degenerate AI. It says ${reason}. Like what? Pfft` : `. Thanks for your precious insight! It says ${reason}`}</div>
                    <div className='close-comment-status-button' onClick={() => setCloseStatusComment(true)}>X</div>
                </div>
                ) : ''
                }


                <form onSubmit={handleCommentSubmit} className="commentForm">

                    <textarea
                        value={comment}
                        onChange={(e) => { e.preventDefault(); setComment(e.target.value); }}
                        placeholder={flashTextList[flashTextVar]}
                        rows="3"
                        className="textarea"
                    />
                    <input
                        key={post._id + '-pen-name'}
                        placeholder='Your pen name...'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='input-width-full'
                    />
                    <div className='modal-heading-custom'>
                        <button type="submit" className="submitButton">{!isSubmitting ? "Submit" : "Submitting...."}</button>
                        <Tooltip />
                    </div>
                </form>

                <div>
                    {filteredComments?.length === 0 ? (<NoComments key={'no-comments'} showApprovedComments={showApprovedComments} />) : (filteredComments?.map((c) => (
                        <Comment key={c._id} text={c.text} initialLikes={c.likes} postId={post._id} commentId={c._id} author={c.author} created_at={c.created_at} handleCitation={handleCitation} />
                    ))
                    )}
                </div></>) : (<NoPosts />)}
        </div>
    );
};

export default PostDetail;
