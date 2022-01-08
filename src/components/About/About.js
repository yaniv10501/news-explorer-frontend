import React from 'react';
import './About.css';
import aboutProfile from '../../images/about-profile.jpeg';

function About() {
  return (
    <section className="about">
      <img className="about__image" src={aboutProfile} alt="About profile" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__brief">
          My name is Yaniv Schweitzer, i am a full-stack developer with deep knowledge about
          javascript, react and node.js.
        </p>
        <p className="about__brief">
          During my work with the practicum team i expanded my knowledge about coding and learned
          how to build a secure and responsive web application.
        </p>
      </div>
    </section>
  );
}

export default About;
