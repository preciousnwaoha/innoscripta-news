import "./AboutPage.css";
import Header from "../components/Header";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Header />
      <h1>About Our Project</h1>
      <p>
        Discover our mission, values, and the story behind our innovative
        journey.
      </p>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to deliver exceptional user experiences by combining
            cutting-edge technology with creative design. Our goal is to make
            digital interactions both seamless and enjoyable.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            What began as a small idea has grown into a community of forward
            thinkers and innovators. Every step of our journey has been fueled
            by passion and a desire to push the boundaries of what's possible.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <p>
            From modern, responsive interfaces to robust backend solutions, our
            project encompasses a wide range of features designed to empower
            users and foster creativity. Explore our tools and join our growing
            community.
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
