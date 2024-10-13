import React from 'react';
import styles from './AboutUs.module.css'

const AboutUs = () => {
    return (
        <div className="container" key={'about-us-container'}>
            <h1 className={styles.headingMain}>About Us</h1>

            <section className={styles.section}>
                <h2 className={styles.headingSub}>Our Mission</h2>
                <p className={styles.paragraph}>
                    At <strong>Interpretations</strong>, we are committed to fostering meaningful conversations around art. We believe in the power of deep analysis and thoughtful reflection when it comes to understanding the emotional, technical, and societal impact of various art forms, whether it be visual, written, or performed.
                </p>
                <p className={styles.paragraph}>
                    Our platform serves as a hub for individuals who seek to engage with art on a profound level, exploring complex themes such as mortality, identity, and societal issues.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.headingSub}>What We Offer</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Delve into <strong>in-depth interpretations</strong> of art.</li>
                    <li className={styles.listItem}>Discuss <strong>techniques</strong>, <strong>themes</strong>, and <strong>cultural significance</strong> in a structured and thoughtful manner.</li>
                    <li className={styles.listItem}>Share and receive constructive, <strong>meaningful feedback</strong> on various forms of media, including video, photography, literature, and more.</li>
                    <li className={styles.listItem}>Wont let irrelevant comments take the space with <strong>our own AI moderator</strong> which will analyse interpretations for approval to be shown in public.</li>

                </ul>
                <p className={styles.paragraph}>
                    Our platform is designed for <strong>engaging, analytical discussions</strong> that add value and encourage deep thinking. Each comment, question, or critique is meant to drive the conversation forward, challenging preconceived notions and opening up new perspectives.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.headingSub}>Our Philosophy</h2>
                <p className={styles.paragraph}>
                    We believe that every piece of art has a story, and our mission is to uncover that story through collaborative analysis. From the <strong>symbolism</strong> in a painting to the <strong>narrative technique</strong> of a film, we seek to connect art lovers with the deeper meaning behind every piece.
                </p>
                <p className={styles.paragraph}>
                    By doing so, we hope to build a community that appreciates the <strong>transformative power of art</strong> and its role in shaping society.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.headingSub}>Who We Are</h2>
                <p className={styles.paragraph}>
                    Our team is a collective of <strong>artists</strong>, <strong>writers</strong>, and <strong>art critics</strong> who are passionate about fostering insightful discourse. With diverse backgrounds in art history, philosophy, and creative writing, we aim to curate a thoughtful environment where <strong>every voice matters</strong>—as long as it contributes to meaningful conversation.
                </p>
                <p className={styles.paragraph}>
                    We are driven by the belief that art is a mirror to the human condition, and through exploring it, we gain insights into ourselves and the world around us.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.headingSub}>Join the Conversation</h2>
                <p className={styles.paragraph}>
                    At <strong>Interpretations</strong>, your perspective matters. Whether you're an artist seeking feedback or an observer offering an interpretation, we invite you to join the conversation. Together, we can unravel the intricate layers of meaning in every artistic expression.
                </p>
            </section>
        </div>
    );
}

export default AboutUs;
