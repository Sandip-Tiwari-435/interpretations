import Link from 'next/link';

const Card = ({ post }) => (
    <Link href={`/watch?v=${post._id}`}>
        <div key={post._id + "post-item"} className="post-item">
            <div className={`image-collage-card ${post.videoUrl.length + post.photoUrl.length + post.artText.length > 2 ? "grid" : ""}`}>
                {post.videoUrl &&
                    post.videoUrl.map((video,index) => (
                        // <div className={`image-collage ${post.videoUrl.length + post.photoUrl.length > 2 ? "grid" : ""}`}>
                        <div key={'vid-grid-item'+video+index} className='grid-item'>
                            <img
                                src={`https://img.youtube.com/vi/${video}/0.jpg`}
                                alt={post.title}
                                style={{ width: '100%' }}
                                key={video + '-home-card'}
                            />
                        </div>
                    ))
                }

                {post.photoUrl &&
                    post.photoUrl.map((image,index) => (
                        // <div className={`image-collage ${post.videoUrl.length + post.photoUrl.length > 2 ? "grid" : ""}`}>
                        <div key={'photo-grid-item'+image+index} className='grid-item'>

                            <img
                                src={image}
                                alt={post.title}
                                style={{ width: '100%' }}
                                key={image}
                            />
                        </div>
                    ))
                }
                {
                    post.artText &&
                    post.artText.map((text,index) =>
                        <div key={'text-grid-item'+index} className='grid-item'>

                            <div className='art-text-card'>
                                {text}
                            </div>
                        </div>
                    )

                }
            </div>
            <h2 style={{ textAlign: 'center' }}>{post.title}</h2> {/* Center text if needed */}

        </div>
    </Link>
);

export default Card;
