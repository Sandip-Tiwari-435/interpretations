import React from 'react';

const NoComments = ({showApprovedComments}) => {
  return (
    <div className="no-posts-container">
      <h2>No {showApprovedComments?'Approved':'Unapproved'} Interpretations yet!</h2>
      <p>We await your thoughtful interpretations</p>
    </div>
  );
};

export default NoComments;