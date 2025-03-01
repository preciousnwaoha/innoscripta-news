import "./AboutPage.css";
import Header from "../components/Header";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Header />
      <h1>About INNews</h1>
      <p>
        Discover the mission, values, and story behind Innoscripta News (INNews)
        – your trusted source for curated, innovative news.
      </p>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At INNews, our mission is to revolutionize news consumption by
            aggregating diverse, high-quality sources into one intuitive
            platform. We aim to empower users with personalized content and an
            exceptional digital experience.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Born from a passion for innovation and a desire to enhance digital
            news delivery, INNews has grown into a cutting-edge platform. Our
            journey is fueled by creativity, technical excellence, and a
            commitment to delivering reliable information.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <p>
            INNews brings you an immersive news experience through modern,
            responsive interfaces, advanced search and personalization features,
            and seamless integration of top news sources. Explore our platform
            and join a community of informed, engaged readers.
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <div className="footer-links">
          <a
            href="https://github.com/preciousnwaoha/innoscripta-news"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/preciousnwaoha04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://innoscripta.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe size={24} />
          </a>
        </div>
        <p>&copy; 2025 INNews. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
