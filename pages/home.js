import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Card from '../components/Card';
import Loader from '../components/Loader';

export async function getServerSideProps() {
  let posts = null;

  const res = await fetch(`http://localhost:3000/api/posts`);
  const obj = await res.json();
  if (res.ok)
    posts = obj;

  return {
    props: {
      posts,
    },
  };
}

const HomePage = ({posts}) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1
  };

  if(posts===undefined) return <Loader />

  return (
    <div>
      {posts?.length > 0 ? <>
        <h1>Homepage Feed</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => {
            return <Card key={post._id + "card-component"} post={post} />;
          })}
        </Masonry></> : <Loader />}
    </div>
  );
};

export default HomePage;
