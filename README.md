# Innooscripta News

An advanced, multi-source news aggregator built with React, Redux, RTK Query, and TypeScript. This project showcases a modern, scalable, and high-performance frontend application that integrates multiple news APIs to deliver personalized news feeds and an immersive user experience.

---

## Overview

Innooscripta News is a powerful and intuitive news aggregation platform that pulls articles from several renowned sources including NewsAPI.org, The Guardian, and The New York Times. With cutting-edge features such as personalized feeds, dynamic search filtering, interactive UI components (like/saved items, breadcrumbs, date pickers), and responsive design, this application is designed to deliver an engaging news consumption experience on both desktop and mobile devices.

---

## Key Features

- **Multi-Source Integration:** Seamlessly fetch and aggregate news from multiple APIs, normalizing and combining the data for a unified experience.
- **Personalized News Feed:** Allows users to customize their news feed by selecting preferred sources, categories, authors, and saving or liking articles.
- **Advanced Search & Filtering:** Includes a beautiful, animated search bar with full query routing and filtering capabilities.
- **Date Range Selection:** Integrated date picker component for filtering articles by publication date.
- **Interactive UI Components:** Custom-built components for checkboxes, selects, breadcrumbs, and icons using React Icons.
- **State Management:** Robust state management using Redux and Redux Toolkit, with RTK Query for efficient data fetching and caching.
- **Dockerized & Cloud-Ready:** Containerized using Docker and deployable on popular cloud platforms such as Google Cloud Run, AWS Fargate, Azure, or Heroku.
- **Modern Tech Stack:** Developed with Vite, TypeScript, and Sass for blazing-fast builds, type-safety, and maintainable styling.

---

## Tech Stack

- **React:** Component-based UI library for building a dynamic single-page application.
- **Redux & Redux Toolkit:** Simplified state management and asynchronous operations with RTK Query.
- **TypeScript:** Adds static typing to enhance code quality and maintainability.
- **Vite:** Next-generation build tool for rapid development and production builds.
- **Sass:** Powerful CSS preprocessor for modular and scalable styles.
- **Docker & Nginx:** Containerized deployment with a multi-stage Dockerfile serving the app via Nginx.
- **RTK Query:** Efficient data fetching, caching, and state management for API interactions.

---

## Getting Started

### Installation
- Node.js (v16+)
- npm or yarn
- Docker (for containerized deployment)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/preciousnwaoha/innoscripta-news.git
   cd innoscripta-news
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_API_KEY_NEWS_API_ORG=your_newsapi_key
   VITE_API_KEY_THE_GUARDIAN=your_guardian_key
   VITE_API_KEY_NEW_YORK_TIMES=your_nyt_key
   # Add any additional variables as needed.
   ```

4. **Run in Development Mode:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

---

## Docker Deployment

Build and deploy your app using Docker with the provided multi-stage file at ()[]

**Build and run:**
```bash
docker build -t innoscripta-news .
docker run -p 80:80 innoscripta-news
```

## Usage
Visit: innoscriptanews.netlify.app

---

## Project Structure

```
innoscripta-news/
├── public/                # Public assets
├── src/
│   ├── components/        # Reusable News, Search, Layout and UI components.
│   ├── pages/             # All available site pages
│   ├── utils/             # Reusable Utils
│   ├── store/             # Redux slices and RTK Query API endpoints
│   ├── hooks/             # Custom hooks (e.g., useGetTopicsAggregate, useGetArticles)
│   ├── types/             # All types are defined here
│   ├── styles/            # Global and modular Sass files
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── Dockerfile             # Multi-stage Dockerfile for production build
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```


## Notes

- **Innovative & Modern:** I have engineered this project using the latest web technologies and best practices, ensuring fast performance, scalability, and maintainability.
- **Full-Stack Mindset:** My expertise spans across front-end development, state management, API integration, and containerized deployments, making me a well-rounded developer.
- **User-Centric Design:** With a focus on delivering a seamless and engaging user experience, I have built custom, interactive UI components that stand out.
- **Proven Execution:** From designing a robust architecture to integrating multiple APIs and deploying the app using Docker and cloud services, this project demonstrates my ability to handle complex, real-world problems.
- **Passion for Excellence:** I continuously strive for excellence in code quality, performance, and user experience. I’m committed to delivering innovative solutions that drive business success.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For more information or to discuss potential opportunities, feel free to reach out:

- **Email:** nwaohaprecious25@gmail.com
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/preciousnwaoha04)
- **GitHub:** [Your GitHub Profile](https://github.com/preciousnwaoha)

---



