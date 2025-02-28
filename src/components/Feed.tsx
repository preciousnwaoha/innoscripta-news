// src/components/Feed.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { TopicItemType } from "../types";
import { RootState } from "../store";

interface FeedProps {
  articles: TopicItemType[];
}

const Feed: React.FC<FeedProps> = ({ articles }) => {
  const { sources, categories, authors } = useSelector(
    (state: RootState) => state.user
  );

  // Filter logic: if a preference array is empty, ignore that filter.
  const filteredArticles = articles.filter((article) => {
    const matchesSource =
      sources.length === 0 || sources.includes(article.source.name);
    const matchesCategory =
      categories.length === 0 ||
      article.categories.some((cat) => categories.includes(cat));
    const matchesAuthor =
      authors.length === 0 || authors.includes(article.author.name);
    return matchesSource && matchesCategory && matchesAuthor;
  });

  return (
    <div className="personalized-news-feed">
      <h2>Personalized News Feed</h2>
      {filteredArticles.length === 0 ? (
        <p>No articles match your preferences. Try updating your selections.</p>
      ) : (
        filteredArticles.map((article) => (
          <div key={article.id} className="article">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <small>
              {article.source.name} |{" "}
              {new Date(article.datetime).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
