import React from 'react';
import Masonry from 'react-masonry-css';
import Card from '../../components/Card';
import NoPosts from '../../components/NoPosts';

export async function getServerSideProps(context) {
  const { searchTerm } = context.params;
  let category = null;
  let search = null;
  if (searchTerm.length > 0) category = searchTerm.pop();
  if (searchTerm.length > 0) search = searchTerm.pop();

  const query = new URLSearchParams();

  if (search && search !== 'all') query.append('search', search);
  if (category && category !== 'all') query.append('category', category);

  const res = await fetch(`${process.env.DOMAIN}/api/posts?${query.toString()}`); // Example API route
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

const HomePage = ({ posts }) => {

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1
  };

  return (
    <div>
      {posts.length>0 ? <>
        <h1>Search feed</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => {
            return <Card key={post._id} post={post} />;
          }
          )}
        </Masonry></> : <NoPosts />}
    </div>
  );
};

export default HomePage;
