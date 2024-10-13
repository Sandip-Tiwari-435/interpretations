import React from 'react';
import Masonry from 'react-masonry-css';
import Card from '../../../components/Card';
import NoPosts from '../../../components/NoPosts';

export async function getServerSideProps(context) {
    const category = context.params.category;
    const res = await fetch(`${process.env.DOMAIN}/api/posts/category/${category}`);
    const posts = await res.json();

    if (!res.ok) {
        throw new Error(posts.message || 'Something went wrong');
    }
    return { props: { posts, category } };
}

const PostPage = ({ posts, category }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 2,
        700: 1
    };

    return (
        <div>
            {posts?.length>0 ? (<>
                <h1>{category && category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {posts.map(post => (
                        <div key={post._id} className="video-item">
                            <Card key={post._id} post={post} />;
                        </div>
                    ))}
                </Masonry>
            </>) : <NoPosts />}
        </div>
    );
};

export default PostPage;
