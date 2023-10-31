import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './AboutUs.module.scss';

const AboutUsPage = () => (
  <div className={styles.aboutUsPage}>
    <Container>
      <h1 className="text-center">About Us</h1>
      <div className="mission">
        <h2>Our Mission</h2>
        <p>
          At our culinary store, our mission is to provide high-quality,
          delicious ingredients and kitchen tools to food enthusiasts and chefs.
          We are dedicated to helping you explore your culinary creativity by
          offering a wide range of products that meet your unique cooking needs.
        </p>
      </div>
      <div className="about-us">
        <h2>A Few Words About Us</h2>
        <p>
          We are passionate about food and the art of cooking. Our journey began
          with a simple idea: to make it easier for people to access premium
          ingredients and culinary tools. Our team consists of experienced
          chefs, food connoisseurs, and dedicated individuals who share a love
          for all things culinary.
        </p>
      </div>
    </Container>
  </div>
);

export default AboutUsPage;
