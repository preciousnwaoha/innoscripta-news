import Header from "../components/Header";
import TopicItem from "../components/TopicItem";
import Loading from "../components/ui/Loading";
import { useGetNewsAPIArticlesQuery } from "../store/topics/topicsApiSlice";
import "./FeedPage.css";

const FeedPage = () => {
  const { data, error, isLoading } = useGetNewsAPIArticlesQuery({
    topics: ["elon"],
  });

  console.log(data);

  if (isLoading) return <Loading />;

  if (error) return <div>Error: </div>;

  if (!data) return null;

  return (
    <div className="feed-page">
      <Header />

      
      <h1>Your feed</h1>
      <p>Recommended based on your preferences.</p>

      <ul className="feed-list">
        {data.map((article) => (
          <TopicItem key={article.id} topic={article} />
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
