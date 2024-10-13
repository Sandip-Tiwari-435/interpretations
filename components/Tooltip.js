import React, { useState } from 'react';
import Modal from 'react-modal';

const ToolTip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className='guidelines-button' onClick={() => setIsModalOpen(true)}>
        Guidelines
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content-custom-guidelines"
        overlayClassName="modal-overlay-custom"
        contentLabel="Guidelines"
      >
        <div>
          <h2 className="modal-title-custom">Guidelines</h2>
          <ul class="guidelines-list">
            <li>
              <span class="guideline-title">Focus on Interpretation</span>
              <span class="info-icon">i</span>
              <div class="tooltip">Example: Discuss how van Gogh's use of vibrant colors in "The Starry Night" reflects his emotional turmoil.</div>
            </li>
            <li>
              <span class="guideline-title">Explore Complex Themes</span>
              <span class="info-icon">i</span>
              <div class="tooltip">Example: Analyze the theme of individuality in "Dead Poets Society" and its relevance to self-identity.</div>
            </li>
            <li>
              <span class="guideline-title">Engage with Sensitive Topics</span>
              <span class="info-icon">i</span>
              <div class="tooltip">Example: Discuss the portrayal of mental health in "The Bell Jar" and its impact on societal perceptions.</div>
            </li>
            <li>
              <span class="guideline-title">Avoid Irrelevant Content</span>
              <span class="info-icon">i</span>
              <div class="tooltip">Example: Rather than saying "This is the best movie ever!", analyze specific elements that contribute to its quality.</div>
            </li>
            <li>
              <span class="guideline-title">Encourage Meaningful Discourse</span>
              <span class="info-icon">i</span>
              <div class="tooltip">Example: Discuss how "The Road Not Taken" by Frost reflects on the complexity of choices in life.</div>
            </li>
          </ul>
        </div>
        <h3>Approvable comments</h3>
        <ul className='ul-guidelines-eg'>
          <li>The use of layered dreams in 'Inception' brilliantly illustrates the complexity of the human subconscious. As Cobb navigates through different levels of reality, it raises questions about the nature of dreams and their influence on our waking lives. The emotional climax in the final scene emphasizes the importance of letting go of guilt and moving forward</li>
          <li>Orwell's portrayal of a dystopian society in '1984' serves as a powerful warning against totalitarianism. The concept of 'Big Brother' symbolizes the invasive surveillance state, inviting readers to reflect on the implications of privacy in our modern world. The protagonist's internal struggle reveals the human spirit's resilience in the face of oppressive regimes</li>
          <li>In 'This Is America,' Gambino masterfully juxtaposes vibrant visuals with unsettling themes of gun violence and racial discrimination. The chaotic dance sequences symbolize how entertainment often distracts from harsh realities, prompting viewers to critically analyze the societal issues that lie beneath the surface of American culture</li>
          <li>Dalí's 'The Persistence of Memory' challenges our perceptions of time and reality. The melting clocks signify the fluidity of time and its subjective nature, reflecting on how memories shape our identities. This surreal composition invites viewers to contemplate the intersection of dreams and reality in their own lives</li>
          <li>The Waste Land' captures the disillusionment of post-World War I society. Eliot’s use of fragmented structure and diverse literary references illustrates the chaos and despair of modern existence. The imagery of desolation and yearning for renewal resonates deeply, urging readers to reflect on the search for meaning in a fragmented world</li>

        </ul>
        <h3>Process</h3>
        <ul className='ul-guidelines-eg'>
          <li>As soon as you submit a comment, AI calculates a verdict of whether to approve the comment. Based on AI verdict, you may have to switch to the desired mode to view your comment</li>
        </ul>
      </Modal>
    </>
  );
};

export default ToolTip;